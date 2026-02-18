import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-cf-lg focus:outline-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer cf-interactive";

  const variantClasses = {
    primary: "text-cf-cta-text shadow-cf-card hover:shadow-cf-elevated",
    "primary-soft":
      "text-cf-text-primary bg-cf-accent-soft hover:brightness-95 focus:ring-1 focus:ring-cf-accent",
    secondary:
      "bg-cf-surface-subtle text-cf-text-primary hover:bg-cf-surface-hover focus:outline-none shadow-cf-card",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-1 focus:ring-red-500 shadow-cf-card",
    "danger-ghost":
      "text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/20",
    ghost:
      "text-cf-text-primary hover:bg-cf-surface-subtle focus:bg-cf-surface-hover",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  // Primary gets a gradient background via inline style
  const isPrimary = variant === "primary";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={
        isPrimary
          ? {
              background:
                "linear-gradient(135deg, var(--cf-cta-start), var(--cf-cta-end))",
            }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
};
