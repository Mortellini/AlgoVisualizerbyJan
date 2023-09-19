import React, { useState, useRef, useEffect } from "react";

import AlgoDescription from "./algo-description/AlgoDescription";
import AlgoControls from "./algo-controls/AlgoControls";
import { resizeCanvas } from "../../../utils/canvas-drawing";

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
  const { algo, data, drawData } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const canvasRef = useRef(null);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
    setShowControls(false);
  };
  const toggleControls = () => {
    setShowDescription(false);
    setShowControls(!showControls);
  };

  useEffect(() => {
    resizeCanvas(canvasRef);
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          drawData(canvasRef, data);
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    props.drawData(canvasRef, data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps


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
            {/*algo.legend*/}
          </div>
          <div className="algo-display-canvas-overlay-stats">
            {/*algo.stats*/}
          </div>
        </div>
      </div>
      <div className="algo-display-controls">
        <AlgoControls
          algo={algo}
          expanded={showControls}
          toggleExpandend={toggleControls}
        />
      </div>
      <div className="algo-display-description">
        <AlgoDescription
          algo={algo}
          expanded={showDescription}
          toggleExpandend={toggleDescription}
        />
      </div>
    </div>
  );
}
