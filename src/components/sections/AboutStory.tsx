import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutStory() {
  return (
    <section className="bg-sand px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Our Story" title="Built for this community" />
        <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-navy-ink/90">
          <p>
            Ali Public School was founded in {site.foundingYear} as a high
            school set in the southern outskirts of Peshawar, on Kohat Road,
            and surrounded by the beautiful Masho Gaggar countryside. We offer
            a strong academic curriculum, broad co-curricular opportunities,
            excellent care, and a clear sense of values.
          </p>
          <p>
            The School is split into two sections: Girls &amp; Junior Section
            and Boys &amp; Senior Section. At the age of 3, we welcome our
            students in the Girls &amp; Junior Section, where boys and girls
            are co-educated up to the age of 8. When boys reach the age of 9,
            in Class 4, they move to the Boys &amp; Senior Section, while
            girls continue to stay in their own section. Our pupils, both
            boys and girls, can continue their education with us until
            completion of F.Sc, aged 18.
          </p>
          <p>
            At Ali Public School our motto is &ldquo;{site.tagline}.&rdquo; We
            live by it in delivering quality education at the doorstep of the
            community we serve. Our aim is to provide the right environment
            for nurturing the intellectual and character-building aspects of
            our students — we &ldquo;mine for gold&rdquo; in each child,
            encouraging them to succeed on the pathway that&apos;s right for
            them.
          </p>
          <p>
            Our primary focus is on developing the whole person. Creative,
            social, emotional, and confidence development are as important to
            us as academic achievement. Our guiding values are care,
            compassion, challenge, fulfilment, and commitment, and our small
            class sizes ensure that every child is known and cared for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
