import React, { useState, useRef, useEffect } from "react";

import AlgoDescription from "./algo-description/AlgoDescription";
import AlgoControls from "./algo-controls/AlgoControls";

import "./AlgoDisplay.scss";

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
  const canvasRef = useRef(null);

  const resizeCanvas = () => {
    console.log("resize");
    const canvas = canvasRef.current;
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  };


  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowControls(false);
  };

  const toggleControls = () => {
    setShowDescription(false);
    setShowControls(!showControls);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.parentElement.addEventListener("resize", resizeCanvas);
  }, [canvasRef]);

  return (
    <div className="algo-display">
      <div className="algo-display-canvas">
        <canvas id="canvas" ref={canvasRef}></canvas>
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
