import React from "react";

interface IconBadgeProps {
  children: React.ReactNode;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  children,
  color = "var(--cf-accent)",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-cf-sm flex items-center justify-center shrink-0 ${className}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
      }}
    >
      {children}
    </div>
  );
};
