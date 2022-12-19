import React from "react";

const Button = (props) => {
    return (
        <button
            className={`keypad ${props.doubleWidth ? "double-width" : ""}`}
            onClick={() => props.handleClick(props.children)}
        >
            {props.children}
        </button>
    );
};

export default Button;
