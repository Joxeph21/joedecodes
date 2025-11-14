
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Stars from "@/ui/Stars";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TAGS, USER } from "@/utils/config";

gsap.registerPlugin(ScrollTrigger);

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
  const tagWrappers = useRef<Record<number, HTMLDivElement | null>>({});
  const tagRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const infoBoxes = useRef<Record<number, HTMLDivElement | null>>({});
  const pausedTagData = useRef<
    Record<
      number,
      | {
          el: HTMLElement;
          x: number;
          y: number;
          vx: number;
          vy: number;
          w: number;
          h: number;
        }
      | undefined
    >
  >({});
  const tagData = useRef<
    {
      el: HTMLElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
    }[]
  >([]);

  const isMobile = useRef(
    typeof window !== "undefined" &&
      (window.innerWidth < 768 || "ontouchstart" in window)
  );

  useGSAP(() => {
    const containerEl = container.current;
    if (!containerEl) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const vw = window.innerWidth;
    const textWidth = divRef.current?.scrollWidth ?? 0;
    const extra = vw;
    const scrollDistance = textWidth - vw + vw * 0.1;

    // Horizontal scroll animation
    gsap.to(divRef.current, {
      x: -(scrollDistance + extra),
      ease: "none",
      scrollTrigger: {
        trigger: containerEl,
        pin: true,
      
        scrub: 1,
        start: "top top",
        end: `+=${scrollDistance + extra}`,
        onEnter: () => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      },
    });

    const speed = 0.8;
    tagData.current = [];

    Object.entries(tagWrappers.current).forEach(([_, wrapper]) => {
      if (!wrapper) return;
      const el = wrapper as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = gsap.utils.random(0, cw - rect.width);
      const y = gsap.utils.random(0, ch - rect.height);
      const vx = gsap.utils.random(-1, 1) * speed;
      const vy = gsap.utils.random(-1, 1) * speed;

      gsap.set(el, { x, y, opacity: 1, z: 0.01 });
      tagData.current.push({
        el,
        x,
        y,
        vx,
        vy,
        w: rect.width,
        h: rect.height,
      });
    });

    const update = () => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;

      for (const d of tagData.current) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x <= 0 || d.x + d.w >= cw) d.vx *= -1;
        if (d.y <= 0 || d.y + d.h >= ch) d.vy *= -1;
        gsap.set(d.el, { x: d.x, y: d.y });
      }
    };

    gsap.ticker.add(update);


    return () => {
      gsap.ticker.remove(update);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // console.log(window.location.hash)

    const ensureIntroAtTop = () => {
      if (window.location.hash === "#intro" && container.current) {
        const top = container.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        gsap.set(divRef.current, {xPercent: 0})

        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh(true);
          } catch (e) {
          }
        });
      }
    };

    setTimeout(ensureIntroAtTop, 0);

    window.addEventListener("hashchange", ensureIntroAtTop);
    return () => window.removeEventListener("hashchange", ensureIntroAtTop);
  }, []);

  const handleMouseEnter = (i: number) => {
    const tag = tagRefs.current[i];
    const box = infoBoxes.current[i];

    const index = tagData.current.findIndex(
      (d) => d.el === tagWrappers.current[i]
    );
    if (index !== -1) {
      pausedTagData.current[i] = tagData.current[index];

      tagData.current.splice(index, 1);
    }

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
      gsap.set(box, { opacity: 0, y: 10, display: "block", clearProps: "x" });

      const rect = box.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padding = 15;
      let adjustX = 0;
      let isFlipped = false;
      if (rect.bottom + padding > vh) {
        isFlipped = true;
      }

      if (rect.left < padding) {
        adjustX = padding - rect.left;
      } else if (rect.right > vw - padding) {
        adjustX = vw - padding - rect.right;
      }

      if (isFlipped) {
        box.classList.remove("top-full", "mt-2");
        box.classList.add("bottom-full", "mb-2");
      } else {
        box.classList.remove("bottom-full", "mb-2");
        box.classList.add("top-full", "mt-2");
      }

      const startY = isFlipped ? -10 : 10;
      const endY = 0;

      gsap.set(box, { opacity: 0, y: startY, x: adjustX, display: "block" });

      gsap.to(box, { opacity: 1, y: endY, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = (i: number) => {
    const tag = tagRefs.current[i];
    const box = infoBoxes.current[i];

    const pausedData = pausedTagData.current[i];
    if (pausedData) {
      const currentX = gsap.getProperty(pausedData.el, "x") as number;
      const currentY = gsap.getProperty(pausedData.el, "y") as number;

      pausedData.x = currentX;
      pausedData.y = currentY;

      tagData.current.push(pausedData);

      pausedTagData.current[i] = undefined;
    }

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
      id="intro"
      ref={container}
      className="w-screen min-h-screen relative  overflow-hidden bg-black"
    >
      <Stars />

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
              // onClick={() => handleMouseEnter(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className={`floating-tag  cursor-pointer select-none text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 
                ${
                  !isMobile.current
                    ? "backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : ""
                } ${color}`}
            >
              {tag.label}
            </span>

            <div
              key={i * Date.now()}
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
        <h1 className="whitespace-nowrap select-none text-[30vh] lg:text-[30vw] font-extrabold uppercase text-white">
          I am {USER.NAME}
        </h1>
      </div>
    </section>
  );
}
