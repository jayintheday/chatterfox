import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="space-y-2">
      {title && (
        <div className="px-4">
          <h2 className="text-[13px] font-semibold text-cf-text-secondary uppercase tracking-wide">
            {title}
          </h2>
          {description && (
            <p className="text-[12px] text-cf-text-tertiary mt-1">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="bg-cf-surface rounded-cf-md shadow-cf-card overflow-visible">
        <div className="flex flex-col gap-px">{children}</div>
      </div>
    </div>
  );
};
