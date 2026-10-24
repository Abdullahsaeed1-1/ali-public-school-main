import Image from "next/image";
import Link from "next/link";
import type { PolicyBlock } from "@/data/policies";

/**
 * The typed content blocks the legacy pages are written in: the policy
 * documents, the About Us sub-pages, term dates, vacancies.
 *
 * No hooks and no client state, so this renders on the server: every word
 * is in the HTML Google fetches. (The policy accordion on /policies/ renders
 * the same blocks, but only once a row is opened — which is exactly why each
 * policy also has a page of its own at its legacy URL.)
 */
export type ContentBlock =
  | PolicyBlock
  | { kind: "subheading"; text: string }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | {
      kind: "downloads";
      items: { label: string; href: string; format: string }[];
    }
  | {
      kind: "links";
      items: { label: string; href: string; note?: string }[];
    };

export function Blocks({
  blocks,
  headingLevel = 2,
}: {
  blocks: readonly ContentBlock[];
  /** 2 on a standalone page (under its h1); 3 inside the policy accordion. */
  headingLevel?: 2 | 3;
}) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} headingLevel={headingLevel} />
      ))}
    </>
  );
}

export function Block({
  block,
  headingLevel = 3,
}: {
  block: ContentBlock;
  headingLevel?: 2 | 3;
}) {
  switch (block.kind) {
    case "heading": {
      const H = headingLevel === 2 ? "h2" : "h3";
      return (
        <H className="mt-8 font-sans text-xs font-semibold uppercase tracking-wider text-maroon first:mt-0">
          {block.text}
        </H>
      );
    }

    case "subheading": {
      const H = headingLevel === 2 ? "h3" : "h4";
      return (
        <H className="mt-6 font-display text-base font-semibold text-navy-ink">
          {block.text}
        </H>
      );
    }

    case "para":
      return (
        <p className="mt-4 text-sm leading-relaxed text-navy-ink/80">
          {block.text}
        </p>
      );

    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`mt-4 space-y-2 pl-5 text-sm leading-relaxed text-navy-ink/80 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </List>
      );
    }

    case "table":
      return (
        // The homework timetables are wide on a phone; they scroll inside
        // their own container. overflow-y-hidden is paired deliberately —
        // see the note at the bottom of globals.css.
        <div className="mt-4 overflow-x-auto overflow-y-hidden">
          <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="border-b border-navy-ink/15 pb-2 pr-4 font-sans text-xs font-semibold uppercase tracking-wider text-navy-ink/60"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-navy-ink/8">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-2.5 pr-4 align-top text-navy-ink/80 ${
                        j === 0 ? "font-medium text-navy-ink" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image":
      return (
        <figure className="mt-6">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="h-auto w-full rounded-2xl border border-navy-ink/10 bg-paper"
          />
          {block.caption && (
            <figcaption className="mt-2 text-xs text-navy-ink/50">{block.caption}</figcaption>
          )}
        </figure>
      );

    case "downloads":
      return (
        <ul className="mt-6 flex flex-wrap gap-3">
          {block.items.map((item) => (
            <li key={item.href}>
              {/* A plain <a>: these are files, not routes. */}
              <a
                href={item.href}
                download
                className="inline-flex items-center gap-2 rounded-full border border-navy-ink/20 bg-paper px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-navy-ink transition-colors duration-150 hover:border-maroon hover:text-maroon"
              >
                {item.label}
                <span className="rounded bg-sand px-1.5 py-0.5 text-[0.6rem] text-navy-ink/60">
                  {item.format}
                </span>
              </a>
            </li>
          ))}
        </ul>
      );

    case "links":
      return (
        <ul className="mt-6 divide-y divide-navy-ink/10 border-y border-navy-ink/10">
          {block.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
              >
                <span className="font-display text-base font-semibold text-navy-ink group-hover:text-maroon">
                  {item.label}
                </span>
                {item.note && (
                  <span className="text-xs text-navy-ink/50">{item.note}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      );
  }
}
