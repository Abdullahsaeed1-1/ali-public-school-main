import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getPostByParams, newsPosts, postSegments } from "@/data/news";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "News from Ali Public School, Peshawar";

type Params = { year: string; month: string; day: string; slug: string };

/** One card per post, so a link pasted into WhatsApp shows the headline. */
export function generateStaticParams(): Params[] {
  return newsPosts.map((post) => {
    const [year, month, day, slug] = postSegments(post);
    return { year, month, day, slug };
  });
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { year, month, day, slug } = await params;
  const post = getPostByParams(year, month, day, slug);

  const date = post
    ? new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Ali Public School Peshawar";

  // Long headlines need to stay legible at thumbnail size in a chat list.
  const title = post
    ? post.title.length > 72
      ? `${post.title.slice(0, 69)}…`
      : post.title
    : "News";

  return renderOgImage(title, date);
}
