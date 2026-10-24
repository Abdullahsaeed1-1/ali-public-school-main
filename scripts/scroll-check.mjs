/** Sweeps every route for touch-scroll dead zones at phone width. */
const BASE = "http://localhost:3112", PORT = 9333;
const ROUTES = ["/", "/about", "/principals-message", "/academics", "/admissions", "/campuses", "/policies", "/gallery", "/news", "/results", "/careers", "/contact"];
let ws, id = 1; const pend = new Map();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const send = (m, p = {}) => { const i = id++; ws.send(JSON.stringify({id:i,method:m,params:p}));
  return new Promise((res, rej) => { pend.set(i,{res,rej}); setTimeout(()=>pend.delete(i)&&rej(Error(m)),30000); }); };
const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
ws = new WebSocket(list.find(t=>t.type==="page"&&t.url.startsWith(BASE)).webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r, {once:true}));
ws.addEventListener("message", e => { const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { const {res,rej}=pend.get(m.id); pend.delete(m.id); m.error?rej(Error(m.error.message)):res(m.result); } });
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:2, mobile:true });
await send("Emulation.setTouchEmulationEnabled", { enabled:true, maxTouchPoints:1 });

let bad = 0;
for (const route of ROUTES) {
  await send("Page.navigate", { url: BASE + route });
  await sleep(2800);
  const info = (await send("Runtime.evaluate", { returnByValue: true, expression:
    `({ h: document.documentElement.scrollHeight,
        blockers: [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).touchAction === 'none').length })` })).result.value;
  const stuck = [];
  for (const frac of [0,0.15,0.3,0.45,0.6,0.75,0.9]) {
    if (info.h <= 900) break;
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${Math.round(info.h*frac)})` });
    await sleep(350);
    const before = (await send("Runtime.evaluate", { returnByValue: true, expression: "window.scrollY" })).result.value;
    await send("Input.dispatchTouchEvent", { type:"touchStart", touchPoints:[{x:195,y:600}] });
    for (let y=600;y>=250;y-=50) { await send("Input.dispatchTouchEvent", { type:"touchMove", touchPoints:[{x:195,y}] }); await sleep(16); }
    await send("Input.dispatchTouchEvent", { type:"touchEnd", touchPoints:[] });
    await sleep(450);
    const after = (await send("Runtime.evaluate", { returnByValue: true, expression: "window.scrollY" })).result.value;
    const atBottom = before >= info.h - 844 - 5; // already at max scroll before the swipe
    if (after - before <= 30 && !atBottom) stuck.push(Math.round(frac*100) + "%");
  }
  bad += stuck.length + info.blockers;
  console.log(`${stuck.length||info.blockers ? "FAIL" : "ok  "} ${route.padEnd(12)} height ${String(info.h).padStart(6)}px  touch-blockers ${info.blockers}` +
              (stuck.length ? `  STUCK at ${stuck.join(", ")}` : ""));
}
console.log(bad === 0 ? "\nEVERY PAGE SCROLLS FREELY ON TOUCH" : `\n${bad} problem(s)`);
ws.close(); process.exit(0);
