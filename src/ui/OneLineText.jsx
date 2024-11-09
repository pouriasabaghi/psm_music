import React from "react";

function OneLineText({ children, className }) {
  return React.cloneElement(children, {
    className: `overflow-hidden overflow-ellipsis text-nowrap ${className} ${children.props.className || ""}`
  });
}

export default OneLineText;