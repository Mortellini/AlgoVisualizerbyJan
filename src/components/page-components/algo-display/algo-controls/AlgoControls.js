import React from "react";

import InlineIcon from "../../../base-components/inline-icon/InlineIcon";

import "./AlgoControls.scss";

/**
 * Algo controls component
 * @param {Object} props the props
 * @param {Object} props.algo the algo
 * @param {Object} props.algo.controls the algo controls
 * @param {boolean} props.expanded the expanded
 * @param {Function} props.toggleExpandend the toggle expanded
 * @returns {JSX.Element} the algo controls
 */
export default function AlgoControlls(props) {
  return (
    <React.Fragment>
      <div className="algo-controls-icon" onClick={props.toggleExpandend}>
        <InlineIcon icon="fa-solid fa-gear" className="controls-icon" />
      </div>
      {props.expanded && (
        <div className="algo-controls">{/*props.algo.controls*/}</div>
      )}
    </React.Fragment>
  );
}
