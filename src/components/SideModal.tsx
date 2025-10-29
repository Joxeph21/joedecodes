"use client";
import { techStack } from "@/utils/config";
import { ICON } from "@/utils/icon-export";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { Activity, useEffect } from "react";

type ModalProps = {
  close: () => void;
  isOpen: boolean;
};

export default function SideModal({ close, isOpen }: ModalProps) {
  const handleClose = () => {
    gsap.to("#menu", {
      x: "-100%",
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to("#background", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: close,
    });
  };

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to("#background", {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });

        gsap.fromTo(
          "#menu",
          { x: "-100%" },
          {
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <section
        id="background"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
        className="fixed inset-0 w-full h-screen z-100 bg-background/10 backdrop-blur-sm opacity-0"
      >
        <div
          id="menu"
          className="lg:w-[30vw] w-[95%] bg-background relative h-full overflow-y-auto scrollbar-hide"
        >
          <button
            aria-checked={isOpen}
            onClick={handleClose}
            role="switch"
            className="flex-center cursor-pointer aspect-square absolute right-5 top-5"
          >
            <Icon
              icon={ICON.CANCEL}
              fontSize={40}
              className="shrink-0 text-white duration-150 ease-in transition-colors"
            />
          </button>
          <section className="w-full mt-15 p-3  space-y-5">
            <h4 className="text-2xl text-white flex-center gap-1 w-fit font-bold">
              <Icon icon={ICON.FLARE} className="animate-spin" />
              Tech Stacks
            </h4>
            <div className="grid grid-cols-3 gap-5 ml-6">
              {techStack.map((stack, index) => (
                <figure key={index} className=" col-center gap-3">
                 <Icon icon={stack.icon} fontSize={50} />
                 <figcaption>{stack.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </section>
    </Activity>
  );
}
