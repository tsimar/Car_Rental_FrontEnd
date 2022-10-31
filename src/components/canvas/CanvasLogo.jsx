import React, { useRef } from "react";
import { useEffect } from "react";
import "./canvas.css";
const CanvasLogo = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  return <canvas className="draw" ref={canvasRef}></canvas>;
};

export default CanvasLogo;
