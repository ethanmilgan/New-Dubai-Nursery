import Image from "next/image";
import Link from "next/link";
import { contact, navItems } from "@/app/lib/site-data";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--palm-dark)] px-5 pb-7 pt-16 text-white sm:px-8 lg:px-14 lg:pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_.65fr_.85fr_1.1fr]">
        <div>
          <Image src="/images/NDN2-1i.png" alt="New Dubai Nursery Early Learning Center" width={630} height={206} className="h-auto w-[250px] rounded-xl bg-white p-3" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">A warm, play-led early learning community where children explore, belong and grow in confidence.</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-[var(--sun)]">Part of Early Years Education Group</p>
        </div>
        <div>
          <FooterTitle>Explore</FooterTitle>
          <div className="mt-5 grid gap-2.5 text-sm text-white/65">{navItems.map((item) => <Link key={item.href} href={item.href} className="hover:text-[var(--sun)]">{item.label}</Link>)}</div>
        </div>
        <div>
          <FooterTitle>Contact</FooterTitle>
          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <a href={contact.phoneHref} className="hover:text-white">{contact.phone}</a>
            <a href={contact.whatsappHref} className="hover:text-white">WhatsApp {contact.whatsapp}</a>
            <a href={contact.emailHref} className="hover:text-white">{contact.email}</a>
            <a href={contact.instagramHref} target="_blank" rel="noreferrer" className="hover:text-white">{contact.instagram}</a>
          </div>
        </div>
        <div>
          <FooterTitle>Find us</FooterTitle>
          <address className="mt-5 text-sm not-italic leading-7 text-white/65">{contact.address}</address>
          <a href={contact.mapsHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-[var(--sun)]">Open in Google Maps <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} New Dubai Nursery Early Learning Center</span>
        <span>Quality care and early years education in Dubai</span>
      </div>
    </footer>
  );
}

function FooterTitle({ children }) {
  return <h2 className="text-xs font-black uppercase tracking-[.2em] text-white">{children}</h2>;
}
