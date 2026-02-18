import React from "react";
import { SettingContainer } from "./SettingContainer";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isUpdating?: boolean;
  label: string;
  description: string;
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  tooltipPosition?: "top" | "bottom";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  isUpdating = false,
  label,
  description,
  descriptionMode = "tooltip",
  grouped = false,
  tooltipPosition = "top",
}) => {
  return (
    <SettingContainer
      title={label}
      description={description}
      descriptionMode={descriptionMode}
      grouped={grouped}
      disabled={disabled}
      tooltipPosition={tooltipPosition}
    >
      <label
        className={`relative inline-flex items-center ${disabled || isUpdating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled || isUpdating}
          onChange={(e) => onChange(e.target.checked)}
        />
        {/* Track */}
        <div
          className="w-[44px] h-[24px] rounded-full transition-all duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-cf-accent/30"
          style={{
            background: checked ? "var(--cf-accent)" : "var(--cf-toggle-off)",
          }}
        >
          {/* Knob */}
          <div
            className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out"
            style={{
              transform: checked ? "translateX(23px)" : "translateX(3px)",
            }}
          />
        </div>
      </label>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-cf-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </SettingContainer>
  );
};
