import React, { useMemo } from "react";

import BasePage from "../base-page/BasePage";
import TabView from "../../components/layout-components/tab-view/TabView";
import AlgoDisplay from "../../components/page-components/algo-display/AlgoDisplay";
import {
  sortingAlgoritms,
  sortingLegend,
  sortingControlls,
  sortingOptions,
  sortingStats,
} from "../../algorithms/sorting/summary";
import { drawArray } from "../../utils/canvas-drawing";
import ObservableArray from "../../utils/ObservableArray";
import shuffelArray from "../../algorithms/sorting/support/shuffelArray"

import "./sorting.scss";


const array = new ObservableArray([]);
for (let i = 1; i <= 200; i++) {
  array.push([i, 0]);
}
shuffelArray(array);


/**
 * Sorting page
 *
 * @returns {JSX.Element} the sorting page
 */
export default function Sorting() {
  const onChangeSortingAlgorithm = (algo) => {
    sortingOptions.algorithm = algo.name;
    sortingControlls.reset.action(array);
  };

  useMemo(() => {
    sortingAlgoritms.forEach((algo) => {
      algo.content = (
        <AlgoDisplay algo={algo} data={array} drawData={drawArray} />
      );
      algo.controls = sortingControlls;
      algo.options = sortingOptions;
      algo.legend = sortingLegend;
      algo.stats = sortingStats;
    });
  }, []); 

  return (
    <BasePage title={"Sorting Algorithms"}>
      <TabView tabs={sortingAlgoritms} name={"SortingTabs"} onChangedTab={onChangeSortingAlgorithm}/>
    </BasePage>
  );
}
