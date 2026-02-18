import React from "react";
import ResetIcon from "../icons/ResetIcon";

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const ResetButton: React.FC<ResetButtonProps> = React.memo(
  ({ onClick, disabled = false, className = "", ariaLabel, children }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`p-1 rounded-cf-sm border border-transparent transition-all duration-150 ${
        disabled
          ? "opacity-50 cursor-not-allowed text-cf-text-tertiary"
          : "hover:bg-cf-accent/30 active:bg-cf-accent/50 active:translate-y-[1px] hover:cursor-pointer hover:border-cf-accent text-cf-text-primary"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children ?? <ResetIcon />}
    </button>
  ),
);
