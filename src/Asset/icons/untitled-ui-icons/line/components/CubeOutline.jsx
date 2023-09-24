const SvgCubeOutline = ({ title, titleId, ...props }) => (
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
      d="m9.75 20.75 1.473.818c.284.157.425.236.576.267.133.027.27.027.402 0 .15-.03.292-.11.576-.267l1.473-.818m-9-2.5-1.427-.793c-.3-.167-.45-.25-.558-.368a1 1 0 0 1-.215-.364C3 16.572 3 16.4 3 16.058V14.5m0-5V7.94c0-.343 0-.514.05-.667a1 1 0 0 1 .215-.364c.109-.118.258-.201.558-.368L5.25 5.75m4.5-2.5 1.473-.819c.284-.157.425-.236.576-.267a1 1 0 0 1 .402 0c.15.03.292.11.576.267l1.473.819m4.5 2.5 1.427.792c.3.167.45.25.558.368a1 1 0 0 1 .215.364c.05.153.05.324.05.667V9.5m0 5v1.558c0 .343 0 .514-.05.667a1 1 0 0 1-.215.364c-.109.118-.258.201-.558.368l-1.427.793m-9-7.5L12 12m0 0 2.25-1.25M12 12v2.5M3 7l2.25 1.25m13.5 0L21 7m-9 12.5V22"
    />
  </svg>
);
export default SvgCubeOutline;
