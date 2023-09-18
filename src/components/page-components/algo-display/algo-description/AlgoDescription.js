import React from "react";

import InlineIcon from "../../../base-components/inline-icon/InlineIcon";

import "./AlgoDescription.scss";

/**
 * Algo description component
 * @param {Object} props the props
 * @param {Object} props.algo the algo
 * @param {string} props.algo.description the algo description
 * @param {boolean} props.expanded the expanded
 * @param {Function} props.toggleExpandend the toggle expanded
 * @returns {JSX.Element} the algo description
 */
export default function AlgoDisplay(props) {
  return (
    <React.Fragment>
      <div className="algo-description-icon" onClick={props.toggleExpandend}>
        <InlineIcon
          icon="fa-solid fa-circle-info"
          className="description-icon"
        />
      </div>
      {props.expanded && (
        <div className="algo-description">{props.algo.description}</div>
      )}
    </React.Fragment>
  );
}
