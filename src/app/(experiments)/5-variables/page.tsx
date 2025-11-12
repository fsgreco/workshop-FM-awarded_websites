"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { useEffect, useRef } from "react";
import { distance } from "@/lib/math";

export default function Page() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", (event) => {
      if (!titleRef.current) return;

      const { innerWidth, innerHeight } = window;
      // Calculate normalized distance from center (0,0) to center of screen (1,1)
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const maxDist = distance(0, 0, centerX, centerY);
      let dist = distance(centerX, centerY, event.clientX, event.clientY);

      dist /= maxDist;

      titleRef.current.style.setProperty("--distance", dist.toString());
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"]
        )}
        ref={titleRef}
      >
        Variables
      </h1>
    </div>
  );
}
