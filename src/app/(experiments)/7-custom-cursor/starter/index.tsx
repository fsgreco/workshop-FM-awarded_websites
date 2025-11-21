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

type ReactRef = React.RefObject<HTMLDivElement | null>
type Snap = null | { x:number, y:number, w: number, h: number }

const updateByFrame = (ref: ReactRef, snap: Snap) => (time:number,deltaTime:number) => {
	greenBoxPosition.x = lerp(greenBoxPosition.x, snap?.x ?? mousePosition.x, 0.01 * deltaTime)
	greenBoxPosition.y = lerp(greenBoxPosition.y, snap?.y ?? mousePosition.y, 0.01 * deltaTime)

	if (ref.current) {
		ref.current.style.setProperty("--x", greenBoxPosition.x.toString());
		ref.current.style.setProperty("--y", greenBoxPosition.y.toString());
		// if snap exist set width and height otherwise unset them (by using null it unsets the inline style)
		ref.current.style.setProperty("--w", snap?.w.toString() || null )
		ref.current.style.setProperty("--h", snap?.h.toString() || null )
	}
}


export default function Page() {
	const greenBox = React.useRef<HTMLDivElement | null>(null)
	const [ snap, setSnap ] = React.useState<Snap>(null)

	React.useEffect(() => {
		const ctrl = new AbortController()
		window.addEventListener('mousemove', updateMousePosition , {signal: ctrl.signal})
		return () => ctrl.abort()
	}, [])

	React.useEffect(() => {
		// Instead of manually using requestAnimationFrame we hook into the gsap build in frame loop:
		const callback = gsap.ticker.add(updateByFrame(greenBox, snap))
		return () => gsap.ticker.remove(callback)
	}, [snap])
	

	const onPointerEnterSnap = React.useCallback((ev: React.PointerEvent<HTMLHeadingElement>) => {
    // getClientRects() method returs the bounding rectangles for each CSS border box of the elements
    const rect = ev.currentTarget.getClientRects()
		// here we only need the first element
    setSnap({
			// rect[x/y] give me the top-left corner, to find the center i need to add them half of the width and height
      x: rect[0].x + rect[0].width / 2,
      y: rect[0].y + rect[0].height / 2,
      w: rect[0].width + 20,
      h: rect[0].height + 10,
    });
  },[]) 

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 
				onPointerLeave={() => setSnap(null)}
				onPointerEnter={onPointerEnterSnap}
				className="uppercase mr-130 text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div className={s.cursor} ref={greenBox} />
    </div>
  );
}
