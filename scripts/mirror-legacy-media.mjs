/**
 * Mirrors the legacy site's files into public/ at their original URL paths,
 * so /wp-content/uploads/… and /downloads/… links (Google Images, old
 * backlinks, PDFs people bookmarked) keep resolving after the move.
 *
 *   node scripts/mirror-legacy-media.mjs            # fetch anything missing
 *   node scripts/mirror-legacy-media.mjs --check    # report, download nothing
 *
 * Reads scripts/legacy-media/manifest.txt. Idempotent: files already in
 * public/ are left alone. Must run BEFORE the DNS switch — afterwards the old
 * WordPress server is no longer what answers alipublicschool.com.pk. Point
 * LEGACY_ORIGIN at a backup copy of the old site to run it later.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ORIGIN = process.env.LEGACY_ORIGIN ?? "https://alipublicschool.com.pk";
const CHECK = process.argv.includes("--check");
const root = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const manifest = readFileSync(join(root, "scripts/legacy-media/manifest.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l.startsWith("/"));

const ALLOWED = /^(image\/|application\/pdf|application\/octet-stream|application\/msword)/;
let fetched = 0, present = 0, missing = 0, failed = 0;

for (const path of manifest) {
  const target = join(root, "public", ...path.split("/").filter(Boolean));
  if (existsSync(target)) { present++; continue; }
  if (CHECK) { missing++; console.log(`missing  ${path}`); continue; }

  try {
    const res = await fetch(ORIGIN + encodeURI(path), { redirect: "follow" });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !ALLOWED.test(type)) throw new Error(`${res.status} ${type}`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    fetched++;
  } catch (error) {
    failed++;
    console.log(`FAILED   ${path}  (${error.message})`);
  }
  await new Promise((r) => setTimeout(r, 150)); // be gentle with the old server
}

console.log(`\n${manifest.length} in manifest · ${present} already present · ${fetched} fetched · ${missing} missing · ${failed} failed`);
process.exitCode = failed || missing ? 1 : 0;

// ---------------------------------------------------------------- sizes
// Intrinsic width/height of every mirrored image, so next/image can reserve
// the right box and the page does not shift when a legacy photo loads.
// Written to src/data/legacy-media-sizes.json.
function imageSize(buf) {
  if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf.toString("ascii", 0, 3) === "GIF") return [buf.readUInt16LE(6), buf.readUInt16LE(8)];
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  return null;
}

const sizes = {};
for (const path of manifest) {
  if (!/\.(jpe?g|png|gif)$/i.test(path)) continue;
  const target = join(root, "public", ...path.split("/").filter(Boolean));
  if (!existsSync(target)) continue;
  const size = imageSize(readFileSync(target));
  if (size) sizes[path] = size;
}
writeFileSync(join(root, "src/data/legacy-media-sizes.json"), JSON.stringify(sizes, null, 0).replace(/\],/g, "],\n") + "\n");
console.log(`sizes recorded for ${Object.keys(sizes).length} images`);
