const SvgLockKeyholeSquare = ({ title, titleId, ...props }) => (
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
      d="M16.2 21c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 18.72 21 17.88 21 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21h8.4Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.732 13.195c-.071-.212-.106-.318-.104-.404a.422.422 0 0 1 .056-.22c.04-.077.146-.176.36-.374a3 3 0 1 0-4.086 0c.212.198.319.297.358.374.042.08.054.129.056.22.002.086-.033.192-.104.404l-.917 2.752c-.119.355-.178.533-.142.675a.5.5 0 0 0 .216.3c.123.078.31.078.685.078h3.78c.375 0 .562 0 .685-.078a.5.5 0 0 0 .216-.3c.036-.142-.024-.32-.142-.675l-.917-2.752Z"
    />
  </svg>
);
export default SvgLockKeyholeSquare;
