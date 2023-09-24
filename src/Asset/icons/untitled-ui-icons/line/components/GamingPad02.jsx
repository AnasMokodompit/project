const SvgGamingPad02 = ({ title, titleId, ...props }) => (
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
      d="M6 12h4m-2-2v4m7-1h.01M18 11h.01M5.2 18h13.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 16.48 22 15.92 22 14.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 6 19.92 6 18.8 6H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 7.52 2 8.08 2 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3.52 18 4.08 18 5.2 18Z"
    />
  </svg>
);
export default SvgGamingPad02;
