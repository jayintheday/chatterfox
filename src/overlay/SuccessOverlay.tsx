import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { syncLanguageFromSettings } from "@/i18n";

const SuccessOverlay: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const unlisten = await listen("transcription-complete", async () => {
        await syncLanguageFromSettings();
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 1500);
      });
      return () => unlisten();
    };
    setup();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        background: "rgba(44, 38, 32, 0.3)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 22,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        animation: "fadeInOut 1.5s ease-in-out",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(74, 222, 128, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span
        style={{
          color: "white",
          fontSize: 12,
          fontFamily:
            'Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontWeight: 600,
        }}
      >
        {t("overlay.transcribed", "Transcribed!")}
      </span>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.95); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
};

export default SuccessOverlay;
