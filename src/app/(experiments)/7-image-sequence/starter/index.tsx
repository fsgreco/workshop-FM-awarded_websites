"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create("h1", {
        type: "chars",
        charsClass:
          "char++ bg-linear-to-t from-black/10 to-white to-70% bg-clip-text",
        mask: "chars",
      });

      gsap.from("h1 .char", {
        x: "100%",
        rotateY: "90deg",
        stagger: 0.02,
        duration: 0.5,
        ease: "circ.out",
      });

      gsap.to("h1", {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          toggleActions: "play pause reset reverse",
        },
      });

      gsap.to(".cameras", {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "22% top",
          end: "35% top",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(".wheels", {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "95% bottom",
          toggleActions: "play pause resume reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="h-[400vh]">
      <section className="h-screen relative w-full overflow-clip">
        <h1 className="uppercase fixed text-[8vw] w-full text-center -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent">
          Perseverance
        </h1>
        <div className="cameras fixed top-1/2 -translate-y-1/2 right-8 max-w-full w-lg text-white opacity-0">
          <h2 className="text-6xl mb-2">Cameras</h2>
          <p className="text-balance">
            Mounted on the &quot;head&quot; of the rover&apos;s long-necked
            mast. The SuperCam on the Perseverance rover examines rocks and
            soils with a camera, laser, and spectrometers to seek chemical
            materials that could be related to past life on Mars.
          </p>
        </div>
        <div className="wheels fixed bottom-8 left-8 max-w-full w-lg text-white opacity-0">
          <h2 className="text-6xl mb-2">Wheels</h2>
          <p className="text-balance">
            The wheels are made of aluminium, with cleats for traction and
            curved titanium spokes for springy support.
          </p>
        </div>
      </section>
    </div>
  );
}
