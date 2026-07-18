"use client";
import { useEffect, useState } from "react";

const items=[
  ["Since joining EYEG, our son has made remarkable progress. He shares everything he learns—from songs to stories—and looks forward to nursery every day.","Bijil & Rohini"],
  ["We are grateful for the patience, warmth and care. Our daughter has grown in confidence, communication and independence.","Maahi Punjwani"],
  ["The team created such a nurturing and joyful environment. Our children blossomed while feeling happy and safe every day.","Raji Arun"],
  ["The teachers are compassionate and committed to every child’s growth. EYEG gave our daughter an incredible start.","The Austria Family"]
];
export default function TestimonialSlider(){const [active,setActive]=useState(0);useEffect(()=>{const id=setInterval(()=>setActive(v=>(v+1)%items.length),7000);return()=>clearInterval(id)},[]);const [quote,name]=items[active];return <div className="mx-auto mt-8 max-w-4xl text-center"><div className="heading text-7xl leading-none text-[#43cec9]">“</div><blockquote className="text-lg font-light leading-8 text-slate-600 sm:text-xl">{quote}</blockquote><p className="mt-5 font-black text-[#168ac2]">{name}</p><div className="mt-6 flex justify-center gap-2">{items.map((_,i)=><button key={i} onClick={()=>setActive(i)} aria-label={`Show testimonial ${i+1}`} className={`h-2.5 w-2.5 rounded-full border border-slate-400 ${active===i?"border-[#43cec9] bg-[#43cec9]":""}`}/>)}</div></div>}
