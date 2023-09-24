const SvgKey02 = ({ title, titleId, ...props }) => (
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
      d="M15 9h.01M15 15a6 6 0 1 0-5.946-5.193c.058.434.087.651.068.789a.853.853 0 0 1-.117.346c-.068.121-.187.24-.426.479l-5.11 5.11c-.173.173-.26.26-.322.36a1 1 0 0 0-.12.29C3 17.296 3 17.418 3 17.663V19.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h1.737c.245 0 .367 0 .482-.028a.998.998 0 0 0 .29-.12c.1-.061.187-.148.36-.32l5.11-5.111c.239-.239.358-.358.48-.426a.852.852 0 0 1 .345-.117c.138-.02.355.01.789.068.264.036.533.054.807.054Z"
    />
  </svg>
);
export default SvgKey02;
