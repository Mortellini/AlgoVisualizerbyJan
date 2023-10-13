import React, { useState, useRef, useEffect } from "react";

import AlgoDescription from "./algo-description/AlgoDescription";
import AlgoControls from "./algo-controls/AlgoControls";
import { resizeCanvas } from "../../../utils/canvas-drawing";

import "./AlgoDisplay.scss";
import AlgoQuickaccess from "./algo-quickaccess/AlgoQuickaccess";
import AlgoStats from "./algo-stats/AlgoStats";

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

  const toggleDescription = (e) => {
    e.stopPropagation();
    setShowDescription(!showDescription);
    setShowControls(false);
  };
  const toggleControls = (e) => {
    e.stopPropagation();
    setShowDescription(false);
    setShowControls(!showControls);
  };
  const closePanels = () => {
    setShowDescription(false);
    setShowControls(false);
  };


  useEffect(() => {
    let prevEvent = { index: -1};
    const eventHandler = (e) => {
      if (e.index === prevEvent.index) return;
      prevEvent = e;
      drawData(canvasRef, data);
    }
    resizeCanvas(canvasRef);
    data.limitEventListener("itemset", 1);
    data.limitEventListener("itemadded", 1);
    data.limitEventListener("itemremoved", 1);
    data.addEventListener("itemset", eventHandler);
    data.addEventListener("itemadded", eventHandler);
    data.addEventListener("itemremoved", eventHandler);
    drawData(canvasRef, data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div className="algo-display" onClick={closePanels}>
      <div className="algo-display-canvas">
        <canvas id="canvas" ref={canvasRef} width={0} height={0}></canvas>
        <div className="algo-display-canvas-overlay">
          <AlgoQuickaccess 
            algo={algo}
            data={data}
          />
          <div className="algo-display-canvas-overlay-legend">
            {/*algo.legend*/}
          </div>
          <AlgoStats stats={algo.stats} />
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
