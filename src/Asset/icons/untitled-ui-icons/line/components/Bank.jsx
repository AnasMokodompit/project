const SvgBank = ({ title, titleId, ...props }) => (
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
      d="M5 9v8m4.5-8v8m5-8v8M19 9v8M3 18.6v.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h14.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 20.24 21 19.96 21 19.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 0 0-.437-.437C20.24 17 19.96 17 19.4 17H4.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 17.76 3 18.04 3 18.6Zm8.653-15.523-7.4 1.645c-.447.099-.67.149-.838.269a1 1 0 0 0-.334.417C3 5.597 3 5.826 3 6.283V7.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 9 4.04 9 4.6 9h14.8c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437C21 8.24 21 7.96 21 7.4V6.283c0-.457 0-.686-.081-.875a1 1 0 0 0-.335-.417c-.166-.12-.39-.17-.837-.27l-7.4-1.644a2.083 2.083 0 0 0-.26-.049 1 1 0 0 0-.174 0c-.066.006-.13.02-.26.05Z"
    />
  </svg>
);
export default SvgBank;
