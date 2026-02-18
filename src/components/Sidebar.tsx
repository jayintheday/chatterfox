import React from "react";
import { useTranslation } from "react-i18next";
import { Cog, FlaskConical, History, Info, SlidersHorizontal } from "lucide-react";
import ChatterFoxLogo from "./icons/ChatterFoxLogo";
import { IconBadge } from "./ui/IconBadge";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  DebugSettings,
  AboutSettings,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  icon: React.ComponentType<IconProps>;
  component: React.ComponentType;
  enabled: (settings: any) => boolean;
  accentVar: string;
}

export const SECTIONS_CONFIG = {
  general: {
    labelKey: "sidebar.general",
    icon: SlidersHorizontal,
    component: GeneralSettings,
    enabled: () => true,
    accentVar: "var(--cf-section-general)",
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: Cog,
    component: AdvancedSettings,
    enabled: () => true,
    accentVar: "var(--cf-section-advanced)",
  },
  history: {
    labelKey: "sidebar.history",
    icon: History,
    component: HistorySettings,
    enabled: () => true,
    accentVar: "var(--cf-section-history)",
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: FlaskConical,
    component: DebugSettings,
    enabled: (settings) => settings?.debug_mode ?? false,
    accentVar: "var(--cf-section-debug)",
  },
  about: {
    labelKey: "sidebar.about",
    icon: Info,
    component: AboutSettings,
    enabled: () => true,
    accentVar: "var(--cf-section-about)",
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  return (
    <div className="flex flex-col w-44 h-full bg-cf-surface/80 backdrop-blur-xl items-center px-2">
      <ChatterFoxLogo width={140} className="m-4" />
      <div className="flex flex-col w-full items-center gap-1 pt-2">
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              className={`cf-interactive flex gap-2 items-center p-2 w-full rounded-cf-sm cursor-pointer transition-all duration-150 ${
                isActive ? "" : "opacity-70 hover:opacity-90"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: `color-mix(in srgb, ${section.accentVar} 10%, transparent)`,
                    }
                  : undefined
              }
              onClick={() => onSectionChange(section.id)}
            >
              <IconBadge
                size="sm"
                color={isActive ? section.accentVar : "var(--cf-text-tertiary)"}
              >
                <Icon
                  width={16}
                  height={16}
                  style={{
                    color: isActive
                      ? section.accentVar
                      : "var(--cf-text-tertiary)",
                  }}
                />
              </IconBadge>
              <p
                className="text-[13px] font-semibold truncate"
                style={isActive ? { color: section.accentVar } : undefined}
                title={t(section.labelKey)}
              >
                {t(section.labelKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
