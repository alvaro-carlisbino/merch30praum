"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary";
  disabled?: boolean;
}

interface ButtonProps extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: undefined;
  type?: undefined;
}

type Props = ButtonProps | LinkProps;

/**
 * Botão clássico de Windows — borda 3D outset, vira inset no :active.
 * Sem hover-fancy. Sem motion. Sem accent vibrante.
 */
export function WindowsButton(props: Props) {
  const { children, className, variant = "default", disabled } = props;

  const classes = cn(
    "win-btn inline-flex items-center justify-center min-w-[64px] px-3 py-1",
    variant === "primary" && "win-btn-primary",
    disabled && "opacity-60 cursor-not-allowed",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
