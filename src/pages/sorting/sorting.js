import React, { useEffect, useState } from "react";

import BasePage from "../base-page/BasePage";
import TabView from "../../components/layout-components/tab-view/TabView";
import AlgoDisplay from "../../components/page-components/algo-display/AlgoDisplay";
import {
  sortingAlgoritms,
  sortingLegend,
  sortingOptions,
  sortingStats,
} from "../../algorithms/sorting/summary";
import { drawArray } from "../../utils/canvas-drawing";

import "./sorting.scss";


/**
 * Sorting page
 *
 * @returns {JSX.Element} the sorting page
 */
export default function Sorting() {
  const [array, setArray] = useState(new Array(100).fill(0));

  const setupArray = () => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * array.length);
    }
    setArray([...array]);
  };


  sortingAlgoritms.forEach((algo) => {
    algo.content = (
      <AlgoDisplay algo={algo} data={array} drawData={drawArray} />
    );
    algo.controls = sortingOptions;
    algo.legend = sortingLegend;
    algo.stats = sortingStats;
  });

  useEffect(() => {
    setupArray();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BasePage title={"Sorting Algorithms"}>
      <TabView tabs={sortingAlgoritms} />
    </BasePage>
  );
}
