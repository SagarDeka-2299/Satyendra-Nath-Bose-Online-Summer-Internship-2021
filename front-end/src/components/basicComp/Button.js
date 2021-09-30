import React from "react";
import "../compCSS/Button.css";
export const Button = (props) => {
  return (
    <>
      <button
        className={props.classN}
        onContextMenu={(e) => {
          e.preventDefault();
          if (props.btnRC != null) {
            props.btnRC();
          }
        }}
        onClick={(e) => {
          if (e.type === "click") {
            props.btnLC();
          }
        }}
      >
        {props.children}
      </button>
    </>
  );
};
