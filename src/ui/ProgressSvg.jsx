function ProgressSvg({ progress, className }) {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="-6.25 -6.25 62.5 62.5"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="15"
        cx="25"
        cy="25"
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth="1"
        strokeDasharray="94.2px"
        strokeDashoffset="0"
      ></circle>
      <circle
        r="15"
        cx="25"
        cy="25"
        stroke="#673ab7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDashoffset={Math.max(94.2 - progress, 0)+'px'}
        fill="transparent"
        strokeDasharray="94.2px"
      ></circle>
    </svg>
  );
}

export default ProgressSvg;
