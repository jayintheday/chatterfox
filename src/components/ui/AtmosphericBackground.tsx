import React from "react";

export const AtmosphericBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "linear-gradient(180deg, var(--cf-hero-start) 0%, var(--cf-hero-mid) 50%, var(--cf-hero-end) 100%)",
      }}
    >
      {/* Blob 1 - Large warm amber */}
      <div
        className="cf-blob-animate absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "-10%",
          right: "-5%",
          background: "var(--cf-blob-1)",
          opacity: "var(--cf-blob-opacity)",
          filter: "blur(80px)",
        }}
      />
      {/* Blob 2 - Medium peach */}
      <div
        className="cf-blob-animate absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: "-15%",
          left: "-10%",
          background: "var(--cf-blob-2)",
          opacity: "var(--cf-blob-opacity)",
          filter: "blur(70px)",
          animationDelay: "-7s",
        }}
      />
      {/* Blob 3 - Small accent */}
      <div
        className="cf-blob-animate absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          top: "40%",
          left: "30%",
          background: "var(--cf-blob-3)",
          opacity: "var(--cf-blob-opacity)",
          filter: "blur(60px)",
          animationDelay: "-13s",
        }}
      />
    </div>
  );
};
