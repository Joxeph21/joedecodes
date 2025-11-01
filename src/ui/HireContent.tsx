"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-export";

const socials = [
  {
    name: "Upwork",
    icon: ICON.UPWORK,
    url: "https://www.upwork.com/freelancers/~0178ebea602c9fd0c5",
  },
  {
    name: "LinkedIn",
    icon: ICON.LINKEDIN2,
    url: "https://www.linkedin.com/in/joseph-adenugba21/",
  },
  {
    name: "Whatsapp",
    icon: ICON.WHATSAPP,
    url: "https://wa.me/+2349036909765",
  },
  {
    name: "Gmail",
    icon: ICON.GMAIL,
    url: "mailto:codewithjoxeph@gmail.com",
  },
];

export default function HireContent() {
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".social-item");

    gsap.from(items, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      ease: "power3.out",
      duration: 0.8,
    });
  }, []);

  return (
    <section className="flex flex-col mb-3 gap-4">
      <h3 className="font-medium text-base text-white">Reach me on:</h3>

      <ul ref={containerRef} className="flex-center gap-8">
        {socials.map((social) => (
          <a
            key={social.name}
            target="_blank"
            rel="noopener noreferrer"
            href={social.url}
            className="social-item col-center cursor-pointer group"
          >
            <Icon
              icon={social.icon}
              fontSize={40}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <p className="font-medium text-primary mt-1 group-hover:text-white transition-colors duration-300">
              {social.name}
            </p>
          </a>
        ))}
      </ul>
    </section>
  );
}
