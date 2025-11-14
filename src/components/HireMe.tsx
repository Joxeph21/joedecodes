
import { ICON } from "@/utils/icon-export";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Popper from "./Popper";
import HireContent from "@/ui/HireContent";
import { USER } from "@/utils/config";


export default function HireMe() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="relative py-20 px-6 bg-[#EAEAD9]">
      <div className="max-w-5xl mx-auto">
        {/* CTA Card */}
        <div className="rounded-3xl bg-[#1C1C1C] text-white px-8 pb-30 md:pb-16 py-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold capitalize leading-tight">
              Ready to take the next step?
              <br />
              <span className="text-white/90">Take it With Me.</span>
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              I’ll turn your idea into a fast, modern, and accessible web
              experience. Schedule a free 30‑minute call and I’ll send back a
              short, no‑pressure proposal within 48 hours.
            </p>

            <div className="mt-8 flex items-center justify-center flex-col md:flex-row w-fit mx-auto relative gap-4">
              <a
                href={USER.SOCIALS.CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center cursor-pointer px-6 py-3 rounded-full bg-white text-background font-semibold shadow hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Schedule a free call
              </a>
              <button 
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-full hover:bg-[#CFFF3A] transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent/40">
                Hire Me
              </button>

              <figure className="absolute flex-center -bottom-15 md:-bottom-12 -right-15 md:-right-32 ">
                <img
                  src="/arrow.svg"
                  className="transform scale-x-[-1]"
                  aria-hidden
                  alt=""
                />
                <figcaption className="text-center mt-3 text-base text-foreground font-handlee max-w-32">
                  The Right step starts here 😉
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center col-center gap-2 text-sm text-gray-600">
          <a className="flex-center gap-1 hover:underline" href={`mailto:${USER.SOCIALS.MAIL}`}>
            <Icon icon={ICON.GMAIL}  />
            {USER.SOCIALS.MAIL}</a>
          <p>
            © {new Date().getFullYear()} {USER.NAME} — All rights reserved.
          </p>
        </div>
      </div>

      <Popper isOpen={isOpen} close={() => setIsOpen(false)}>
        <HireContent />
      </Popper>
    </section>
  );
}
