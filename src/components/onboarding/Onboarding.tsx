import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ChatterFoxLogo from "../icons/ChatterFoxLogo";
import { useModelStore } from "../../stores/modelStore";
import DownloadProgressDisplay from "../model-selector/DownloadProgressDisplay";

const PARAKEET_V3_ID = "parakeet-tdt-0.6b-v3";

interface OnboardingProps {
  onModelSelected: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onModelSelected }) => {
  const { t } = useTranslation();
  const {
    models,
    downloadModel,
    selectModel,
    downloadingModels,
    extractingModels,
    downloadProgress,
    downloadStats,
  } = useModelStore();
  const [started, setStarted] = useState(false);

  const isDownloading = PARAKEET_V3_ID in downloadingModels;
  const isExtracting = PARAKEET_V3_ID in extractingModels;
  const isBusy = isDownloading || isExtracting;

  // Watch for the model to finish downloading + extracting
  useEffect(() => {
    if (!started) return;

    const model = models.find((m) => m.id === PARAKEET_V3_ID);
    const stillDownloading = PARAKEET_V3_ID in downloadingModels;
    const stillExtracting = PARAKEET_V3_ID in extractingModels;

    if (model?.is_downloaded && !stillDownloading && !stillExtracting) {
      selectModel(PARAKEET_V3_ID).then((success) => {
        if (success) {
          onModelSelected();
        } else {
          toast.error(t("onboarding.errors.selectModel"));
          setStarted(false);
        }
      });
    }
  }, [
    started,
    models,
    downloadingModels,
    extractingModels,
    selectModel,
    onModelSelected,
    t,
  ]);

  const handleDownload = async () => {
    setStarted(true);
    const success = await downloadModel(PARAKEET_V3_ID);
    if (!success) {
      toast.error(t("onboarding.downloadFailed"));
      setStarted(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6 gap-6 inset-0">
      <ChatterFoxLogo width={200} />

      <p className="text-cf-text-secondary max-w-md font-medium text-center">
        {t("onboarding.subtitle")}
      </p>

      {!isBusy && !started && (
        <>
          <p className="text-cf-text-tertiary text-sm text-center">
            {t("onboarding.modelDescription")}
          </p>
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-cf bg-cf-accent text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {t("onboarding.downloadButton")}
          </button>
        </>
      )}

      {isDownloading && (
        <div className="w-full max-w-sm flex flex-col gap-2 items-center">
          <p className="text-cf-text-secondary text-sm">
            {t("onboarding.downloadingModel")}
          </p>
          <DownloadProgressDisplay
            downloadProgress={downloadProgress}
            downloadStats={downloadStats}
            className="w-full"
          />
        </div>
      )}

      {isExtracting && (
        <p className="text-cf-text-secondary text-sm animate-pulse">
          {t("onboarding.extractingModel")}
        </p>
      )}
    </div>
  );
};

export default Onboarding;
