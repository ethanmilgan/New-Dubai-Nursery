"use client";
import { useEffect, useState } from "react";

export default function FloatingActions(){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{const onScroll=()=>setVisible(window.scrollY>500);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
  return <><button aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className={`fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-slate-800 text-white shadow-lg transition ${visible?"opacity-80":"pointer-events-none opacity-0"}`}>↑</button><a className="fixed bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-2xl text-white shadow-xl" href="https://wa.me/971566990985" aria-label="Chat on WhatsApp">◔</a></>;
}
