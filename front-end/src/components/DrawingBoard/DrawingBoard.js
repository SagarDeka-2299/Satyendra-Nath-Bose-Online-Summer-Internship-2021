import { useState, useEffect } from "react";
import { DrawingToolbar } from "./DrawingToolbar/DrawingToolbar";
import { Canvas } from "../basicComp/Canvas";

export const DrawingBoard = (prop) => {
  let [activeTool, toggleActiveTool] = useState("pen");
  let [penSize, setPenSize] = useState(5);
  let [eraserSize, setEraserSize] = useState(20);


  let giveDrawSize = () => {
    if (activeTool === "pen") {
      return penSize;
    } else if (activeTool === "eraser") {
      return eraserSize;
    }
  };

  let giveDrawColor = () => {
    if (activeTool === "pen") {
      return { r: 0, g: 0, b: 0 };
    } else if (activeTool === "eraser") {
      return { r: 255, g: 255, b: 255 };
    }
  };

  // useEffect(() => {
  //   console.log(
  //     activeTool,
  //     "\npensize: ",
  //     penSize,
  //     "\nerasersize: ",
  //     eraserSize
  //   );
  // });
  // useEffect(()=>{
  //   console.log("in drawing board:",prop.image2draw)
  // },[prop.image2draw])

  return (
    <>
      <DrawingToolbar
        
        toggleTool={(toolname) => {
          toolname === "pen"
            ? toggleActiveTool("pen")
            : toggleActiveTool("eraser");
        }}
        setSize={(size) => {
          activeTool === "pen" ? setPenSize(size) : setEraserSize(size);
        }}
        initialToolSize={{ pen: penSize, eraser: eraserSize }}
      />
      <Canvas imgGivenFrom={(v)=>prop.imgTakenFrom(v)} drawImage={prop.image2draw} drawSize={giveDrawSize} drawColor={giveDrawColor} getImgData={()=>prop.shouldPullImgData()} canvasData={(data)=>prop.getCanvasDataUrl(data)}/>
    </>
  );
};
