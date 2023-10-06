import { useEffect, useState } from "react";
import { shortenTime, shortenNumber } from "../../../../utils/formatter";

import "./AlgoStats.scss";

export default function AlgoStats(props) {
  const { stats } = props;

  return (
    <div className="algo-display-canvas-overlay-stats">
      {stats &&
        Object.keys(stats).map((stat) => {
          return <AlgoStat key={stat} stat={stats[stat]} />;
        })}
    </div>
  );
}

function AlgoStat(props) {
  const { stat } = props;
  const { text } = stat;
  const [value, setValue] = useState(stat.value);

  useEffect(() => {
    stat.listener.addListener((value) => {
      setValue(value);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (text === "Time") {
    return (
      <div className="algo-display-canvas-overlay-stat">
        <span className="algo-display-canvas-overlay-stat-title">
          {text + ": "}
        </span>
        <span className="algo-display-canvas-overlay-stat-value">
          {shortenTime(value)}
        </span>
      </div>
    );
  }
  return (
    <div className="algo-display-canvas-overlay-stat">
      <span className="algo-display-canvas-overlay-stat-title">
        {text + ": "}
      </span>
      <span className="algo-display-canvas-overlay-stat-value">
        {shortenNumber(value)}
      </span>
    </div>
  );
}
