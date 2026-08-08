import { contact } from "@/app/lib/site-data";

export default function WhatsAppButton() {
  return (
    <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 font-bold text-white shadow-[0_12px_35px_rgba(0,0,0,.22)] transition hover:-translate-y-1" aria-label="Chat with New Dubai Nursery on WhatsApp">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true"><path d="M12.05 2a9.85 9.85 0 0 0-8.5 14.8L2 22l5.34-1.4A9.98 9.98 0 1 0 12.05 2Zm0 17.98a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.08-.2-.32a8.13 8.13 0 1 1 7 3.89Zm4.47-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.57.13-.16.24-.63.8-.78.96-.14.17-.28.19-.53.07-.24-.13-1.03-.38-1.96-1.21a7.29 7.29 0 0 1-1.35-1.68c-.14-.25 0-.38.11-.5.11-.1.25-.28.37-.42.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.16 0-.43.06-.65.3-.23.25-.86.85-.86 2.06 0 1.22.88 2.4 1 2.56.13.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.47-.28Z" /></svg>
      <span className="hidden text-sm sm:inline">WhatsApp</span>
    </a>
  );
}
