"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/utils/config";
import Truncater from "@/components/Truncater";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  // track each image's loaded state individually to avoid one image hiding all placeholders
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  useGSAP(() => {
    if (!containerRef.current) return;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    projectRefs.current.forEach((projectEl) => {
      if (!projectEl) return;

      const article = projectEl.querySelector("article");
      const figure = projectEl.querySelector("figure");

      if (article) {
        gsap.fromTo(
          article,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: projectEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="bg-background text-foreground flex flex-col gap-24 relative section-container"
    >
      <h2 ref={titleRef} className="head-title">
        # Projects
      </h2>

      {PROJECTS.map((project, index) => (
        <section
          key={project.title}
          ref={(el: HTMLElement | null) => {
            projectRefs.current[index] = el;
          }}
          className="relative flex flex-col lg:flex-row justify-between items-start min-h-screen"
        >
          <article className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-[40%] flex flex-col justify-center p-6 lg:p-8">
            <h3 className="text-2xl lg:text-3xl text-white font-bold mb-3">
              {project.title}
            </h3>
            <Truncater text={project.description} />
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stacks.map((stack) => (
                <span
                  key={stack}
                  className="px-3 py-1 bg-primary/10 text-primary/50 hover:bg-primary cursor-pointer duration-200 transition-colors hover:text-background ease-in-out font-medium rounded-full text-xs"
                >
                  {stack}
                </span>
              ))}
            </div>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary cursor-pointer font-medium hover:underline"
              >
                View Project →
              </a>
            )}
          </article>

          <figure className="w-full lg:w-[55%] space-y-8 mt-8 lg:mt-0">
            {project.images.map((image, idx) => {
              const key = `${project.title}-${idx}`;
              const isLoaded = !!loadedMap[key];

              return (
                <div
                  key={idx}
                  className="h-full relative flex items-center justify-center text-white text-2xl lg:text-3xl font-semibold"
                >
                  {!isLoaded && (
                    <div className="w-full h-full min-h-[220px] bg-neutral-700 animate-pulse absolute top-0 z-10" />
                  )}
                  <img
                    src={image}
                    onLoad={() => setLoadedMap((m) => ({ ...m, [key]: true }))}
                    loading="lazy"
                    decoding="async"
                    className="hover:scale-105 transition-all  ease-in duration-300"
                    alt={`Screenshot of ${project.title}`}
                  />
                </div>
              );
            })}
          </figure>
        </section>
      ))}
    </section>
  );
}
