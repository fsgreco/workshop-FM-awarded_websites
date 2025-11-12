"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import { useEffect, useRef, useState, useTransition } from "react";
import { distance, lerp } from "@/lib/math";
import gsap from "gsap";

export default function Page() {
  const titleRef = useRef<HTMLDivElement>(null);

  const [isPending, startTransition] = useTransition();

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // const [mousePositionTarget, setMousePositionTarget] = useState({
  //   x: 0,
  //   y: 0,
  // });

  // useEffect(() => {
  //   gsap.ticker.add((time, delta) => {
  //     setMousePosition((current) => ({
  //       x: lerp(current.x, mousePositionTarget.x, 0.1),
  //       y: lerp(current.y, mousePositionTarget.y, 0.1),
  //     }));
  //   });
  // }, [mousePositionTarget]);

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

      startTransition(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      />
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"]
        )}
        ref={titleRef}
      >
        Variables
      </h1>

      <div
        className=" absolute -top-3 -left-3 aspect-square w-6 border border-white translate-x-(--cursor-x) translate-y-(--cursor-y)"
        style={
          {
            "--cursor-x": mousePosition.x + "px",
            "--cursor-y": mousePosition.y + "px",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
