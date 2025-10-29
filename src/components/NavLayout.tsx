import Nav from "@/ui/Nav";
import { ICON } from "@/utils/icon-export";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function NavLayout() {
  const [navOpen, setNavOpen] = useState<boolean>(false);

  const toggle = () => setNavOpen((prev) => !prev);

const props = {
    navOpen, toggle
}

  return (
    <>
      <button
      aria-checked={navOpen}
        onClick={toggle}
        role="switch"
        className="flex-center cursor-pointer z-50 fixed right-2 top-5 md:right-8 md:top-8"
      >
        <Icon
          icon={ICON.MENU}
          fontSize={40}
          className="shrink-0 text-foreground hover:text-white duration-150 ease-in transition-colors"
        />
      </button>

      <Nav {...props}/>
    </>
  );
}
