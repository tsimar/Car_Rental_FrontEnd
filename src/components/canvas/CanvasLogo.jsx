import React, { useRef, useEffect } from "react";

import "./canvas.css";
const CanvasLogo = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const effect = new Effect(canvas.width, canvas.height);
  let skok = 0.0001;
  let i = 50;
  let x = 0;
  let y = 0;
  let stY = 0;
  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particlesArray = [];
      this.image = document.getElementById("logo");
      this.centerX = this.width * 0.5;
      this.centerY = this.height * 0.5;
      this.x = this.centerX - this.image.width * 0.5;
      this.y = this.centerY - this.image.height * 0.5;
      this.gap = 500;
    }

    // init(context) {
    //   const pixels = context.getImageData(0, 0, this.width, this.height).data;

    //   for (let y = 0; y < this.height; y += this.gap) {
    //     for (let x = 0; x < this.width; x += this.gap) {
    //       const index = (y * this.width + x) * 4;
    //       const red = pixels[index];
    //       const green = pixels[index + 1];
    //       const blue = pixels[index + 2];
    //       const alpha = pixels[index + 3];
    //       const color = "rgb(" + red + "," + green + "," + blue + ")";
    //       if (alpha > 0) {
    //         this.particlesArray.push(new Logo(this, x, y, color));
    //       }
    //     }
    //   }
    // }
    draw1(context) {
      let sizeMy = 800;
      let stepHeight = 20;
      let stepWedth = 20;
      let clearIndexX = 0;
      let clearIndexY = 0;
      let marginY = 50;

      function animate2(p, stY, image, ct) {
        let konX = x + parseInt(image.width / 2) - clearIndexX + stepWedth;
        let konY = marginY + clearIndexY - stepHeight - y;
        ct.clearRect(konX, konY, sizeMy, sizeMy);
        ct.drawImage(
          image,
          x,
          image.height - sizeMy - y,
          sizeMy,
          sizeMy,
          x + parseInt(image.width / 2) - p,
          marginY + stY - y,
          sizeMy,
          sizeMy
        );
        console.log("konX= ", konX, "; konY= ", konY);
        console.log(
          "x= ",
          x + parseInt(image.width / 2) - p,
          "; y= ",
          marginY + stY - y
        );
      }

      if (i < parseInt(this.image.width / 2)) {
        i += stepWedth;
        clearIndexX = i;
      } else {
        i = 0;
        clearIndexX = 0;
        x += sizeMy;
      }

      if (x >= this.image.width) {
        x = 0;
        y += sizeMy;
      }

      if (stY + marginY < this.image.height - y) {
        stY += stepHeight;
        clearIndexY = stY;
      } else {
        clearIndexY = stY + stepHeight;
        stY = 0;
      }

      if (i > parseInt(this.image.width / 2)) {
        clearIndexX = i;
        i = parseInt(this.image.width / 2);
        stY = this.image.height;
      }
      if (y > this.image.height) {
        y = 0;
        i = 50;
        x = 0;

        stY = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      animate2(i, stY, this.image, context);

      // clearTimeout(czas);
      // czas = setTimeout(animate2(i, stY, this.image, context), skok);
    }
  }
  useEffect(() => {
    let i = 50;
    let x = 0;
    let y = 0;
    let stY = 0;
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    ctx = canvas.getContext("2d");
    // context.lineCap = "round";
    // context.strokeStyle = "black";
    // context.lineWidth = 5;
    // contextRef.current = context;

    function animate() {
      effect.draw1(ctx);
      effect.update(ctx);
      // requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas className="draw" ref={canvasRef}></canvas>;
};

export default CanvasLogo;
