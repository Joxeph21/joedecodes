import Marquee from "react-fast-marquee";
import Card, { type Props } from "@/ui/Card";
import { Activity, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Slider({ reviews }: { reviews: Props[] }) {
  const [selected, setSelected] = useState<Props | null>(null);

  return (
    <section className="w-full col-center md:p-3 gap-3">
      <Activity mode={!selected ? "hidden" : "visible"}>
        <Modal selected={selected} close={() => setSelected(null)} />
      </Activity>
      <Marquee
        direction="left"
        pauseOnClick
        pauseOnHover
        className="w-full p-4"
      >
        {reviews.slice(0, 5).map((el) => (
          <Card key={el.id} {...el} open={() => setSelected(el)} />
        ))}
      </Marquee>
      <Marquee
        direction="right"
        pauseOnClick
        pauseOnHover
        className="w-full p-4"
      >
        {reviews.slice(-5).map((el) => (
          <Card key={el.id} {...el} open={() => setSelected(el)} />
        ))}
      </Marquee>
    </section>
  );
}

function Modal({
  selected,
  close,
}: {
  selected: Props | null;
  close: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (selected && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selected]);

  const handleClose = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: close,
    });
  };

  return (
    <section
      onClick={handleClose}
      className="w-full h-screen fixed inset-0 z-100 bg-black/20 backdrop-blur-sm flex-center"
    >
      <div
        ref={cardRef}
        className="relative scale-0 w-lg mx-3 cursor-pointer p-6 min-h-68 h-max flex flex-col justify-between rounded-xl bg-[#0b0b0b] border-2 group  transition-all duration-300 ease-out border-accent/40 hover:-translate-y-1"
      >
        <svg
          className="text-accent  absolute right-5 top-5 transition-all duration-300 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2.5 5H11v7.65L6.518 19H3.795l2.666-6H2.5zM13 5h8.5v7.65L17.018 19h-2.723l2.666-6H13z"
          />
        </svg>

        <p className="text-white max-w-[85%] mb-4 text-sm leading-relaxed ">
          &quot; {selected?.content} &quot;
        </p>

        <div className="w-full h-px bg-foreground/10 my-auto mb-3" />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base text-accent font-medium  capitalize">
              {selected?.name}
            </h4>
            <span className="text-xs text-foreground/50">{selected?.role}</span>
          </div>
          <figure className="size-10 rounded-full overflow-hidden border border-foreground/20">
            <img
              src={selected?.avatar}
              alt={`${selected?.name}_avatar`}
              className="object-cover object-center w-full h-full"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
