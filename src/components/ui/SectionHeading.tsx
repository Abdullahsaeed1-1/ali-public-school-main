interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-maroon">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold text-navy-ink">
        {title}
      </h2>
    </div>
  );
}
