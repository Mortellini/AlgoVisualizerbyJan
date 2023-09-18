import React from "react";

import BasePage from "../base-page/BasePage";
import TabView from "../../components/layout-components/tab-view/TabView";
import AlgoDisplay from "../../components/page-components/algo-display/AlgoDisplay";
import {sortingAlgoritms, sortingLegend, sortingOptions, sortingStats} from "../../algorithms/sorting/summary";

import "./sorting.scss";

sortingAlgoritms.forEach((algo) => {
  algo.content = <AlgoDisplay algo={algo} />;
  algo.controls = sortingOptions;
  algo.legend = sortingLegend;
  algo.stats = sortingStats;
});


/**
 * Sorting page
 *
 * @returns {JSX.Element} the sorting page
 */
export default function Sorting() {
  return (
    <BasePage title={"Sorting Algorithms"}>
      <TabView tabs={sortingAlgoritms} />

      </BasePage>
  );
}
