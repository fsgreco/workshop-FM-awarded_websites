"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { useMouseDistance } from "../utils/use-mouse-distance-hook";


const DynamicTitle = () => {
	const distance = useMouseDistance()

	return (
      <h1
        style={{ "--distance": distance } as React.CSSProperties}
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
