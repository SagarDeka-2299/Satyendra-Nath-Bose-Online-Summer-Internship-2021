import React, { useState,useEffect } from "react";
import { Button } from "../../../basicComp/Button";
import { Slider } from "../../../basicComp/Slider";

export const Tool = (prop) => {
  let [btnClass,toggleBtnClass]=useState("btn")

  useEffect(() => {
    if(prop.isActive===true){
      toggleBtnClass("btn btn_active")
    }else{
      toggleBtnClass("btn")
    }
  }, [prop.isActive])
  return (
    <div className={prop.ToolClass}>
      <Button
        btnLC={() => prop.leftClicked()}
        btnRC={() => prop.rightClicked()}
        classN={btnClass}
      >
        {prop.children}
      </Button>
      {prop.showSetting ? (
        <Slider
          getSliderValue={(sliderVal) => prop.getToolSize(sliderVal)}
          minval={prop.minsize}
          maxval={prop.maxsize}
          defaultval={prop.defaultsize}
        />
      ) : null}
    </div>
  );
};
