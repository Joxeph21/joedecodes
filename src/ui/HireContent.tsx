"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import { ICON } from "@/utils/icon-export";
import { USER } from "@/utils/config";

const socials = [
  {
    name: "Upwork",
    icon: ICON.UPWORK,
    url: USER.SOCIALS.UPWORK,
  },
  {
    name: "LinkedIn",
    icon: ICON.LINKEDIN2,
    url: USER.SOCIALS.LINKEDIN,
  },
  {
    name: "Whatsapp",
    icon: ICON.WHATSAPP,
    url: USER.SOCIALS.WHATSAPP,
  },
  {
    name: "Gmail",
    icon: ICON.GMAIL,
    url: `mailto:${USER.SOCIALS.MAIL}`,
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
