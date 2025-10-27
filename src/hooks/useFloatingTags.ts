import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useFloatingTags(tagWrappers: React.MutableRefObject<Record<string, HTMLElement | null>>) {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    // Gather tag data
    const tagData = Object.entries(tagWrappers.current)
      .map(([_, el]) => {
        if (!el) return null;
        const { width, height } = el.getBoundingClientRect();
        return {
          el,
          width,
          height,
          x: gsap.utils.random(0, cw - width),
          y: gsap.utils.random(0, ch - height),
          vx: gsap.utils.random(-1, 1) * 2.5,
          vy: gsap.utils.random(-1, 1) * 2.5,
        };
      })
      .filter(Boolean) as {
        el: HTMLElement;
        width: number;
        height: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
      }[];

    // Set initial positions
    tagData.forEach((t) => {
      gsap.set(t.el, {
        x: t.x,
        y: t.y,
        opacity: 1,
        force3D: true,
        willChange: "transform",
      });
    });

    // One smooth ticker for all tags
    const updateAll = () => {
      for (const t of tagData) {
        t.x += t.vx;
        t.y += t.vy;

        // Bounce off edges
        if (t.x <= 0 || t.x + t.width >= cw) t.vx *= -1;
        if (t.y <= 0 || t.y + t.height >= ch) t.vy *= -1;

        gsap.set(t.el, { x: t.x, y: t.y });
      }
    };

    gsap.ticker.add(updateAll);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateAll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return container;
}
