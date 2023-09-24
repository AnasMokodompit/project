const SvgMicrophoneOff01 = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 9.4V5a3 3 0 0 0-5.688-1.334M12 19v3m0-3a7 7 0 0 1-7-7v-2m7 9a7 7 0 0 0 7-7v-2M8 22h8M2 2l20 20m-10-7a3 3 0 0 1-3-3V9l5.123 5.12A2.99 2.99 0 0 1 12 15Z"
    />
  </svg>
);
export default SvgMicrophoneOff01;
