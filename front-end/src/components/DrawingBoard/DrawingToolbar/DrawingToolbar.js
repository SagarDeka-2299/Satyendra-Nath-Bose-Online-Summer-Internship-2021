import { useState} from "react";

import { Tool } from "./Tools/Tool";
import "../../compCSS/DrawingToolbar.css";
import "../../compCSS/Tool.css";
export const DrawingToolbar = (props) => {
  let [showEraserSetting, toggleShowEraserSettings] = useState(false);
  let [showPenSetting, toggleShowPenSettings] = useState(false);
  let [activeEraser, toggleactiveEraser] = useState(false);
  let [activePen, toggleactivePen] = useState(false);

  return (
    <div className="toolBar">
      <Tool
        ToolClass="eraser"
        leftClicked={() => {
          props.toggleTool("eraser");
          toggleactiveEraser(true)
          toggleactivePen(false)
        }}
        defaultsize={props.initialToolSize.eraser}
        minsize={20}
        maxsize={80}
        rightClicked={() => {
          toggleShowEraserSettings(!showEraserSetting);
          toggleShowPenSettings(false);
        }}
        getToolSize={(erasersize) => {
          props.setSize(erasersize);
          console.log(erasersize);
        }}
        showSetting={showEraserSetting}
        isActive={activeEraser}
      >
        ERASER
      </Tool>

      <Tool
        ToolClass="pen"
        leftClicked={() => {
          props.toggleTool("pen");
          toggleactivePen(true)
          toggleactiveEraser(false)
        }}
        defaultsize={props.initialToolSize.pen}
        minsize={5}
        maxsize={25}
        rightClicked={() => {
          toggleShowEraserSettings(false);
          toggleShowPenSettings(!showPenSetting);
        }}
        getToolSize={(pensize) => {
          props.setSize(pensize);
          //console.log(pensize);
        }}
        showSetting={showPenSetting}
        isActive={activePen}
      >
        PEN
      </Tool>

    </div>
  );
};
