import React from "react";

const Button = (props) => {
  const handleClick = (e) => {
    if (props.operation) {
      props.operate(e.target.value);
    } else {
      props.updateValue(e.target.value);
    }
  };
  return (
    <button id={props.id} value={props.value} onClick={handleClick}>
      {props.value}
    </button>
  );
};

export default Button;
