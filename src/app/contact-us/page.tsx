import type { Metadata } from "next";
import { AmbientHeader } from "@/components/sections/AmbientHeader";
import { FarewellBand } from "@/components/sections/FarewellBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyMap } from "@/components/ui/LazyMap";
import { Button } from "@/components/ui/Button";
import { site, whatsappUrl } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { jsonLd, schoolSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Ali Public School & College, Badaber, Peshawar: address, phone +92 91 2370412, WhatsApp, email and school timings.",
  path: "/contact-us/",
});

const contactCards = [
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    label: "WhatsApp",
    // The number itself, not "Message us directly" — a parent who wants to
    // save it to their phone should not have to open WhatsApp to read it.
    value: site.whatsapp,
    href: whatsappUrl("Assalam-o-Alaikum, I have a question for Ali Public School."),
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  // The "Admissions Office" card used to carry hoc@alipublicschool.com.pk,
  // which appears nowhere in the school's own material. Removed rather than
  // published — see PLAN.md §0.
  {
    label: "Facebook",
    value: "Follow us for updates",
    href: site.social.facebook,
  },
  {
    label: "YouTube",
    value: "Watch our channel",
    href: site.social.youtube,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* The same School schema as the homepage: the name, address, phone and
          hours on this page must match it exactly (migration report §7.1). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schoolSchema())} />
      <AmbientHeader eyebrow="Get In Touch" title="Contact Us" />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => {
              const isExternal = card.href.startsWith("http");
              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  // min-w-0: a grid item defaults to min-width:auto, sized by its
                  // min-content. `break-words` alone does not shrink that, so the
                  // long admissions address was setting the track width and pushing
                  // the page 9px sideways at 360px.
                  className="min-w-0 rounded-2xl border border-navy-ink/10 bg-paper p-6 transition-colors duration-150 hover:border-maroon/40"
                >
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                    {card.label}
                  </p>
                  <p className="mt-2 break-words font-display text-lg font-semibold text-navy-ink">
                    {card.value}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <FarewellBand />

      <section className="bg-sand px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Visit Us" title="Office Hours & Address" />
              <ul className="mt-6 space-y-3">
                {site.hours.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex justify-between border-b border-navy-ink/10 pb-3 text-sm"
                  >
                    <span className="font-medium text-navy-ink">{slot.days}</span>
                    <span className="text-navy-ink/70">{slot.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-navy-ink/70">
                {site.address}
              </p>
              <div className="mt-6">
                <Button
                  href={whatsappUrl(
                    "Assalam-o-Alaikum, I have a question for Ali Public School."
                  )}
                  variant="solid"
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Find Us" title="Location" />
              <div className="mt-6">
                <LazyMap query={site.address} title="Map to Ali Public School" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
