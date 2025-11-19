"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import React from "react";


const animatedParams: gsap.TweenVars = {
	y: -100,
	x: 100,
	opacity: 1,
	stagger: 0.03,
	duration: 1.3,
	ease: "circ.out",
	onUpdate: () => {console.log('updating', Date.now())}
}


// css selector, animatedParams, reference
interface AnimationHookOb { selector: string; animatedParams: gsap.TweenVars; reference: React.RefObject<HTMLDivElement | null> }
const useGSAPAnimation = ({selector,animatedParams,reference}: AnimationHookOb) => {
	const animationCallback = () => gsap.to(selector, animatedParams)
	useGSAP(animationCallback, { scope: reference})
}

export default function Page() {
	const element = React.useRef<HTMLDivElement>(null)

	// React.useEffect(() => {
	// 	const ctx = gsap.context( () => gsap.to(".title", animatedParams), element )
	// 	return () => ctx.revert()
	// }, [])

	// They created this useGSAP that handle the context and the useEffect logic for you
	// useGSAP(() => gsap.to(".title", animatedParams), { scope: element })

	// I abstract that even more
	useGSAPAnimation({ animatedParams, reference: element, selector: ".title" });

	return (
		<div className="bg-blue-300 text-black">
			<div className="flex h-screen items-end justify-left overflow-hidden" ref={element}>
				<h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
					GSAP
					<br />
					tweens
				</h1>
			</div>
		</div>
	);
}
