import { Cinzel, Montserrat } from "next/font/google";

// Cinzel has no italic face on Google Fonts — quote/italic treatments rely on
// the browser's synthetic oblique, which is fine for the occasional pull-quote.
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

// 700 dropped: nothing on the site actually renders font-bold.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

// Amiri (Arabic) was removed with the Quranic verse it existed to set — the
// client asked for that verse to come off the site. It was a ~110 KB face
// serving one line, so nothing else on the site wants it back.
