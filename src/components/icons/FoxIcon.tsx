const FoxIcon = ({
  width,
  height,
  size,
  className,
  ...props
}: {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}) => (
  <svg
    width={width ?? size ?? 24}
    height={height ?? size ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Head with pointed ears */}
    <path d="M6 12 L8.5 4 L11 9.5 L13 9.5 L15.5 4 L18 12 C18 18.5 15.5 21 12 21 C8.5 21 6 18.5 6 12 Z" />
    {/* Eyes */}
    <circle cx="9.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
    {/* Nose */}
    <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export default FoxIcon;
