/**
 * Wraps every route. Next.js remounts a template on each navigation, which is
 * what makes the CSS transition in globals.css replay per route change without
 * any JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-wipe" aria-hidden />
      <div className="page-enter">{children}</div>
    </>
  );
}
