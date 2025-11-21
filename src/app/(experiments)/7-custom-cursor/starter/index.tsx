"use client";

import React from "react";
import s from "./styles.module.css";
import { lerp } from "@/lib/math";

import gsap from "gsap";

// ALTERNATIVE WITHOUT USING useRef (?) - declaring the object outside 
const greenBoxPosition = { x: 0, y: 0 }
const mousePosition = { x: 0, y: 0 }
// declaring outside everything that is not dealing with React API
const updateMousePosition = (ev: MouseEvent) => {
	mousePosition.x = ev.clientX
	mousePosition.y = ev.clientY
}

const updateByFrame = (ref: React.RefObject<HTMLDivElement | null>) => (time:number,deltaTime:number) => {
	greenBoxPosition.x = lerp(greenBoxPosition.x, mousePosition.x, 0.01 * deltaTime)
	greenBoxPosition.y = lerp(greenBoxPosition.y, mousePosition.y, 0.01 * deltaTime)

	if (ref.current) {
		ref.current.style.setProperty("--x", greenBoxPosition.x.toString());
		ref.current.style.setProperty("--y", greenBoxPosition.y.toString());
	}
}



export default function Page() {
	const greenBox = React.useRef<HTMLDivElement | null>(null)

	React.useEffect(() => {
		const ctrl = new AbortController()
		window.addEventListener('mousemove', updateMousePosition , {signal: ctrl.signal})
		return () => ctrl.abort()
	}, [])

	React.useEffect(() => {
		// Instead of manually using requestAnimationFrame we hook into the gsap build in frame loop:
		const callback = gsap.ticker.add(updateByFrame(greenBox))
		return () => gsap.ticker.remove(callback)
	}, [])
	

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div className={s.cursor} ref={greenBox} />
    </div>
  );
}
