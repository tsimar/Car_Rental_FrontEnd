import React, { useRef } from "react";

const CanvasLogo = (props) => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  return <canvas ref={canvasRef} {...props} />;
};

export default CanvasLogo;
