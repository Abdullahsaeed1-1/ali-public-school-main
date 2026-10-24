"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks, samePath, site, whatsappUrl } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  // Only the home page has a dark full-bleed hero behind the nav — every
  // other page starts on the light sand background, so the transparent/white
  // treatment (meant to sit over a dark photo) would otherwise render
  // near-invisible white-on-cream text until the user scrolls past 80px.
  const hasHero = pathname === "/";
  const solid = scrolled || !hasHero;

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        solid
          ? "border-b border-navy-ink/10 bg-sand/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/crest.jpeg"
            alt={`${site.name} crest`}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span
              className={`font-display text-lg font-semibold ${
                solid ? "text-navy-ink" : "text-paper"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`font-sans text-[11px] italic ${
                solid ? "text-navy-ink/70" : "text-paper/80"
              }`}
            >
              {site.shortLocation}
            </span>
          </span>
        </Link>

        {/* The brief adds six pages to a bar that was already tight. Rather
            than a thirteen-item row, the extra pages nest under About and
            Academics — still seven top-level items. The submenu opens on
            hover AND focus-within, so it is reachable from the keyboard. */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active =
              samePath(pathname, link.href) ||
              link.children?.some((c) => samePath(c.href, pathname));
            return (
              <li key={link.href} className="group relative py-2">
                <Link
                  href={link.href}
                  className={`font-sans text-sm font-medium ${
                    solid ? "text-navy-ink" : "text-paper"
                  }`}
                >
                  {link.label}
                </Link>
                {active && (
                  <m.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-leaf"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}

                {link.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="overflow-hidden rounded-xl border border-navy-ink/10 bg-paper py-2 shadow-xl">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-4 py-2 font-sans text-sm transition-colors duration-150 hover:bg-sand ${
                              samePath(pathname, child.href)
                                ? "font-semibold text-maroon"
                                : "text-navy-ink"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Full bar only from lg. Below that the row cannot hold the crest,
            seven links and a button without pushing the page sideways. */}
        <div className="hidden lg:block">
          <Button href={whatsappUrl()} variant={solid ? "ghost-dark" : "ghost-light"}>
            WhatsApp Us
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            solid ? "text-navy-ink" : "text-paper"
          }`}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-ink/10 bg-sand px-6 py-4 lg:hidden">
          {/* On a phone the nesting is flattened into indented groups — a
              tap-to-open accordion inside a menu that is itself tap-to-open
              is one tap too many. */}
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-base font-medium text-navy-ink"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mt-2 flex flex-col gap-2 border-l border-navy-ink/10 pl-4">
                    {link.children
                      .filter((child) => child.href !== link.href)
                      .map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="font-sans text-sm text-navy-ink/70"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button href={whatsappUrl()} variant="solid" className="w-full">
              WhatsApp Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
