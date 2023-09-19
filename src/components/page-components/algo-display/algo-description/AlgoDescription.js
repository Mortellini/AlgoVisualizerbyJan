import React, { useEffect, useState } from "react";

import InlineIcon from "../../../base-components/inline-icon/InlineIcon";

import "./AlgoDescription.scss";
import Drawer from "../../../layout-components/drawer/Drawer";

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
  const { algo, expanded, toggleExpandend } = props;
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);
  }, [expanded]);


  return (
    <Drawer
      opened={expanded}
      transition={transition}
      direction={"vertical"}
      mode={"overlay"}
    >
      <div className="algo-description-icon" onClick={toggleExpandend}>
        <InlineIcon
          icon="fa-solid fa-circle-info"
          className="description-icon"
        />
      </div>
      {expanded && (
        <div className="algo-description">{algo.description}</div>
      )}
    </Drawer>
  );
}
