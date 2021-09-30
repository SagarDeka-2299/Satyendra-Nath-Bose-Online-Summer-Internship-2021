import React, { useRef, useState, useEffect } from "react";
import "../compCSS/Canvas.css";

export const Canvas = (props) => {
  const canvasRef = useRef(null);
  const context = useRef(null);
  const [drawing, toggledrawing] = useState(false);
  const [size, setsize] = useState(props.defaultsize);
  const [color, setcolor] = useState({ r: 255, g: 255, b: 255 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    context.current = ctx;
    context.current.lineCap = "round";
  }, []);

  useEffect(()=>{
    context.current.fillStyle="rgb(255,255,255)";
    context.current.fillRect(0, 0, context.current.canvas.width, context.current.canvas.height);
    if(props.drawImage!==null){
      let img=new Image()
      img.src=props.drawImage;
      img.onload=()=>{
        //console.log("inside canvas: ",img)
  
        //draw the image
        context.current.drawImage(img,0,0)

      }
      

    }
  },[props.drawImage])




  useEffect(() => {
    setsize(props.drawSize());
  }, [props.drawSize]);

  useEffect(() => {
    if(props.getImgData()){
      props.canvasData(canvasRef.current.toDataURL())
    }
  }, [props.getImgData]);

  useEffect(() => {
    setcolor(props.drawColor());
  }, [props.drawColor]);

  function startDrawing(e) {
    //console.log("drawing started")
    toggledrawing(true);
    context.current.beginPath();
    //console.log(e)//
    context.current.moveTo(e.clientX, e.clientY);
    draw(e)
  }

  function stopDrawing() {
    //console.log("drawing stopped")
    toggledrawing(false);
    context.current.closePath();
  }

  function draw(e) {
    if (!drawing) return;
    if (drawing && e != undefined) {
      props.imgGivenFrom("c")
      //console.log("drawing ")
      context.current.lineWidth = size;
      context.current.strokeStyle = `rgba(${color.r},${color.g},${color.b})`;
      context.current.lineTo(e.clientX, e.clientY);
      context.current.stroke();
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => startDrawing(e)}
        onMouseUp={() => stopDrawing()}
        onMouseMove={(e) => {
          draw(e)
          
        }}
        onTouchStart={(e) => startDrawing(e)}
        onTouchEnd={() => stopDrawing()}
        onTouchMove={(e) => draw(e)}

      ></canvas>
    </>
  );
};
