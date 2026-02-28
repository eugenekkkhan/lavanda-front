import { ButtonHTMLAttributes, ReactNode } from "react";

export interface BasicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isWide?: boolean;
  size?: "sm" | "base" | "lg";
  theme?: "primary" | "outline-light" | "outline-dark" | "ghost";
  rounding?: "none" | "sm" | "base" | "full";
}

const BasicButton = ({
  children,
  className = "",
  isWide = false,
  size = "base",
  theme = "outline-light",
  ...props
}: BasicButtonProps) => {
  const base =
    "pt-[10px] w-fit pb-[12px] text-base rounded-[21px] transition-colors cursor-pointer";

  const themeMap = {
    primary:
      "bg-[var(--color-secondary)] text-[var(--color-primary)] ring ring-[var(--color-secondary)] hover:bg-[var(--color-secondary)]",
    "outline-light":
      "bg-transparent text-[var(--color-secondary)] ring ring-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]",
    "outline-dark":
      "bg-transparent text-[var(--color-primary)] ring ring-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]",
    ghost:
      "bg-transparent text-[var(--color-primary)] ring ring-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]",
  };

  const paddingXMap = {
    sm: "px-[12px]",
    base: "px-[18px]",
    lg: "px-[30px]",
  };

  const paddingX = paddingXMap[size] || paddingXMap.base;
  const themeStyle = themeMap[theme] || themeMap["outline-light"];
  return (
    <button
      className={`${base} ${themeStyle} ${paddingX} ${isWide ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default BasicButton;
