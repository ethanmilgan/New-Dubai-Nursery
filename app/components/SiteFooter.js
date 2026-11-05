import Image from "next/image";
import Link from "next/link";
import { contact as defaultContact, navItems } from "@/app/lib/site-data";

export default function SiteFooter({ contact = defaultContact }) {
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
            <a href={contact.phoneHref} aria-label={`Call ${contact.phone}`} className="flex items-center gap-3 hover:text-white"><ContactIcon type="phone" /><span>{contact.phone}</span></a>
            <a href={contact.whatsappHref} aria-label={`WhatsApp ${contact.whatsapp}`} className="flex items-center gap-3 hover:text-white"><ContactIcon type="whatsapp" /><span>{contact.whatsapp}</span></a>
            <a href={contact.emailHref} aria-label={`Email ${contact.email}`} className="flex items-center gap-3 hover:text-white"><ContactIcon type="email" /><span>{contact.email}</span></a>
            <a href={contact.instagramHref} target="_blank" rel="noreferrer" aria-label={`Instagram ${contact.instagram}`} className="flex items-center gap-3 hover:text-white"><ContactIcon type="instagram" /><span>{contact.instagram}</span></a>
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

function ContactIcon({ type }) {
  if (type === "whatsapp") {
    return <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true" focusable="false"><path d="M12.05 2a9.85 9.85 0 0 0-8.5 14.8L2 22l5.34-1.4A9.98 9.98 0 1 0 12.05 2Zm0 17.98a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.13 8.13 0 1 1 7 3.89Zm4.47-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.57.13-.16.24-.63.8-.78.96-.14.17-.28.19-.53.07-.24-.13-1.03-.38-1.96-1.21a7.29 7.29 0 0 1-1.35-1.68c-.14-.25 0-.38.11-.5.11-.1.25-.28.37-.42.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.16 0-.43.06-.65.3-.23.25-.86.85-.86 2.06 0 1.22.88 2.4 1 2.56.13.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.47-.28Z" /></svg>;
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {type === "phone" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92Z" />}
      {type === "email" && <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7L22 6" /></>}
      {type === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></>}
    </svg>
  );
}
