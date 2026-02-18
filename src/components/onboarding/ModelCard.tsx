import React from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  Download,
  Globe,
  Languages,
  Loader2,
  Trash2,
} from "lucide-react";
import type { ModelInfo } from "@/bindings";
import { formatModelSize } from "../../lib/utils/format";
import {
  getTranslatedModelDescription,
  getTranslatedModelName,
} from "../../lib/utils/modelTranslation";
import { LANGUAGES } from "../../lib/constants/languages";
import Badge from "../ui/Badge";
import { Button } from "../ui/Button";

// Get display text for model's language support
const getLanguageDisplayText = (
  supportedLanguages: string[],
  t: (key: string, options?: Record<string, unknown>) => string,
): string => {
  if (supportedLanguages.length === 1) {
    const langCode = supportedLanguages[0];
    const langName =
      LANGUAGES.find((l) => l.value === langCode)?.label || langCode;
    return t("modelSelector.capabilities.languageOnly", { language: langName });
  }
  return t("modelSelector.capabilities.multiLanguage");
};

export type ModelCardStatus =
  | "downloadable"
  | "downloading"
  | "extracting"
  | "switching"
  | "active"
  | "available";

interface ModelCardProps {
  model: ModelInfo;
  variant?: "default" | "featured";
  status?: ModelCardStatus;
  disabled?: boolean;
  className?: string;
  onSelect: (modelId: string) => void;
  onDownload?: (modelId: string) => void;
  onDelete?: (modelId: string) => void;
  onCancel?: (modelId: string) => void;
  downloadProgress?: number;
  downloadSpeed?: number; // MB/s
  showRecommended?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  variant = "default",
  status = "downloadable",
  disabled = false,
  className = "",
  onSelect,
  onDownload,
  onDelete,
  onCancel,
  downloadProgress,
  downloadSpeed,
  showRecommended = true,
}) => {
  const { t } = useTranslation();
  const isFeatured = variant === "featured";
  const isClickable =
    status === "available" || status === "active" || status === "downloadable";

  // Get translated model name and description
  const displayName = getTranslatedModelName(model, t);
  const displayDescription = getTranslatedModelDescription(model, t);

  const baseClasses =
    "flex flex-col rounded-cf-md px-4 py-3 gap-2 text-left transition-all duration-200";

  const getVariantClasses = () => {
    if (status === "active") {
      return "bg-cf-accent-soft shadow-cf-card ring-2 ring-cf-accent/30";
    }
    if (isFeatured) {
      return "bg-cf-surface shadow-cf-elevated";
    }
    return "bg-cf-surface shadow-cf-card";
  };

  const getInteractiveClasses = () => {
    if (!isClickable) return "";
    if (disabled) return "opacity-50 cursor-not-allowed";
    return "cursor-pointer cf-card-interactive group";
  };

  const handleClick = () => {
    if (!isClickable || disabled) return;
    if (status === "downloadable" && onDownload) {
      onDownload(model.id);
    } else {
      onSelect(model.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(model.id);
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" && isClickable) handleClick();
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={[
        baseClasses,
        getVariantClasses(),
        getInteractiveClasses(),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Top section: name/description + score bars */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3
              className={`text-base font-semibold text-cf-text-primary ${isClickable ? "group-hover:text-cf-accent" : ""} transition-colors`}
            >
              {displayName}
            </h3>
            {showRecommended && model.is_recommended && (
              <Badge variant="primary">{t("onboarding.recommended")}</Badge>
            )}
            {status === "active" && (
              <Badge variant="primary">
                <Check className="w-3 h-3 mr-1" />
                {t("modelSelector.active")}
              </Badge>
            )}
            {status === "switching" && (
              <Badge variant="secondary">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                {t("modelSelector.switching")}
              </Badge>
            )}
          </div>
          <p className="text-cf-text-primary/60 text-sm leading-relaxed">
            {displayDescription}
          </p>
        </div>
        <div className="hidden sm:flex items-center ml-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-xs text-cf-text-primary/60 w-14 text-right">
                {t("onboarding.modelCard.accuracy")}
              </p>
              <div className="w-16 h-1.5 bg-cf-surface-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-cf-accent rounded-full"
                  style={{ width: `${model.accuracy_score * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-cf-text-primary/60 w-14 text-right">
                {t("onboarding.modelCard.speed")}
              </p>
              <div className="w-16 h-1.5 bg-cf-surface-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-cf-accent rounded-full"
                  style={{ width: `${model.speed_score * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-cf-border-subtle" />

      {/* Bottom row: tags + action buttons (full width) */}
      <div className="flex items-center gap-3 w-full -mb-0.5 mt-0.5 h-5">
        <div
          className="flex items-center gap-1 text-xs text-cf-text-primary/50"
          title={
            model.supported_languages.length === 1
              ? t("modelSelector.capabilities.singleLanguage")
              : t("modelSelector.capabilities.languageSelection")
          }
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{getLanguageDisplayText(model.supported_languages, t)}</span>
        </div>
        {model.supports_translation && (
          <div
            className="flex items-center gap-1 text-xs text-cf-text-primary/50"
            title={t("modelSelector.capabilities.translation")}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{t("modelSelector.capabilities.translate")}</span>
          </div>
        )}
        {status === "downloadable" && (
          <span className="flex items-center gap-1.5 ml-auto text-xs text-cf-text-primary/50">
            <Download className="w-3.5 h-3.5" />
            <span>{formatModelSize(Number(model.size_mb))}</span>
          </span>
        )}
        {onDelete && (status === "available" || status === "active") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            title={t("modelSelector.deleteModel", { modelName: displayName })}
            className="flex items-center gap-1.5 ml-auto text-cf-accent/85 hover:text-cf-accent hover:bg-cf-accent/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t("common.delete")}</span>
          </Button>
        )}
      </div>

      {/* Download/extract progress */}
      {status === "downloading" && downloadProgress !== undefined && (
        <div className="w-full mt-3">
          <div className="w-full h-1.5 bg-cf-surface-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-cf-accent rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-cf-text-primary/50">
              {t("modelSelector.downloading", {
                percentage: Math.round(downloadProgress),
              })}
            </span>
            <div className="flex items-center gap-2">
              {downloadSpeed !== undefined && downloadSpeed > 0 && (
                <span className="tabular-nums text-cf-text-primary/50">
                  {t("modelSelector.downloadSpeed", {
                    speed: downloadSpeed.toFixed(1),
                  })}
                </span>
              )}
              {onCancel && (
                <Button
                  variant="danger-ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCancel(model.id);
                  }}
                  aria-label={t("modelSelector.cancelDownload")}
                >
                  {t("modelSelector.cancel")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {status === "extracting" && (
        <div className="w-full mt-3">
          <div className="w-full h-1.5 bg-cf-surface-subtle rounded-full overflow-hidden">
            <div className="h-full bg-cf-accent rounded-full animate-pulse w-full" />
          </div>
          <p className="text-xs text-cf-text-primary/50 mt-1">
            {t("modelSelector.extractingGeneric")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelCard;
