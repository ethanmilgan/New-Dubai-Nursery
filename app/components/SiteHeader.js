"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", child: { href: "/ndnelc", label: "New Dubai Nursery Early Learning Center" } },
  { href: "/about-us", label: "About Us" },
  { href: "/curriculum", label: "Curriculum", child: { href: "/important-dates", label: "Important Dates" } },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact-us", label: "Contact Us" }
];

function isCurrent(pathname, item) {
  return pathname === item.href || item.child?.href === pathname;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden border-b border-slate-100 bg-white px-6 py-3 text-xs text-slate-600 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="mailto:ndn@eim.ae">✉ &nbsp; ndn@eim.ae</a>
          <div className="flex gap-5 font-bold"><a href="https://www.facebook.com/EYEIG15">f</a><a href="https://www.instagram.com/eyeg_15">◎</a><a href="mailto:ndn@eim.ae">✉</a></div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md sm:px-8 lg:px-14">
        <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-6">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src="/api/media/assets/logo_ii.png" alt="EYEG" width={90} height={70} className="h-14 w-auto object-contain" priority />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <div className="group relative" key={item.href}>
                <Link className={`flex items-center gap-1 border-b-2 py-7 transition hover:text-[#168ac2] ${isCurrent(pathname,item)?"border-[#dd9933] text-slate-900":"border-transparent"}`} href={item.href}>
                  {item.label}{item.child && <span className="text-xs">⌄</span>}
                </Link>
                {item.child && <div className="invisible absolute left-1/2 top-[92%] w-72 -translate-x-1/2 translate-y-2 border-t-2 border-[#dd9933] bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"><Link className="block rounded px-4 py-3 text-sm hover:bg-slate-50 hover:text-[#168ac2]" href={item.child.href}>{item.child.label}</Link></div>}
              </div>
            ))}
          </nav>
          <button aria-controls="mobile-menu" aria-expanded={isOpen} aria-label={isOpen?"Close navigation":"Open navigation"} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#dd9933]/50 bg-white text-[#dd9933] md:hidden" onClick={() => setIsOpen(v=>!v)} type="button">
            <span className="flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden="true"><span className={`h-0.5 w-5 bg-current transition ${isOpen?"translate-y-2 rotate-45":""}`}/><span className={`h-0.5 w-5 bg-current transition ${isOpen?"opacity-0":""}`}/><span className={`h-0.5 w-5 bg-current transition ${isOpen?"-translate-y-2 -rotate-45":""}`}/></span>
          </button>
        </div>
        <div className={`fixed inset-0 top-0 z-40 bg-slate-950/40 transition md:hidden ${isOpen?"pointer-events-auto opacity-100":"pointer-events-none opacity-0"}`} onClick={()=>setIsOpen(false)} />
        <aside id="mobile-menu" className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(86vw,360px)] flex-col bg-white p-5 shadow-2xl transition-transform duration-300 md:hidden ${isOpen?"translate-x-0":"translate-x-full"}`} aria-hidden={!isOpen}>
          <div className="flex items-center justify-between"><Image src="/api/media/assets/logo_ii.png" alt="EYEG" width={90} height={70} className="h-14 w-auto object-contain"/><button className="h-11 w-11 rounded-lg border border-slate-200 text-2xl" onClick={()=>setIsOpen(false)} aria-label="Close navigation">×</button></div>
          <nav className="mt-8 grid gap-2 font-bold text-slate-700" aria-label="Mobile navigation">
            {navItems.map(item=><div key={item.href}><Link className={`block rounded-lg border px-4 py-3 ${isCurrent(pathname,item)?"border-[#43cec9] bg-[#43cec9]/10 text-[#168ac2]":"border-slate-200"}`} href={item.href} onClick={()=>setIsOpen(false)}>{item.label}</Link>{item.child&&<Link className="ml-5 mt-2 block rounded-lg bg-slate-50 px-4 py-3 text-sm" href={item.child.href} onClick={()=>setIsOpen(false)}>{item.child.label}</Link>}</div>)}
          </nav>
        </aside>
      </header>
    </>
  );
}
