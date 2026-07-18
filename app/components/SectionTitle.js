export default function SectionTitle({ children, center=false, light=false, eyebrow }) {
  return <div className={center?"text-center":""}>{eyebrow&&<p className={`mb-2 text-xs font-black uppercase tracking-[.22em] ${light?"text-white/80":"text-[#168ac2]"}`}>{eyebrow}</p>}<h2 className={`heading text-3xl sm:text-4xl ${light?"text-white":"text-slate-800"}`}>{children}</h2><div className={`section-dots mt-4 ${center?"justify-center":""}`}><span/><span/><span/></div></div>;
}
