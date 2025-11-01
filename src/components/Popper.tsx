"use client";

import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import React, {
  useEffect,
  useRef,
  type PropsWithChildren,
  Activity,
} from "react";

export default function Popper({
  children,
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
} & PropsWithChildren) {
  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <PopperContent close={close}>{children}</PopperContent>
    </Activity>
  );
}

function PopperContent({
  close,
  children,
}: { close: () => void } & PropsWithChildren) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    gsap.to(menuRef.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: close,
    });
  };

  useGSAP(() => {
    // Entry animation
    gsap.set([backgroundRef.current, menuRef.current], { clearProps: "all" });
    gsap.to(backgroundRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    });
    gsap.fromTo(
      menuRef.current,
      { x: "-100%" },
      { x: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      ref={backgroundRef}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 w-full p-4 h-screen z-100 bg-background/10 backdrop-blur-sm opacity-0 flex justify-center items-center"
    >
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-black text-white rounded-lg p-8 max-w-lg w-full shadow-lg"
      >
        {children}

        <button
          onClick={handleClose}
          className="px-4 cursor-pointer py-2 bg-primary text-background rounded-md mt-4"
        >
          Close
        </button>
      </div>
    </section>
  );
}
