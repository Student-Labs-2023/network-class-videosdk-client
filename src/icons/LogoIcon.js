import * as React from "react";

function LogoIcon(props) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#175EF1" />
      <circle cx="20" cy="19.9998" r="10" fill="black" />
      <path
        d="M24 27.4998C24 26.119 25.1193 24.9998 26.5 24.9998V24.9998C27.8807 24.9998 29 26.119 29 27.4998V27.4998C29 28.8805 27.8807 29.9998 26.5 29.9998V29.9998C25.1193 29.9998 24 28.8805 24 27.4998V27.4998Z"
        fill="white"
      />
      <rect x="10" y="10.9998" width="5" height="5" rx="2.5" fill="white" />
    </svg>
  );
}

export default LogoIcon;
