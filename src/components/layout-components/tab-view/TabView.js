import React, { useState } from "react";

import TabItem from "./tab-item/TabItem";
import CookieManager from "../../../utils/cookie-manager";

import "./TabView.scss";

/**
 * TabView component
 * @param {Object} props the props
 * @param {Object[]} props.tabs the tabs
 * @param {string} props.tabs[].name the tab name
 * @param {React.ReactNode} props.tabs[].content the tab content
 * @returns {JSX.Element} the tab view
 */
export default function TabView(props) {
  const { tabs } = props;
  const [activeTab, setActiveTab] = useState(
    parseInt(CookieManager.getCookie("activeSortingTab")) || 0
  );

  const handleTabClick = (index) => {
    setActiveTab(index);
    CookieManager.setCookie("activeSortingTab", index);
  };

  return (
    <div className="tab-view">
      <div className="tab-view-header">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {tab.name}
          </TabItem>
        ))}
      </div>
      <div className="tab-view-content">{tabs[activeTab].content}</div>
    </div>
  );
}
