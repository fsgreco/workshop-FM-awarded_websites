import React from "react";

const text = ["CSS".split(""), "version".split("")];

const STAGGER = 0.3;
const styles: React.CSSProperties = {
  display: "inline-block",
  animation: "reveal 0.4s cubic-bezier(0, 0.55, 0.45, 1)",
  animationDelay: `calc( var( --delay , 0 ) * ${STAGGER}s)`,
  animationFillMode: "both",
};

// you should use css modules or styled components here
let customKeyframes = `
	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(200px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
`;

export default function Page() {
  return (
    <>
      <style>{customKeyframes}</style>
      <div className="bg-blue-300 text-black">
        <div className="flex h-screen items-end justify-left overflow-hidden">
          <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
            {text[0].map((l, i) => (
              <span
                style={{ "--delay": i, ...styles } as React.CSSProperties}
                key={i}
              >
                {l}
              </span>
            ))}
            <br />
            {text[1].map((l, i) => (
              <span
                style={{ "--delay": i, ...styles } as React.CSSProperties}
                key={i}
              >
                {l}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </>
  );
}
