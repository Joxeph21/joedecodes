import gsap from "gsap";
import { useRef } from "react";

export interface Props {
  id: number;
  createdAt: string;
  role: string;
  name: string;
  avatar: string;
  content: string;
  open: () => void;
}

export default function Card(props: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);



  return (
    <div
      ref={cardRef}
      onClick={() => props?.open()}
      className="relative w-96 mx-3 cursor-pointer p-6 min-h-68 flex flex-col justify-between rounded-xl bg-[#0b0b0b] border group border-foreground/15 transition-all duration-300 ease-out hover:border-accent/40 hover:-translate-y-1"
    >
      <svg
        className="text-foreground/25 group-hover:text-accent  absolute right-5 top-5 transition-all duration-300 group-hover:scale-110"
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

      <p className="text-foreground/80 group-hover:text-white max-w-[85%] text-sm leading-relaxed  line-clamp-6">
        {props.content}
      </p>

      <div className="w-full h-px bg-foreground/10 my-auto mb-3" />

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base group-hover:text-accent font-medium text-foreground capitalize">
            {props.name}
          </h4>
          <span className="text-xs text-foreground/50">{props.role}</span>
        </div>
        <figure className="size-10 rounded-full overflow-hidden border border-foreground/20">
          <img
            src={props.avatar}
            alt={`${props.name}_avatar`}
            className="object-cover object-center w-full h-full"
          />
        </figure>
      </div>
    </div>
  );
}
