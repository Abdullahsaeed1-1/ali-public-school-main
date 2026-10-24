import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { principalsMessage } from "@/data/about";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

const PATH = "/welcome-to-ali-public-school/";

export const metadata: Metadata = buildMetadata({
  title: "Welcome to Ali Public School",
  description:
    "Welcome to Ali Public School in Badaber, Peshawar. Our motto is “Quality in Everything”: nurturing the whole child, academically and in character.",
  path: PATH,
});

/**
 * The legacy welcome page — a Google sitelink under the homepage and a top-5
 * result for "Ali Public School Peshawar". Its text, verified against the live
 * page on 16 October 2026, is the school's motto paragraph followed by the
 * Principal's message; both are reproduced here as published (British
 * spelling of "fulfilment" aside). The portrait is the one the legacy page
 * used, mirrored at its original URL.
 */
export default function WelcomePage() {
  const { principal } = site.leadership;

  return (
    <>
      <section className="bg-sand px-6 pb-4 pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Welcome to Ali Public School", path: PATH },
            ]}
          />
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-navy-ink md:text-5xl">
            Welcome to Ali Public School
          </h1>
        </div>
      </section>

      <article className="bg-sand px-6 pb-20 pt-6">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xl leading-relaxed text-navy-ink md:text-2xl">
            At Ali Public School our motto is &lsquo;{site.tagline}&rsquo;. We
            live by our motto in delivering quality education at the doorstep of
            the community we serve.
          </p>
          <p className="mt-6 text-base leading-relaxed text-navy-ink/85">
            Our aim is to provide the right environment for nurturing the
            intellectual and character building aspects of our students. We
            &lsquo;mine for gold&rsquo; in each child, encouraging them to
            succeed on the pathway that&rsquo;s right for them. At Ali Public
            School we focus on developing the whole person. Creative, social,
            emotional and confidence developments are as important as academic
            achievement. Our guiding values are care, compassion, challenge,
            fulfilment and commitment. Our small class sizes ensure that every
            child is known and cared for. Many of our prospective parents say,
            &ldquo;I want a school where my child will be happy&rdquo;, and Ali
            Public School becomes their choice.
          </p>

          <h2 className="mt-14 font-display text-2xl font-semibold text-navy-ink">
            Principal&rsquo;s Message
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-[12rem_1fr]">
            <Image
              src="/wp-content/uploads/2015/06/l_201601132155491.jpg"
              alt="Major Manzur, Principal, Ali Public School"
              width={400}
              height={300}
              sizes="(min-width: 768px) 12rem, 100vw"
              className="h-auto w-full rounded-2xl border border-navy-ink/10 md:w-48"
            />
            <div className="space-y-5 text-base leading-relaxed text-navy-ink/85">
              {principalsMessage.slice(1).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p className="pt-2">
                <span className="block font-display text-lg font-semibold text-navy-ink">
                  {principal.name}
                </span>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
                  {principal.role}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-sans text-xs font-semibold uppercase tracking-wider">
            <Link href="/about-us/overview/" className="text-maroon hover:underline">
              What makes us different →
            </Link>
            <Link href="/academics/admission-policy/" className="text-maroon hover:underline">
              Admission policy →
            </Link>
            <Link href="/contact-us/" className="text-maroon hover:underline">
              Visit us →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
