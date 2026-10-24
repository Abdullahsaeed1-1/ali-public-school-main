import { Blocks } from "@/components/content/Blocks";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "In this section" — the plain list of child pages a legacy hub URL
 * (/about-us/, /academics/, /galleries/) owes its children. The old hubs
 * were empty; this is what keeps every legacy page within three clicks of
 * the homepage through ordinary links (migration report §7.3).
 */
export function SectionLinks({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { label: string; href: string; note?: string }[];
}) {
  return (
    <section className="bg-paper px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Blocks blocks={[{ kind: "links", items }]} />
      </div>
    </section>
  );
}
