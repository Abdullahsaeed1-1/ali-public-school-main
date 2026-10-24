import type { Metadata } from "next";
import { LegacyContentPage } from "@/components/content/LegacyContentPage";
import { CAREERS, trailFor, vacanciesPage } from "@/data/legacy-pages";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: vacanciesPage.title,
  description: vacanciesPage.description,
  path: vacanciesPage.path,
});

/**
 * The legacy Careers → Vacancies page, indexed by Google. The downloadable
 * Word and PDF application forms are mirrored at their original
 * /downloads/ URLs; the email-and-WhatsApp route on /careers/ stays the
 * primary way to apply.
 */
export default function VacanciesPage() {
  return (
    <LegacyContentPage
      page={vacanciesPage}
      trail={trailFor(vacanciesPage, CAREERS)}
      relatedHeading="Working at APS"
      related={[
        { label: "Careers at Ali Public School", href: "/careers/" },
        { label: "Contact Us", href: "/contact-us/" },
      ]}
    />
  );
}
