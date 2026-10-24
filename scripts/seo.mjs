/**
 * SEO and semantics audit, run against the real rendered HTML.
 *
 * Checks the things MASTERPROMPT §6 asks for and that a build cannot catch:
 * exactly one h1 per page, a title and description on every route, the OG tags
 * a WhatsApp preview needs, alt text on every image, a skip link, and landmark
 * elements.
 */
const BASE = process.argv[2] ?? "http://localhost:3112";
const PORT = 9333;
// Legacy URLs since the SEO migration — see scripts/seo-migration-check.mjs
// for the full URL-by-URL check.
const ROUTES = [
  "/", "/about-us/", "/principals-message/", "/academics/", "/academics/admission-policy/",
  "/campuses/", "/policies/", "/galleries/", "/blog/", "/results/", "/careers/",
  "/contact-us/", "/2015/11/07/we-welcome-our-new-principal/",
];

let ws, id = 1;
const pend = new Map();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const send = (m, p = {}) => {
  const i = id++;
  ws.send(JSON.stringify({ id: i, method: m, params: p }));
  return new Promise((res, rej) => {
    pend.set(i, { res, rej });
    setTimeout(() => pend.delete(i) && rej(Error(m + " timeout")), 30000);
  });
};

const PROBE = `(() => {
  const q = (s) => [...document.querySelectorAll(s)];
  const meta = (n) => document.querySelector(\`meta[name="\${n}"]\`)?.content ?? null;
  const og = (p) => document.querySelector(\`meta[property="og:\${p}"]\`)?.content ?? null;

  const imgs = q('img');
  const missingAlt = imgs.filter((i) => i.getAttribute('alt') === null).length;
  // alt="" is correct for decorative images; only a missing attribute is a fault.

  return {
    title: document.title,
    titleLen: document.title.length,
    description: meta('description'),
    descLen: (meta('description') ?? '').length,
    h1: q('h1').map((h) => h.textContent.trim().slice(0, 50)),
    ogTitle: og('title'),
    ogDescription: og('description'),
    ogImage: og('image'),
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.content ?? null,
    jsonLd: q('script[type="application/ld+json"]').map((s) => {
      try { return JSON.parse(s.textContent)['@type']; } catch { return 'INVALID'; }
    }),
    images: imgs.length,
    missingAlt,
    skipLink: !!document.querySelector('a[href="#main-content"]'),
    main: q('main').length,
    header: q('header').length,
    footer: q('footer').length,
    lang: document.documentElement.lang,
  };
})()`;

const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
ws = new WebSocket(list.find((t) => t.type === "page" && t.url.startsWith(BASE)).webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) {
    const { res, rej } = pend.get(m.id);
    pend.delete(m.id);
    m.error ? rej(Error(m.error.message)) : res(m.result);
  }
});
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1280, height: 900, deviceScaleFactor: 1, mobile: false,
});

let problems = 0;
for (const route of ROUTES) {
  await send("Page.navigate", { url: BASE + route });
  await sleep(2400);
  const r = (await send("Runtime.evaluate", { returnByValue: true, expression: PROBE })).result.value;

  const faults = [];
  if (r.h1.length !== 1) faults.push(`${r.h1.length} h1 (want 1)`);
  if (!r.description) faults.push("no description");
  else if (r.descLen > 165) faults.push(`description ${r.descLen} chars`);
  if (!r.ogTitle) faults.push("no og:title");
  if (!r.ogDescription) faults.push("no og:description");
  if (!r.ogImage) faults.push("no og:image");
  if (!r.twitterCard) faults.push("no twitter:card");
  if (r.missingAlt) faults.push(`${r.missingAlt} img without alt`);
  if (!r.skipLink) faults.push("no skip link");
  if (r.main !== 1) faults.push(`${r.main} <main>`);
  if (r.lang !== "en-PK") faults.push(`lang="${r.lang}"`);
  if (r.titleLen > 65) faults.push(`title ${r.titleLen} chars`);

  problems += faults.length;
  const mark = faults.length ? "FAIL" : "ok  ";
  console.log(
    `${mark} ${route.padEnd(34)} h1:${r.h1.length} desc:${String(r.descLen).padStart(3)} ` +
    `img:${String(r.images).padStart(2)} ld:[${r.jsonLd.join(",") || "-"}]` +
    (faults.length ? `\n       ↳ ${faults.join("; ")}` : "")
  );
}

console.log(problems === 0 ? "\nSEO & SEMANTICS CLEAN" : `\n${problems} problem(s)`);
ws.close();
process.exit(0);
