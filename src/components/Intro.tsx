import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Stars from "@/ui/Stars";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TAGS = [
  {
    label: "# Developer",
    info: "Because I love turning ideas into interactive experiences that people can actually feel through code.",
  },
  {
    label: "# Creative",
    info: "I don’t just build interfaces — I design emotions, flow, and moments that stay with the user.",
  },
  {
    label: "# Visionary",
    info: "I’m obsessed with where the web is going — I build with tomorrow in mind, not just today.",
  },
  {
    label: "# Craftsman",
    info: "Every line of code, every animation, every pixel matters. I believe great products are built with care.",
  },
  {
    label: "# Motion",
    info: "Motion isn’t decoration — it’s storytelling. GSAP and Framer Motion are my tools for creating life in interfaces.",
  },
  {
    label: "# ProblemSolver",
    info: "I enjoy breaking down complex problems into clean, scalable, and smart solutions that just work.",
  },
  {
    label: "# Innovator",
    info: "I constantly experiment — new tools, new patterns, new ideas. Growth happens when you push boundaries.",
  },
  {
    label: "# Builder",
    info: "I love starting from nothing — building products that are real, useful, and make an impact.",
  },
];

const COLORS = [
  "bg-green-500/30",
  "bg-blue-500/30",
  "bg-pink-500/30",
  "bg-yellow-500/30",
  "bg-purple-500/30",
  "bg-red-500/30",
  "bg-cyan-500/30",
  "bg-orange-500/30",
];

export default function Intro() {
  const container = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useRef(
    typeof window !== "undefined" &&
      (window.innerWidth < 768 || "ontouchstart" in window)
  );
  const tagWrappers = useRef<Record<number, HTMLDivElement | null>>({});
  const tagRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const infoBoxes = useRef<Record<number, HTMLDivElement | null>>({});
  const animations = useRef<Record<number, gsap.core.Tween[]>>({});
  const tickerFns = useRef<(() => void)[]>([]);
  const tagStates = useRef<
    Array<{ x: number; y: number; vx: number; vy: number }>
  >([]);

  useGSAP(() => {
    const containerEl = container.current;
    if (!containerEl) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const isMobile = window.innerWidth < 768;

    const textWidth = divRef.current?.scrollWidth ?? 0;
    const vw = window.innerWidth;
    const extra = vw;
    // Adjust scroll distance for mobile
    const scrollDistance = isMobile
      ? Math.min(textWidth - vw, vw * 1.5)
      : textWidth - vw + vw * 0.1;
    const isMobileView = window.innerWidth < 768;

    gsap.to(divRef.current, {
      x: -(scrollDistance + extra),
      ease: "none",
      scrollTrigger: {
        trigger: containerEl,
        pin: true, // Disable pinning on mobile
        scrub: 1,
        start: "top top",
        end: `+=${
          isMobileView
            ? Math.min(scrollDistance + extra, window.innerWidth * 1.5)
            : scrollDistance + extra
        }`,
      },
    });

    const animationSpeed = isMobile ? 1 : 2.5; // Reduce animation speed on mobile

    // Create a single animation ticker for all tags
    const tagStates = new Map();

    Object.entries(tagWrappers.current).forEach(([index, wrapper]) => {
      if (!wrapper) return;

      const el = wrapper as HTMLElement;
      const elRect = el.getBoundingClientRect();
      const elWidth = elRect.width;
      const elHeight = elRect.height;

      // Random starting position inside container
      let x = gsap.utils.random(0, cw - elWidth);
      let y = gsap.utils.random(0, ch - elHeight);

      // Reduced velocity for mobile
      let vx = gsap.utils.random(-1, 1) * animationSpeed;
      let vy = gsap.utils.random(-1, 1) * animationSpeed;

      gsap.set(el, { x, y, opacity: 1 });

      const update = () => {
        x += vx;
        y += vy;

        // Bounce horizontally
        if (x <= 0 || x + elWidth >= cw) {
          vx *= -1;
          x = Math.max(0, Math.min(x, cw - elWidth));
        }

        // Bounce vertically
        if (y <= 0 || y + elHeight >= ch) {
          vy *= -1;
          y = Math.max(0, Math.min(y, ch - elHeight));
        }

        gsap.set(el, { x, y });
      };

      gsap.ticker.add(update);
      tickerFns.current.push(() => gsap.ticker.remove(update));

      animations.current[+index] = [
        {
          pause: () => (vx = vy = 0),
          resume: () => {
            vx = gsap.utils.random(-1, 1) * 2.5;
            vy = gsap.utils.random(-1, 1) * 2.5;
          },
        } as unknown as gsap.core.Tween,
      ];
    });

    // Cleanup on unmount
    return () => {
      tickerFns.current.forEach((remove) => remove());
      tickerFns.current = [];
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseEnter = (i: number) => {
    animations.current[i]?.forEach((a) => a.pause());
    const tag = tagRefs.current[i];
    const box = infoBoxes.current[i];

    if (tag) {
      gsap.to(tag, {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 0 25px rgba(255,255,255,0.3)",
      });
    }

    if (box) {
      gsap.killTweensOf(box);
      gsap.set(box, { opacity: 0, y: 10, display: "block" });
      gsap.to(box, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (i: number) => {
    animations.current[i]?.forEach((a) => a.resume());
    const tag = tagRefs.current[i];
    const box = infoBoxes.current[i];

    if (tag) {
      gsap.to(tag, {
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
        boxShadow: "0 0 15px rgba(255,255,255,0.15)",
      });
    }

    if (box) {
      gsap.killTweensOf(box);
      gsap.to(box, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(box, { display: "none" });
        },
      });
    }
  };

  return (
    <section
      ref={container}
      className=" w-screen h-screen fixed overflow-hidden bg-black"
    >
      <Stars />

      {/* Use fewer tags on mobile for better performance */}
      {TAGS.map((tag, i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <div
            key={i}
            ref={(el) => {
              tagWrappers.current[i] = el;
            }}
            className="absolute z-30"
          >
            <span
              ref={(el) => {
                tagRefs.current[i] = el;
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className={`floating-tag cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-full 
                backdrop-blur-none sm:backdrop-blur-md ${color} border border-white/20 shadow-none sm:shadow-[0_0_15px_rgba(255,255,255,0.15)]`}
            >
              {tag.label}
            </span>

            {/* Info Box */}
            <div
              ref={(el) => {
                infoBoxes.current[i] = el;
              }}
              style={{ display: "none" }}
              className={`absolute top-full mt-2 left-1/2 z-50 -translate-x-1/2 text-center ${color} border border-white/20 text-white text-xs backdrop-blur-md p-3 rounded-lg shadow-lg w-48`}
            >
              {tag.info}
            </div>
          </div>
        );
      })}

      {/* Main Scrolling Text */}
      <div
        ref={divRef}
        className="absolute inset-0 flex items-center ml-[10vw]"
      >
        <h1 className="whitespace-nowrap text-[25vw] sm:text-[30vw] font-bold uppercase text-white">
          I am Joseph Adenugba
        </h1>
      </div>
    </section>
  );
}
