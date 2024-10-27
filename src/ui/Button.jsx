function Button({ children, type = "primary" }) {
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
  return (
    <div>
      <button
        className={`${buttonColor} ${hoverColor} text-white  py-2 px-4 rounded`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
