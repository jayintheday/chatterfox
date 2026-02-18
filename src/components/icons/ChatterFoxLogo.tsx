import React from "react";

const ChatterFoxLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="32"
        fontFamily="Nunito, SF Pro Rounded, ui-rounded, system-ui, sans-serif"
        fontWeight="800"
        fontSize="32"
        fill="var(--cf-text-primary)"
        letterSpacing="-0.5"
      >
        {"Chatter"}
        <tspan fill="var(--cf-accent)">{"Fox"}</tspan>
      </text>
    </svg>
  );
};

export default ChatterFoxLogo;
