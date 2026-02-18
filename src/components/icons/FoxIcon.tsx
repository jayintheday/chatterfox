const FoxIcon = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg
    width={width || 24}
    height={height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Fox ears */}
    <path d="M4.5 2L7 8.5H5L3 5L4.5 2Z" fill="var(--cf-accent)" opacity="0.9" />
    <path
      d="M19.5 2L17 8.5H19L21 5L19.5 2Z"
      fill="var(--cf-accent)"
      opacity="0.9"
    />
    {/* Fox face */}
    <ellipse
      cx="12"
      cy="13"
      rx="7.5"
      ry="7"
      fill="var(--cf-accent)"
      opacity="0.85"
    />
    {/* Inner face / lighter snout area */}
    <ellipse cx="12" cy="15" rx="4" ry="3.5" fill="var(--cf-accent-soft)" />
    {/* Eyes */}
    <circle cx="9.5" cy="11.5" r="1.2" fill="var(--cf-text-primary)" />
    <circle cx="14.5" cy="11.5" r="1.2" fill="var(--cf-text-primary)" />
    {/* Eye highlights */}
    <circle cx="10" cy="11" r="0.4" fill="white" />
    <circle cx="15" cy="11" r="0.4" fill="white" />
    {/* Nose */}
    <ellipse cx="12" cy="14.5" rx="1" ry="0.7" fill="var(--cf-text-primary)" />
    {/* Mouth */}
    <path
      d="M11 15.5C11.5 16 12.5 16 13 15.5"
      stroke="var(--cf-text-primary)"
      strokeWidth="0.6"
      strokeLinecap="round"
    />
  </svg>
);

export default FoxIcon;
