"use client";

import { services } from "@/utils/config";
import { Icon } from "@iconify/react";
import Popper from "@/components/Popper";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const [preview, setPreview] = useState<(typeof services)[number] | null>(
    null
  );

  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!items.length || !containerRef.current) return;

  
    const targets = items as Element[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%",
        toggleActions: "play none none reverse",
        // markers: true
      },
    });

    tl.to(targets, {
      top: "-40px",
      duration: 0.18,
      ease: "power1.out",
      stagger: { each: 0.12, from: "start" },
      immediateRender: false,
    }).to(
      targets,
      {
        top: "0px",
        duration: 0.7,
        ease: "bounce.out",
        stagger: { each: 0.12, from: "start" },
        immediateRender: false,
      },
      0.18
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const open = (service: (typeof services)[number]) => {
    setPreview(service);
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="bg-background text-foreground flex flex-col gap-24 relative section-container"
    >
      <h2 className="head-title"># Services</h2>

      <ul className="w-full p-4 grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 min-h-44">
        {services.map((serv, i) => (
          <li
            key={i}
            ref={(el: HTMLLIElement | null) => { itemRefs.current[i] = el }}
            className="
              service-item
              w-full overflow-hidden max-w-96 min-h-52 relative p-4 rounded-lg
              ring-1 ring-foreground flex flex-col gap-6 bg-black
              transition-all duration-300 ease-out
              hover:-rotate-2 hover:-translate-y-3 hover:ring-0 cursor-pointer group
              hover:bg-primary hover:text-background shadow-lg
            "
          >
            <div className="service-inner w-full h-full flex flex-col gap-6">
              <Icon
                icon={serv.icon}
                className="shrink-0 transition-colors duration-300 group-hover:text-background"
                fontSize={40}
              />

              <div className="space-y-2 transition-colors duration-300">
                <h4 className="text-white font-bold text-lg transition-colors duration-300 group-hover:text-background">
                  {serv.title}
                </h4>
                <p className="text-white/80 font-medium transition-colors duration-300 group-hover:text-background/90">
                  {serv.short}
                </p>
              </div>
              <button role="button" onClick={() => open(serv)}>
                <span className="w-fit flex-center cursor-pointer hover:underline transition-colors duration-300 group-hover:text-background">
                  Learn More{" "}
                  <Icon icon="basil:caret-right-outline" fontSize={22} />
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Popper isOpen={!!preview} close={() => setPreview(null)}>
        {preview && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Icon
                icon={preview?.icon}
                fontSize={42}
                className="text-primary shrink-0"
              />
              <h3 className="text-2xl font-bold text-white">{preview.title}</h3>
            </div>

            <p className="text-white/80 leading-relaxed">{preview.rich}</p>

            <hr />
          </div>
        )}
      </Popper>
    </section>
  );
}
