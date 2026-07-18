import Image from "next/image";

export default function PageHero({ title, image, imageAlt, titleClass="text-[#034fad]", imageClass="object-cover" }){
  return <><div className="grid min-h-12 place-items-center bg-[#ed1c24] px-4 py-2 text-center text-sm font-black text-white sm:text-xl">Admissions Starting from Ages 2–6 Now!</div><section className="relative min-h-[390px] overflow-hidden bg-slate-50 sm:min-h-[520px]"><Image src={image} alt={imageAlt||title} fill priority sizes="100vw" className={imageClass}/><div className="relative z-10 mx-auto flex min-h-[390px] max-w-6xl items-center px-5 sm:min-h-[520px] sm:px-8"><div className="w-full text-center sm:w-1/3"><h1 className={`heading text-4xl sm:text-5xl ${titleClass}`}>{title}</h1><a className={`mt-4 inline-block text-5xl ${titleClass}`} href="#page-content" aria-label="Scroll to page content">⌄</a></div></div></section></>;
}
