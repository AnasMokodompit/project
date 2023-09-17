const SvgLock04 = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.101 10H7V8a5 5 0 0 1 10 0v2h-.101M12 14v2m7-1a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </svg>
);
export default SvgLock04;
