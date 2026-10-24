// TODO: replace every placeholder below with real, published board results and
// achiever details before launch. Do not invent figures — leave the "—" values
// and empty achievers list in place until the school provides real numbers.

export interface ResultHighlight {
  label: string;
  value: string;
}

export interface Achiever {
  name: string;
  achievement: string;
  year: string;
}

export const resultHighlights: ResultHighlight[] = [
  { label: "Matric Pass Rate", value: "—" },
  { label: "Distinctions", value: "—" },
  { label: "Board Position Holders", value: "—" },
];

export const topAchievers: Achiever[] = [];
