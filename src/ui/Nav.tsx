import { ICON } from "@/utils/icon-export";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Activity } from "react";
import { useRef } from "react";

const socials = [
  {
    icon: ICON.GITHUB,
    url: "https://github.com/Joxeph21",
  },
  {
    icon: ICON.LINKEDIN2,
    url: "https://www.linkedin.com/in/joseph-adenugba21/",
  },
  {
    icon: ICON.WHATSAPP,
    url: "https://wa.me/+2349036909765",
  },
];

const navLinks = [
  {
    title: "Home",
    href: "#intro",
  },
  {
    title: "About",
    href: "#about-me",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Reviews",
    href: "#testimonials",
  },
];

export default function Nav({
  navOpen,
  toggle,
}: {
  navOpen: boolean;
  toggle: () => void;
}) {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useRef(
    typeof window !== "undefined" &&
      (window.innerWidth < 768 || "ontouchstart" in window)
  );

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });

      tl?.current?.fromTo(
        "#navbar",
        { yPercent: -100, opacity: 0, scale: 0.8 },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power4.out",
        }
      );
      tl?.current?.fromTo(
        ".link",
        {
          y: 50,
          rotationX: -90,
          opacity: 0,
          transformOrigin: "bottom center",
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.12,
        },
        "-=0.2"
      );
      if (navOpen) tl?.current?.play();
    },
    { dependencies: [navOpen] }
  );

  //   const handleClose = () => {
  //     gsap.to("#navbar", {
  //       yPercent: -100,
  //       opacity: 0,
  //       scale: 0.8,
  //       duration: 0.5,
  //       ease: "power2.in",
  //       onComplete: toggle,
  //     });
  //   };

  const handleClose = () => {
    if (tl.current) {
      tl.current.reverse();
      tl.current.eventCallback("onReverseComplete", toggle);
    }
  };

  const handleHover = (target: HTMLAnchorElement) => {
    if (isMobile.current) return;
    gsap.to(target.querySelector(".underline"), {
      scaleX: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = (target: HTMLAnchorElement) => {
    if (isMobile.current) return;
    gsap.to(target.querySelector(".underline"), {
      scaleX: 0,
      duration: 0.4,
      ease: "power3.in",
    });
  };

  return (
    <Activity mode={navOpen ? "visible" : "hidden"}>
      <nav
        id="navbar"
        className="w-full h-screen fixed flex  flex-col inset-0 z-100 bg-primary pt-10 px-5 lg:p-10 text-background"
      >
        <button
          aria-checked={navOpen}
          onClick={handleClose}
          role="switch"
          className="flex-center cursor-pointer aspect-square absolute right-5 top-5"
        >
          <Icon
            icon={ICON.CANCEL}
            fontSize={40}
            className="shrink-0 text-background duration-150 ease-in transition-colors"
          />
        </button>

        <ul className="flex flex-col md:my-auto  gap-5">
          {navLinks.map((el) => (
            <a
              href={el.href}
              key={el.title}
              onMouseEnter={(e) => handleHover(e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              onClick={handleClose}
              className="text-5xl relative w-fit link opacity-0 uppercase  font-medium lg:font-normal lg:text-8xl"
            >
              {el.title}
              <span className="underline absolute left-0 bottom-0 h-2 rounded-full bg-background w-full origin-left scale-x-0" />
            </a>
          ))}
        </ul>
        <ul className="flex-center mt-auto mb-4 self-end w-fit gap-10">
          {socials.map((el) => (
            <a href={el.url} target="_blank" key={el.url}>
              <Icon icon={el.icon} fontSize={50} />
            </a>
          ))}
        </ul>
      </nav>
    </Activity>
  );
}
