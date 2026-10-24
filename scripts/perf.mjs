/**
 * Measures LCP, CLS and transfer weight on an emulated mid-range Android over
 * 4G — the device MASTERPROMPT §1 actually cares about, not a desktop.
 *
 * Throttling matches Lighthouse's "Slow 4G" profile: 1.6 Mbps down, 150ms RTT,
 * with a 4x CPU slowdown.
 */
const BASE = process.argv[2] ?? "http://localhost:3112";
const PORT = 9333;
const ROUTES = ["/", "/about", "/admissions", "/news", "/policies", "/gallery"];

let ws, id = 1;
const pend = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const send = (m, p = {}) => {
  const i = id++;
  ws.send(JSON.stringify({ id: i, method: m, params: p }));
  return new Promise((res, rej) => {
    pend.set(i, { res, rej });
    setTimeout(() => pend.delete(i) && rej(Error(m + " timeout")), 60000);
  });
};

let bytes = 0;
const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
ws = new WebSocket(list.find((t) => t.type === "page" && t.url.startsWith(BASE)).webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Network.loadingFinished") bytes += m.params.encodedDataLength ?? 0;
  if (m.id && pend.has(m.id)) {
    const { res, rej } = pend.get(m.id);
    pend.delete(m.id);
    m.error ? rej(Error(m.error.message)) : res(m.result);
  }
});

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 390, height: 844, deviceScaleFactor: 2, mobile: true,
});

console.log("Emulated: 390px Android · Slow 4G (1.6 Mbps, 150ms RTT) · 4x CPU throttle\n");
console.log("route            LCP       CLS     transferred   verdict");
console.log("-".repeat(62));

let bad = 0;
for (const route of ROUTES) {
  await send("Network.clearBrowserCache");
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });

  bytes = 0;
  await send("Page.navigate", { url: BASE + route });
  await sleep(9000); // splash is ~1.6s; give the page room to settle

  const { result } = await send("Runtime.evaluate", {
    returnByValue: true,
    awaitPromise: true,
    expression: `new Promise((resolve) => {
      let lcp = 0, cls = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) lcp = Math.max(lcp, e.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => resolve({ lcp: Math.round(lcp), cls: Math.round(cls * 1000) / 1000 }), 400);
    })`,
  });

  const { lcp, cls } = result.value;
  const kb = Math.round(bytes / 1024);
  const faults = [];
  if (lcp > 2500) faults.push("LCP over 2.5s");
  if (cls > 0.1) faults.push("CLS over 0.1");
  bad += faults.length;

  console.log(
    `${route.padEnd(16)} ${String(lcp + "ms").padEnd(9)} ${String(cls).padEnd(7)} ` +
    `${String(kb + " KB").padEnd(13)} ${faults.length ? "FAIL — " + faults.join(", ") : "ok"}`
  );
}

console.log(bad === 0 ? "\nWITHIN THE PERFORMANCE BUDGET" : `\n${bad} metric(s) over budget`);
ws.close();
process.exit(0);
