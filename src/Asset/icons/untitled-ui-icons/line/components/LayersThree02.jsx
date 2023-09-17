const SvgLayersThree02 = ({ title, titleId, ...props }) => (
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
      d="M7 9.5 2 12l9.642 4.821c.131.066.197.098.266.111.06.012.123.012.184 0 .069-.012.135-.045.266-.11L22 12l-5-2.5m-10 5L2 17l9.642 4.821c.131.066.197.098.266.111.06.012.123.012.184 0 .069-.012.135-.045.266-.11L22 17l-5-2.5M2 7l9.642-4.821c.131-.066.197-.099.266-.111a.5.5 0 0 1 .184 0c.069.012.135.045.266.11L22 7l-9.642 4.821a1.087 1.087 0 0 1-.266.111.501.501 0 0 1-.184 0c-.069-.013-.135-.045-.266-.11L2 7Z"
    />
  </svg>
);
export default SvgLayersThree02;
