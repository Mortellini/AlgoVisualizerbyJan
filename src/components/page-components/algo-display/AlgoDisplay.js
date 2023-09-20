import React, { useState, useRef, useEffect } from "react";

import AlgoDescription from "./algo-description/AlgoDescription";
import AlgoControls from "./algo-controls/AlgoControls";
import { resizeCanvas } from "../../../utils/canvas-drawing";

import "./AlgoDisplay.scss";
import ButtonBox from "../../controll-components/button-box/ButtonBox";

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
    resizeCanvas(canvasRef);
    data.addEventListener("itemset", (e) => {
      drawData(canvasRef, data);
    });
    data.addEventListener("itemadded", (e) => {
      drawData(canvasRef, data);
    });
    data.addEventListener("itemremoved", (e) => {
      drawData(canvasRef, data);
    });
    drawData(canvasRef, data);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="algo-display" onClick={closePanels}>
      <div className="algo-display-canvas">
        <canvas id="canvas" ref={canvasRef} width={0} height={0}></canvas>
        <div className="algo-display-canvas-overlay">
          <div className="algo-display-canvas-overlay-quickaccess">
            <ButtonBox
              icon={"fa-solid fa-play"}
              title={"Run"}
              onClick={() => {
                algo.controls.run.action(data);
              }}
            />
            <ButtonBox
              icon={"fa-solid fa-stop"}
              title={"Stop"}
              onClick={() => {
                algo.controls.stop.action(data);
              }}
            />
            <ButtonBox
              icon={"fa-solid fa-undo"}
              title={"Reset"}
              onClick={() => {
                algo.controls.reset.action(data);
              }}
            />
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
