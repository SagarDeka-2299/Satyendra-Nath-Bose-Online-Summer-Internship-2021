import React, { useState } from "react";
import "../compCSS/Slider.css";
export const Slider = (props) => {
  let [defaultVal, changeval] = useState(props.defaultval);
  return (
    <>
      <input
        type="range"
        min={props.minval}
        max={props.maxval}
        value={defaultVal}
        onChange={(event) => {
          changeval(event.target.value);
          props.getSliderValue(event.target.value);
        }}
        className="slider"
      ></input>
    </>
  );
};
