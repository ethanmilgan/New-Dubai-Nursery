"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides=[
  {image:"/api/media/assets/1903x823-1.jpg",kicker:"care & early years education",title:"Providing the best start for your child through quality",align:"items-end text-right",button:"Learn More"},
  {image:"/api/media/assets/1903x823b.jpg",kicker:"with us...",title:"Start your Learning Journey",align:"items-start text-left",button:"Discover EYEG",dark:true}
];

export default function HomeHero(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setActive(v=>(v+1)%slides.length),6000);return()=>clearInterval(id)},[]);
  const move=n=>setActive(v=>(v+n+slides.length)%slides.length);
  return <section className="relative min-h-[520px] overflow-hidden sm:min-h-[650px]" aria-label="EYEG highlights"><div className="absolute inset-x-0 top-0 z-20 grid min-h-12 place-items-center bg-[#ed1c24] px-4 py-2 text-center text-sm font-black text-white sm:text-2xl">Admissions Starting from Ages 2–6 Now!</div>{slides.map((slide,i)=><article key={slide.image} className={`absolute inset-0 transition-opacity duration-700 ${active===i?"opacity-100":"pointer-events-none opacity-0"}`} aria-hidden={active!==i}><Image src={slide.image} alt="EYEG learning journey" fill priority={i===0} sizes="100vw" className="object-cover max-sm:object-[85%_center]"/><div className={`relative z-10 mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-12 pt-14 text-white sm:min-h-[650px] sm:px-8 ${slide.align}`}><div className="max-w-xl"><p className={`text-xs font-bold uppercase tracking-[.25em] sm:text-base ${slide.dark?"text-slate-600":""}`}>{slide.kicker}</p><h1 className={`mt-3 text-3xl font-light leading-tight drop-shadow-md sm:text-5xl lg:text-6xl ${slide.dark?"text-[#168ac2]":""}`}>{slide.title}</h1><Link href="/about-us" className="mt-6 inline-grid h-24 w-24 place-items-center rounded-full bg-[#43cec9] px-3 text-center text-xs font-black uppercase text-white shadow-xl transition hover:-translate-y-1">{slide.button}</Link></div></div></article>)}<button className="absolute left-0 top-1/2 z-20 h-16 w-10 -translate-y-1/2 bg-slate-900/20 text-4xl text-white hover:bg-slate-900/40" onClick={()=>move(-1)} aria-label="Previous slide">‹</button><button className="absolute right-0 top-1/2 z-20 h-16 w-10 -translate-y-1/2 bg-slate-900/20 text-4xl text-white hover:bg-slate-900/40" onClick={()=>move(1)} aria-label="Next slide">›</button><div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">{slides.map((_,i)=><button key={i} onClick={()=>setActive(i)} aria-label={`Show slide ${i+1}`} className={`h-2.5 w-2.5 rounded-full border border-white ${active===i?"bg-white":""}`}/>)}</div></section>;
}
