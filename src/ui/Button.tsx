import { ICON } from "@/utils/icon-export";
import { Icon } from "@iconify/react";
import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";

type BUTTON_VARIANT = "primary" | "secondary" | "outlined";

type BUTTON_SIZE = "sm" | "md" | "rg" | "lg" | "full";

interface ButtonProps extends PropsWithChildren {
  config?: ButtonHTMLAttributes<HTMLButtonElement>;
  variant?: BUTTON_VARIANT;
  size?: BUTTON_SIZE;
  icon?: string;
  iconPlacement?: "left" | "right";
  isLoading?: boolean;
}

export default function Button({
  config,
  variant,
  size,
  isLoading,
  children,
  icon,
  iconPlacement = "right",
}: ButtonProps) {
  return (
    <button 
    
    {...config}
    
    >
      {isLoading ? (
        <Icon icon={ICON.LOADING} />
      ) : (
        <>
          {icon && iconPlacement === "left" && <Icon icon={icon} />}
          {children}
          {icon && iconPlacement === "right" && <Icon icon={icon} />}
        </>
      )}
    </button>
  );
}
