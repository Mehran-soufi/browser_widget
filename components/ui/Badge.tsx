import type { HTMLAttributes } from "react";
import "../../styles/badge.css";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeSize = "sm" | "md";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export default function Badge({
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const classes = [
    "ui-badge",
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
