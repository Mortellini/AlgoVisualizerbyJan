import React, { useState, useRef, useEffect } from "react";

import CookieManager from "../../../utils/cookie-manager";
import AlgoDescription from "./algo-description/AlgoDescription";
import AlgoControls from "./algo-controls/AlgoControls";

import "./AlgoDisplay.scss";

const canvasMainColors = {
  "light-mode": {
    "primary": "#ffffff",
    "secondary": "#000000",
  },
  "dark-mode": {
    "primary": "#000000",
    "secondary": "#ffffff",
  },
}

/**
 * AlgoDisplay component
 * @param {Object} props the props
 * @param {Object} props.algo the algorithm
 * @param {string} props.algo.name the algorithm name
 * @param {React.Node} props.algo.description the algorithm description
 * @param {Object} props.algo.legend the algorithm legend
 * @param {Object} props.algo.stats the algorithm stats
 * @param {React.Node} props.algo.controls the algorithm controls
 * @param {React.ReactNode} props.algo.content the algorithm content
 * @returns {JSX.Element} the algo display
 */
export default function AlgoDisplay(props) {
  const [showDescription, setShowDescription] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [array, setArray] = useState(new Array(100).fill(0));
  const canvasRef = useRef(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowControls(false);
  };
  const toggleControls = () => {
    setShowDescription(false);
    setShowControls(!showControls);
  };

  const resizeCanvas = () => {
    console.log("resize");
    const canvas = canvasRef.current;
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  };

  const setupArray = () => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * array.length);
    }
    setArray([...array]);
  };

  const drawArray = () => {
    console.log("draw");
    const mainColor = canvasMainColors[CookieManager.getCookie("theme")].secondary;
    const canvas = canvasRef.current;
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    const barWidth = (width / array.length)-1;
    const barHeight = height / array.length;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = canvasMainColors[CookieManager.getCookie("theme")].primary;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = mainColor;
    for (let i = 0; i < array.length; i++) {
      ctx.fillRect(i * (barWidth+1), height - array[i] * barHeight, barWidth, array[i] * barHeight);
    }


  };


  useEffect(() => {
    resizeCanvas();
    setupArray();
    canvasRef.current.parentElement.addEventListener("resize", resizeCanvas);
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          drawArray();
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    drawArray();
  }, [array]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="algo-display">
      <div className="algo-display-canvas">
        <canvas id="canvas" ref={canvasRef} width={0} height={0}></canvas>
        <div className="algo-display-canvas-overlay">
          <div className="algo-display-canvas-overlay-quickaccess">
            <div className="run-button"></div>
            <div className="stop-button"></div>
            <div className="reset-button"></div>
          </div>
          <div className="algo-display-canvas-overlay-legend">
            {/*props.algo.legend*/}
          </div>
          <div className="algo-display-canvas-overlay-stats">
            {/*props.algo.stats*/}
          </div>
        </div>
      </div>
      <div className="algo-display-controls">
        <AlgoControls
          algo={props.algo}
          expanded={showControls}
          toggleExpandend={toggleControls}
        />
      </div>
      <div className="algo-display-description">
        <AlgoDescription
          algo={props.algo}
          expanded={showDescription}
          toggleExpandend={toggleDescription}
        />
      </div>
    </div>
  );
}
