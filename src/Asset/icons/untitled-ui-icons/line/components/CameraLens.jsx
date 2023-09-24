const SvgCameraLens = ({ title, titleId, ...props }) => (
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
      d="M21.416 15.341a9.17 9.17 0 0 1-9.539.659M2.584 8.659a9.17 9.17 0 0 1 9.56-.648m3.23 6.113A9.17 9.17 0 0 0 19.6 5.512M8.581 9.904A9.17 9.17 0 0 0 4.4 18.488m11.128-8.351a9.172 9.172 0 0 0-5.345-7.965M8.476 13.926a9.172 9.172 0 0 0 5.342 7.902m5.253-16.9c3.905 3.906 3.905 10.238 0 14.143-3.905 3.905-10.237 3.905-14.142 0-3.905-3.905-3.905-10.237 0-14.142 3.905-3.905 10.237-3.905 14.142 0Zm-4.243 4.244a4 4 0 1 1-5.656 5.656 4 4 0 0 1 5.656-5.656Z"
    />
  </svg>
);
export default SvgCameraLens;
