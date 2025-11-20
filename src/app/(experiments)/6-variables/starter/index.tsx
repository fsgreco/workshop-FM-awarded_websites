"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { useMouseDistance } from "../utils/use-mouse-distance-hook";


export default function Page() {
	const distance = useMouseDistance()

  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid
      )}
    >
      <h1
				style={{'--distance': distance} as React.CSSProperties}
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
