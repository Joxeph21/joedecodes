// import React from 'react'

import { ICON } from "@/utils/icon-export";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Popper from "./Popper";
import HireContent from "@/ui/HireContent";

// export default function HireMe() {
//   return (
//     <section className='w-full p-2 max-w-[90%] md:max-w-3xl lg:max-w-4xl gap-10 rounded-2xl bg-primary mx-auto h-96 col-center'>
//         <p className='text-3xl md:text-4xl  text-center capitalize font-extrabold'>Have a Project in Mind?. <br/> Lets bring it to life</p>
//         <button className='md:w-lg w-40 p-3 rounded-lg text-white font-semibold hover:opacity-70 ease-in duration-200 transition-colors cursor-pointer bg-background '>Hire Me</button>
//     </section>
//   )
// }

// export default function HireMe() {
//   return (
//     <section className="max-w-4xl mx-auto py-12 md:py-16 px-6 rounded-2xl bg-[#212121] shadow-lg ring-1 ring-black/10">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="text-center md:text-left">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
//             Have a project in mind? Let’s build it.
//           </h2>
//           <p className="mt-3 text-white/90 max-w-xl">
//             I’ll help you turn it into a fast, accessible website. Schedule a
//             free 30‑minute call and I’ll send back a short, no‑pressure proposal
//             within 48 hours."
//           </p>

//           <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
//             <a
//               href="#contact"
//               className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary-700 font-semibold shadow hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
//             >
//               Schedule a free call
//             </a>

//             {/* <a
//               href="/projects"
//               className="inline-flex items-center px-4 py-2 rounded-md text-white/95 border border-white/20 hover:bg-white/5"
//             >
//               See recent work
//             </a> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

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
                href="https://calendly.com/codewithjoxeph/project-discussion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center cursor-pointer px-6 py-3 rounded-full bg-white text-background font-semibold shadow hover:-translate-y-0.5 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                Schedule a free call
              </a>
              <button 
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A7F32A] text-black font-semibold rounded-full hover:bg-[#CFFF3A] transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#A7F32A]/40">
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
          <a className="flex-center gap-1 hover:underline" href="mailto:codewithjoxeph@gmail">
            <Icon icon={ICON.GMAIL}  />
            codewithjoxeph@gmail</a>
          <p>
            © {new Date().getFullYear()} Joseph Adenugba — All rights reserved.
          </p>
        </div>
      </div>

      <Popper isOpen={isOpen} close={() => setIsOpen(false)}>
        <HireContent />
      </Popper>
    </section>
  );
}
