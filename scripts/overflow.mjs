/**
 * Pinpoints what is actually widening the page.
 *
 * The naive "any element wider than the viewport" check is useless here: the
 * site has several deliberate horizontal scrollers (snap rails, marquees,
 * tickers) whose children are *supposed* to extend past the right edge. This
 * walks up from each candidate and discards anything sitting inside a
 * scrollable or clipped ancestor, so what is left is genuinely leaking.
 */

const BASE = process.argv[2] ?? "http://localhost:3111";
const PORT = 9333;
const WIDTHS = [360, 390, 430, 768, 820, 1024, 1280, 1440];
const ROUTES = ["/", "/about", "/principals-message", "/academics", "/admissions", "/campuses", "/policies", "/gallery", "/news", "/results", "/careers", "/contact"];

let ws, nextId = 1;
const pending = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => pending.delete(id) && rej(new Error(method + " timeout")), 30000);
  });
}

const PROBE = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const over = de.scrollWidth - vw;
  if (over <= 1) return { over, leaks: [] };

  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== de; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (/(auto|scroll|hidden|clip)/.test(cs.overflowX)) return true;
    }
    return false;
  };

  const leaks = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.display === 'none') continue;
    if (el.classList.contains('skip-link')) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right <= vw + 1) continue;
    if (clipped(el)) continue;           // inside a legitimate scroller
    // Report the outermost offender only — children inherit the problem.
    if (leaks.some((l) => l.node.contains(el))) continue;
    leaks.push({
      node: el,
      desc: el.tagName.toLowerCase() +
        (el.id ? '#' + el.id : '') +
        '.' + String(el.className || '').trim().split(/\\s+/).slice(0, 4).join('.'),
      right: Math.round(r.right),
      width: Math.round(r.width),
      text: (el.textContent || '').trim().slice(0, 40),
    });
    if (leaks.length >= 5) break;
  }
  return { over, leaks: leaks.map(({ node, ...rest }) => rest) };
})()`;

async function main() {
  let url;
  for (let i = 0; i < 40 && !url; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      url = list.find((t) => t.type === "page" && t.url.startsWith(BASE))?.webSocketDebuggerUrl;
    } catch { /* not up */ }
    if (!url) await sleep(250);
  }
  if (!url) throw new Error("no target");

  ws = new WebSocket(url);
  await new Promise((r, j) => {
    ws.addEventListener("open", r, { once: true });
    ws.addEventListener("error", j, { once: true });
  });
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");

  let failures = 0;
  for (const w of WIDTHS) {
    const rows = [];
    await send("Emulation.setDeviceMetricsOverride", {
      width: w, height: 900, deviceScaleFactor: 1, mobile: w < 1024,
    });
    for (const route of ROUTES) {
      await send("Page.navigate", { url: BASE + route });
      await sleep(2400);
      const { result } = await send("Runtime.evaluate", { returnByValue: true, expression: PROBE });
      const { over, leaks } = result.value;
      if (over > 1 && leaks.length) {
        failures++;
        rows.push(`  FAIL ${route.padEnd(12)} +${over}px`);
        leaks.forEach((l) =>
          rows.push(`         ${l.desc}  w=${l.width} right=${l.right}  "${l.text}"`)
        );
      } else if (over > 1) {
        rows.push(`  ok   ${route.padEnd(12)} +${over}px but only inside scrollers`);
      } else {
        rows.push(`  ok   ${route.padEnd(12)}`);
      }
    }
    console.log(`\n== ${w}px ==`);
    rows.forEach((r) => console.log(r));
  }
  console.log(`\n${failures === 0 ? "NO REAL OVERFLOW ANYWHERE" : failures + " page/width combinations leak"}`);
  ws.close();
  process.exit(0);
}

main().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
