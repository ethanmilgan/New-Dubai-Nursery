"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navItems } from "@/app/lib/site-data";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className="overflow-hidden whitespace-nowrap bg-[var(--palm)] px-4 py-2 text-center text-[11px] font-bold tracking-wide text-white sm:text-xs">
        <span className="hidden sm:inline">Admissions enquiries are open for ages 2–6 · </span>
        Visit us in Al Hudaiba ·{" "}
        <a href={contact.mapsHref} target="_blank" rel="noreferrer" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">Open in Google Maps</a>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--cream)]/95 px-4 backdrop-blur-xl sm:px-8 lg:px-14">
        <div className="mx-auto flex min-h-[78px] max-w-[1400px] items-center justify-between gap-2 sm:gap-6">
          <Link href="/" aria-label="New Dubai Nursery home" className="relative z-[60] shrink-0">
            <Image
              src="/images/NDN2-1i.png"
              alt="New Dubai Nursery Early Learning Center"
              width={630}
              height={206}
              priority
              className="h-auto w-[185px] sm:w-[250px]"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-7 text-sm font-bold transition-colors after:absolute after:bottom-5 after:left-0 after:h-0.5 after:rounded-full after:bg-[var(--coral)] after:transition-all ${active ? "text-[var(--palm)] after:w-full" : "text-[var(--ink-muted)] after:w-0 hover:text-[var(--palm)] hover:after:w-full"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={contact.phoneHref} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--palm)]/15 text-[var(--palm)] transition hover:bg-white" aria-label={`Call ${contact.phone}`}>
              <PhoneIcon />
            </a>
            <Link href="/contact#visit" className="button button-coral">Book a visit <ArrowIcon /></Link>
          </div>

          <button
            type="button"
            className="relative z-[60] grid h-12 w-12 place-items-center rounded-full bg-[var(--palm)] text-white lg:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="relative h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <div className={`fixed inset-0 top-[39px] z-40 bg-[var(--ink)]/30 transition lg:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setIsOpen(false)} aria-hidden="true" />
        <aside id="mobile-navigation" className={`fixed right-0 top-[39px] z-50 flex h-[calc(100dvh-39px)] w-[min(88vw,390px)] flex-col bg-[var(--cream)] px-6 pb-8 pt-24 shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!isOpen}>
          <nav className="grid" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} className={`flex min-h-14 items-center justify-between border-b border-[var(--line)] py-3 font-display text-2xl ${pathname === item.href ? "text-[var(--coral)]" : "text-[var(--palm)]"}`}>
                <span>{item.label}</span><span className="text-sm text-[var(--coral)]">0{index + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-[28px] bg-[var(--mint)] p-5">
            <p className="text-sm font-bold text-[var(--palm)]">Ready to meet us?</p>
            <p className="mt-1 text-xs leading-5 text-[var(--ink-muted)]">Speak with our team about admissions and plan your visit to our Al Hudaiba nursery.</p>
            <Link href="/contact#visit" className="button button-coral mt-5 w-full">Book a visit <ArrowIcon /></Link>
          </div>
        </aside>
      </header>
    </>
  );
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="M7.2 3.5 10 7.8 8.4 10c1.2 2.5 3.1 4.4 5.6 5.6l2.2-1.6 4.3 2.8-.7 3.3c-.2.8-1 1.4-1.8 1.3C9.8 20.5 3.5 14.2 2.6 6c-.1-.8.5-1.6 1.3-1.8l3.3-.7Z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2"><path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
