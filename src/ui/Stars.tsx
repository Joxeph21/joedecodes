"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
interface StarsProps {
  count?: number;
  color?: string;
  size?: number;
  type?: "sparkle" | "gold-sparkle" | "star";
}

export default function Stars({
  count = 200,
  type = "star",
  color="white"
}: StarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const finalCount = isMobileDevice ? 20 : count;

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<SVGElement>(
        containerRef.current?.children || []
      );

      elements.forEach((el) => {
        const delay = Math.random() * 3;
        const duration = 1.5 + Math.random() * 2;

        if (type === "star") {
          gsap.fromTo(
            el,
            { opacity: 0.3, scale: 0.8, rotate: 0 },
            {
              opacity: 1,
              scale: 1.4,
              rotate: 45,
              repeat: -1,
              yoyo: true,
              duration,
              delay,
              ease: "power1.inOut",
            }
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 2,
              repeat: -1,
              yoyo: true,
              duration: 2 + Math.random() * 3,
              delay,
              ease: "sine.inOut",
            }
          );
        }
      });
    },
    {scope: containerRef, dependencies: [type, finalCount] }
  );

  const stars = Array.from({ length: finalCount });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full "h-screen"
       overflow-hidden pointer-events-none`}
    >
      {stars.map((_, i) => (
        <Star key={i} color={color}  />
      ))}
    </div>
  );
}

/* ────────────────────────────
   Star Component
──────────────────────────── */
function Star({color}:{color:string}) {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = 1 + Math.random() * 5;

  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0.3,
        transform: "scale(0.8)",
      }}
    >
      <path
        d="M12 2L13.5 8.5H20L14.25 12.5L15.75 19L12 15L8.25 19L9.75 12.5L4 8.5H10.5L12 2Z"
        fill={color}
      />
    </svg>
  );
}
