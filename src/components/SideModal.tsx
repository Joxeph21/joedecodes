import { STACK_TAGS } from "@/utils/config";
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

        // Optional: animate category sections
        gsap.from(".stack-category", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
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
          {/* Close Button */}
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

          {/* Content */}
          <section className="w-full mt-15 p-5 space-y-8">
            <h4 className="text-2xl text-white flex-center gap-2 w-fit font-bold">
              <Icon icon={ICON.FLARE} className="animate-spin text-primary" />
              Tech Stacks
            </h4>

            {/* Categories */}
            <div className="space-y-8">
              {STACK_TAGS.map((category, i) => (
                <div key={i} className="stack-category">
                  <h5 className="text-lg font-semibold text-white mb-4">
                    {category.title}
                  </h5>
                  <div className="grid grid-cols-3 gap-6 ml-3">
                    {category.items.map((stack, index) => (
                      <figure
                        key={index}
                        className="col-center gap-2 cursor-pointer hover:bg-[#212121]/50 p-1 text-center text-foreground rounded-sm lg:grayscale hover:grayscale-0 hover:text-white transition-all ease-in duration-200"
                      >
                        <Icon icon={stack.icon} fontSize={40} />
                        <figcaption className="text-sm font-medium">
                          {stack.label}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </Activity>
  );
}
