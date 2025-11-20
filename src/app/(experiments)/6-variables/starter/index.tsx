"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
// import { useMouseDistance } from "../utils/use-mouse-distance-hook";
import { useWindowEventToCSSProperty } from "../utils/use-window-event-css-property";

import React from "react";
import { distance } from "@/lib/math";


const callbackForMouseMove = (event: MouseEvent) => {
	const [x, y] = [event.clientX, event.clientY];
	const [targetX, targetY] = [(window.innerWidth / 2), (window.innerHeight / 2)];
	const mouseDistance = distance(x, y, targetX, targetY);
	const maxDistance = distance(0, 0, targetX, targetY);
	const relativeDistance = mouseDistance / maxDistance; // this will oscilate between 0 / 1 (0 center, 1 is border)
	return relativeDistance;
};

export default function Page() {
	// const distance = useMouseDistance()

	const elementTitle = React.useRef<HTMLHeadingElement>(null);

	useWindowEventToCSSProperty("mousemove", callbackForMouseMove, elementTitle, "distance");

  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid
      )}
    >
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
			<h1
        // style={{ "--distance": distance } as React.CSSProperties}
				ref={elementTitle}
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"]
        )}
      >
        Variables
      </h1>
    </div>
  );
}
