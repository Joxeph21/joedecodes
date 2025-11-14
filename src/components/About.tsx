import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Marquee from "react-fast-marquee";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-export";
import SideModal from "./SideModal";
import { stats, techStack, USER } from "@/utils/config";
import Popper from "./Popper";
import HireContent from "@/ui/HireContent";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const [status, setStatus] = useState<"popup" | "sidebar" | "idle">("idle");
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const h3Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const statsRefs = useRef<Record<number, HTMLDivElement | null>>({});
const role = USER.ROLE.split(" ")
  useGSAP(() => {
    if (!titleRef.current) return;

    const split = new SplitText(titleRef.current as HTMLElement, {
      type: "chars",
    });

    gsap.fromTo(
      split.chars,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        color: "#fff",
        delay: 0.2,
        duration: 0.45,
        ease: "power3.out",
        stagger: { each: 0.04, from: "end" },
        scrollTrigger: {
          trigger: "#about-me",
          start: "top 60%",
        },
      }
    );

    if (h3Ref.current) {
      const h3Split = new SplitText(h3Ref.current as HTMLElement, {
        type: "chars",
      });
      gsap.set(h3Split.chars, {
        transformOrigin: "50% 50% -20px",
        perspective: 400,
      });
      gsap.fromTo(
        h3Split.chars,
        { rotationX: -90, opacity: 0 },
        {
          rotationX: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: 0.03,
          scrollTrigger: {
            trigger: h3Ref.current,
            start: "top 60%",
          },
        }
      );
    }

    // Paragraph: fade in line by line
    if (pRef.current) {
      const pSplit = new SplitText(pRef.current as HTMLElement, {
        type: "lines",
      });
      gsap.fromTo(
        pSplit.lines,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: pRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { y: 30, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    stats.forEach((s, idx) => {
      const el = statsRefs.current[idx];
      if (!el) return;
      const numEl = el.querySelector("h3 span");
      if (!numEl) return;

      const obj = { val: 0 } as { val: number };
      gsap.to(obj, {
        val: s.value,
        duration: 1.4,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
        onUpdate: () => {
          numEl.textContent = Math.floor(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <section
      id="about-me"
      className="bg-background text-foreground section-container"
    >
      <h2 ref={titleRef} className="head-title ">
        # WHO I AM
      </h2>

      <section className="grid grid-cols-1 w-full mt-20 gap-20 h-full lg:grid-cols-2 lg:grid-rows-[1fr_100px]">
        <article className="space-y-3 text-center lg:text-left">
          <h3
            ref={h3Ref}
            className="text-4xl lg:text-6xl font-extrabold uppercase text-foreground text-wrap"
          >
            <span className="text-primary">
              {role[0]}</span> 
              <br /> {role[1]}
            <br /> {role[2]}
          </h3>

          <p className="2xl:text-base" ref={pRef}>
            {USER.DESCRIPTION}
          </p>

         {USER.TAGLINE && <span className="uppercase text-xs font-bold text-primary">
          {USER.TAGLINE}
          </span>}

          <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center cursor-pointer px-6 py-3 rounded-full border border-white text-white font-semibold shadow hover:-translate-y-0.5 transition-transform hover:bg-white hover:text-background focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Download CV
            </a>
            <button
              onClick={() => setStatus("popup")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-full hover:bg-[#CFFF3A] transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent/40"
            >
              Hire Me
            </button>
          </div>
        </article>

        <figure className="mx-auto w-full md:w-96 overflow-hidden rounded-2xl relative aspect-square">
          <img
            ref={imgRef}
            src="/user.jpg"
            className="object-cover object-top"
            alt="profile_picture"
          />
        </figure>

        <div className="flex items-center flex-wrap gap-5 lg:flex-nowrap justify-center lg:justify-between lg:col-span-2">
          {stats.map((el, i) => (
            <div
              key={i}
              ref={(node) => {
                statsRefs.current[i] = node;
              }}
              className="col-center gap-1"
            >
              <h3 className="text-primary font-bold text-3xl">
                <span>{el.value}</span>
                {el.unit}
              </h3>
              <p className="font-medium text-base">{el.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full my-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl text-white flex-center gap-1 w-fit font-bold">
            <Icon icon={ICON.FLARE} className="animate-spin" />
            Tech Stacks
          </h4>

          <button
            onClick={() => setStatus("sidebar")}
            className="text-foreground font-medium ring-1 ring-foreground rounded-full px-4 py-1 text-xs hover:bg-primary hover:text-background hover:ring-black cursor-pointer transition-colors duration-300"
          >
            View All
          </button>
        </div>

        <SideModal isOpen={status === "sidebar"} close={() => setStatus("idle")} />

        <Marquee
          className=" overflow-hidden h-max"
          pauseOnHover={window.innerWidth > 768}
          loop={0}
        >
          {techStack.map((stack, index) => (
            <div
              key={index}
              className="relative inline-block mx-2 py-1 cursor-pointer space-y-3 lg:mx-5 hover:z-10 group"
            >
              {/* Icon */}
              <div className="md:grayscale mx-auto w-fit group-hover:grayscale-0 transition-all duration-300">
                <Icon
                  icon={stack.icon}
                  fontSize={60}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Label */}
              <div className=" opacity-0 group-hover:opacity-100 bg-primary text-background px-3 py-1 rounded-full text-xs whitespace-nowrap font-medium transition-opacity duration-200">
                {stack.label}
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      <p className="text-center  text-4xl  lg:text-5xl font-light flex flex-wrap justify-center gap-x-2 leading-snug my-10">
        {"I believe challenges are opportunities to create something better. For me, problem-solving is more than a skill — it’s an ART."
          .split(" ")
          .map((word, i) => (
            <span
              key={i}
              className={`${
                word === "ART." ? "text-primary font-bold" : "text-foreground"
              } cursor-pointer hover:text-white transition-colors duration-300`}
            >
              {word}
            </span>
          ))}
      </p>

      <hr className="my-10" />

      <Popper isOpen={status === "popup"} close={() => setStatus("idle")}>
        <HireContent />
      </Popper>
    </section>
  );
}
