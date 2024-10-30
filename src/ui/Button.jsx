import { Link } from "react-router-dom";

function Button({
  children,
  tag = "button",
  type = "primary",
  disabled = false,
  to = "#",
  onClick, 
  buttonType="submit"
}) {
  let buttonColor;
  let hoverColor;
  switch (type) {
    case "success":
      buttonColor = "bg-green-500";
      hoverColor = "hover:bg-green-600";
      break;
    case "danger":
      buttonColor = "bg-red-500";
      hoverColor = "hover:bg-red-600";
      break;
    case "primary":
      buttonColor = "bg-blue-500";
      hoverColor = "hover:bg-blue-600";
      break;
    case "warning":
      buttonColor = "bg-yellow-500";
      hoverColor = "hover:bg-yellow-600";
      break;
    default:
      buttonColor = "bg-blue-500";
      hoverColor = "hover:bg-blue-600";
  }
  if (tag === "button")
    return (
      <div>
        <button
          type={buttonType}
          onClick={onClick}
          disabled={disabled}
          className={`${buttonColor} ${hoverColor} rounded px-4 py-2 text-white disabled:opacity-50`}
        >
          {children}
        </button>
      </div>
    );

  if (tag === "a")
    return (
      <div>
        <Link
          to={to}
          disabled={disabled}
          className={`${buttonColor} ${hoverColor} rounded px-4 py-2 text-white disabled:opacity-50`}
        >
          {children}
        </Link>
      </div>
    );
}

export default Button;
