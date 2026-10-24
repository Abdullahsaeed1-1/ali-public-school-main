/**
 * Zero-dependency Chrome DevTools Protocol driver.
 *
 * Walks the site the way a person does — loads the homepage, then clicks
 * through the nav so every route change is a real client-side navigation —
 * and reports anything the browser complains about along the way. It also
 * checks each page at phone, tablet and desktop widths for horizontal
 * overflow, which is what "not responsive" actually looks like in practice.
 *
 * Run: node drive.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? "http://localhost:3111";
const PORT = 9333;

const ROUTES = [
  ["Home", "/"],
  ["About", "/about"],
  ["Principal", "/principals-message"],
  ["Academics", "/academics"],
  ["Admissions", "/admissions"],
  ["Campuses", "/campuses"],
  ["Policies", "/policies"],
  ["Gallery", "/gallery"],
  ["News", "/news"],
  ["Results", "/results"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

const VIEWPORTS = [
  { name: "small phone 360", width: 360, height: 780, mobile: true },
  { name: "phone 390", width: 390, height: 844, mobile: true },
  { name: "large phone 430", width: 430, height: 932, mobile: true },
  { name: "small tablet 768", width: 768, height: 1024, mobile: true },
  { name: "tablet 820", width: 820, height: 1180, mobile: true },
  { name: "tablet land 1024", width: 1024, height: 768, mobile: true },
  { name: "laptop 1280", width: 1280, height: 800, mobile: false },
  { name: "desktop 1440", width: 1440, height: 900, mobile: false },
];

// Noise the browser emits that has nothing to do with the site.
const IGNORE = [
  /Autofill\.enable/i,
  /favicon/i,
  /DevTools/i,
  /net::ERR_ABORTED.*(hot-update|__nextjs)/i,
];

let ws;
let nextId = 1;
const pending = new Map();
const problems = [];
let phase = "startup";

function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => {
      if (pending.delete(id)) reject(new Error(`${method} timed out`));
    }, 30000);
  });
}

function note(kind, text) {
  if (IGNORE.some((re) => re.test(text))) return;
  problems.push({ phase, kind, text: text.slice(0, 300) });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  // Chrome needs a moment to open the debugging socket.
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      // Pick OUR tab specifically. A stray extension background page — or a
      // browser already holding the port — is also type "page", and attaching
      // to one of those silently verifies the wrong document.
      const page = targets.find(
        (t) => t.type === "page" && t.url.startsWith(BASE)
      );
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("Chrome debugging port never opened");
}

async function main() {
  const url = await connect();
  ws = new WebSocket(url);

  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);

    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      return;
    }

    switch (msg.method) {
      case "Runtime.exceptionThrown": {
        const d = msg.params.exceptionDetails;
        note("EXCEPTION", d.exception?.description ?? d.text ?? "unknown");
        break;
      }
      case "Runtime.consoleAPICalled":
        if (msg.params.type === "error" || msg.params.type === "warning") {
          const text = msg.params.args
            .map((a) => a.value ?? a.description ?? "")
            .join(" ");
          note(msg.params.type.toUpperCase(), text);
        }
        break;
      case "Log.entryAdded": {
        const e = msg.params.entry;
        if (e.level === "error") note("LOG", e.text);
        break;
      }
    }
  });

  await send("Runtime.enable");
  await send("Log.enable");
  await send("Page.enable");

  const results = [];

  for (const vp of VIEWPORTS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.mobile ? 2 : 1,
      mobile: vp.mobile,
    });

    for (const [name, route] of ROUTES) {
      phase = `${vp.name} ${route}`;
      await send("Page.navigate", { url: BASE + route });
      await sleep(2600); // splash (~1.9s) plus a beat for reveals

      const probe = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const de = document.documentElement;
          const over = de.scrollWidth - de.clientWidth;
          // Find what is actually sticking out, so a failure is actionable.
          let culprits = [];
          if (over > 1) {
            for (const el of document.querySelectorAll('body *')) {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1)) {
                const cs = getComputedStyle(el);
                if (cs.position === 'fixed') continue;
                if (el.classList.contains('skip-link')) continue;
                culprits.push(
                  el.tagName.toLowerCase() +
                  '.' + String(el.className).split(' ').slice(0, 3).join('.') +
                  ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']'
                );
                if (culprits.length >= 4) break;
              }
            }
          }
          return {
            overflow: over,
            culprits,
            reveals: document.querySelectorAll('.reveal').length,
            revealsIn: document.querySelectorAll('.reveal.is-in').length,
            canvasW: document.querySelector('canvas')?.width ?? 0,
            title: document.title,
            hasArabic: /[\\u0600-\\u06FF]/.test(document.body.innerText),
          };
        })()`,
      });

      results.push({ vp: vp.name, name, route, ...probe.result.value });
    }
  }

  // Now the thing that actually matters for the reported error: real
  // client-side navigation, following the nav links rather than reloading.
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
  });
  await send("Page.navigate", { url: BASE + "/" });
  await sleep(2800);

  const clickOrder = ["/about", "/principals-message", "/academics", "/admissions", "/campuses", "/policies", "/gallery", "/news", "/results", "/careers", "/contact", "/"];
  const navLog = [];
  for (const href of clickOrder) {
    phase = `client-nav -> ${href}`;
    const r = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const a = [...document.querySelectorAll('a[href]')]
          .find(x => new URL(x.href, location.origin).pathname === ${JSON.stringify(href)});
        if (!a) return { clicked: false };
        a.click();
        return { clicked: true };
      })()`,
    });
    await sleep(1600);
    const after = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: "location.pathname",
    });
    navLog.push({
      href,
      clicked: r.result.value?.clicked,
      landedOn: after.result.value,
    });
  }

  console.log("\n=== PAGES × VIEWPORTS ===");
  for (const vp of VIEWPORTS) {
    console.log(`\n-- ${vp.name} (${vp.width}px) --`);
    for (const r of results.filter((x) => x.vp === vp.name)) {
      const ov = r.overflow > 1 ? `OVERFLOW +${r.overflow}px` : "no overflow";
      const ar = r.hasArabic ? " ARABIC-TEXT-PRESENT" : "";
      const flag = r.overflow > 1 || r.hasArabic ? "FAIL" : "ok  ";
      console.log(
        `${flag} ${r.route.padEnd(12)} ${ov.padEnd(18)} reveals ${r.revealsIn}/${r.reveals}${ar}`
      );
      if (r.culprits?.length) r.culprits.forEach((c) => console.log(`       ↳ ${c}`));
    }
  }

  console.log("\n=== CLIENT-SIDE NAVIGATION (clicking the nav) ===");
  for (const n of navLog) {
    const good = n.clicked && n.landedOn === n.href;
    console.log(`${good ? "ok  " : "FAIL"} click ${n.href.padEnd(12)} -> ${n.landedOn}`);
  }

  console.log("\n=== BROWSER COMPLAINTS ===");
  if (problems.length === 0) {
    console.log("none");
  } else {
    const seen = new Set();
    for (const p of problems) {
      const key = p.kind + p.text;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`[${p.kind}] (${p.phase}) ${p.text}`);
    }
  }

  ws.close();
  process.exit(0);
}

main().catch((e) => {
  console.error("DRIVER FAILED:", e.message);
  process.exit(1);
});
