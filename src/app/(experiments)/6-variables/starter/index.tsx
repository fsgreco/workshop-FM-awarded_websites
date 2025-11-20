"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
// import { useMouseDistance } from "../utils/use-mouse-distance-hook";

import React from "react";
import { distance } from "@/lib/math";

/**
 * Similar to useMouseDistance but more performance (it avoids using useState under the hood) 
 * It directly adds the CSS Variable (custom prop) using the reference.current object
 * @param element 
 */
const useDistanceWithReference = ( element: React.RefObject<HTMLHeadingElement | null> ) => {
	React.useEffect(() => {
    const ctrl = new AbortController();
    window.addEventListener("mousemove", (event) => {
      const [x, y] = [event.clientX, event.clientY];
      const [ targetX, targetY ] = [ window.innerWidth / 2, window.innerHeight / 2 ]
      const mouseDistance = distance(x, y, targetX, targetY);
      const maxDistance = distance(0, 0, targetX, targetY);
      const relativeDistance = mouseDistance / maxDistance; // this will oscilate between 0 / 1 (0 center, 1 is border)

      if (element.current) {
				// Keep in mind when you use `setProperty` the value should be a string (so use `.toString()`)
        element.current.style.setProperty( "--distance", relativeDistance.toString() )
      }
    }, { signal: ctrl.signal, });
    return () => { ctrl.abort(); };
  }, []);
}

const DynamicTitle = () => {
	// const distance = useMouseDistance()
	const elementTitle = React.useRef<HTMLHeadingElement>(null)
	useDistanceWithReference(elementTitle)

	return (
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
  );
}


export default function Page() {

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
			<DynamicTitle />
    </div>
  );
}
