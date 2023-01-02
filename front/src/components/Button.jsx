import React from "react";

const Button = (props) => {
    return (
        <>
            <input type={props.type} value={props.value}></input>
        </>
    );
}

export default Button;