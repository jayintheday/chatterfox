import React from "react";
import { useTranslation } from "react-i18next";
import { SettingContainer } from "../ui/SettingContainer";

type ThemeOption =
  | "amber-den"
  | "twilight-forest"
  | "lavender-haze"
  | "sunset-dreams";

const THEME_STORAGE_KEY = "cf-theme";
const DEFAULT_THEME: ThemeOption = "amber-den";

interface ThemeSwitcherProps {
  grouped?: boolean;
}

const themes: { id: ThemeOption; nameKey: string; colors: string[] }[] = [
  {
    id: "amber-den",
    nameKey: "settings.theme.amberDen",
    colors: ["#ffd88a", "#e6960a", "#c4724e"],
  },
  {
    id: "twilight-forest",
    nameKey: "settings.theme.twilightForest",
    colors: ["#a8e6b4", "#5cb870", "#38bdf8"],
  },
  {
    id: "lavender-haze",
    nameKey: "settings.theme.lavenderHaze",
    colors: ["#e8d8ff", "#9b72d4", "#f5c8d8"],
  },
  {
    id: "sunset-dreams",
    nameKey: "settings.theme.sunsetDreams",
    colors: ["#ffd0be", "#e05a87", "#ffb8cc"],
  },
];

function getSavedTheme(): ThemeOption {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && themes.some((t) => t.id === saved)) {
      return saved as ThemeOption;
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  grouped = false,
}) => {
  const { t } = useTranslation();
  const [activeTheme, setActiveTheme] =
    React.useState<ThemeOption>(getSavedTheme);

  // Apply saved theme on mount
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, []);

  const handleThemeChange = (themeId: ThemeOption) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // ignore
    }
  };

  return (
    <SettingContainer
      title={t("settings.theme.title")}
      description={t("settings.theme.description")}
      descriptionMode="tooltip"
      grouped={grouped}
      layout="stacked"
    >
      <div className="flex gap-3 flex-wrap">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`cf-interactive flex flex-col items-center gap-2 p-3 rounded-cf-sm cursor-pointer transition-all ${
              activeTheme === theme.id
                ? "bg-cf-accent-soft ring-2 ring-cf-accent/30"
                : "bg-cf-surface-subtle hover:bg-cf-surface-hover"
            }`}
          >
            <div className="flex gap-1">
              {theme.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-cf-text-primary">
              {t(theme.nameKey)}
            </span>
          </button>
        ))}
      </div>
    </SettingContainer>
  );
};
