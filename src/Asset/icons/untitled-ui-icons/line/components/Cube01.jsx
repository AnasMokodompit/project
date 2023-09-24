const SvgCube01 = ({ title, titleId, ...props }) => (
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
      d="M20.5 7.277 12 12m0 0L3.5 7.277M12 12v9.5m9-5.442V7.941c0-.343 0-.514-.05-.667a1 1 0 0 0-.215-.364c-.109-.118-.258-.201-.558-.368l-7.4-4.11c-.284-.158-.425-.237-.575-.268a1 1 0 0 0-.403 0c-.15.03-.292.11-.576.267l-7.4 4.111c-.3.167-.45.25-.558.368a1 1 0 0 0-.215.364C3 7.427 3 7.598 3 7.941v8.117c0 .343 0 .514.05.667a1 1 0 0 0 .215.364c.109.118.258.201.558.368l7.4 4.11c.284.159.425.237.576.268.133.027.27.027.402 0 .15-.03.292-.11.576-.267l7.4-4.111c.3-.167.45-.25.558-.368a1 1 0 0 0 .215-.364c.05-.153.05-.324.05-.667Z"
    />
  </svg>
);
export default SvgCube01;
