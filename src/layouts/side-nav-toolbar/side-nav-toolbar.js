import React from "react";
import { useNavigate } from "react-router";

import SideNavigationMenu from "../../components/page-components/side-navigation-menu/SideNavigationMenu";
import Footer from "../../components/page-components/footer/Footer";

import "./side-nav-toolbar.scss";

/**
 * Side nav toolbar
 * @param {Object} props the props
 * @param {React.ReactNode} props.children the children
 * @returns {JSX.Element} the side nav toolbar
 */
export default function SideNavToolbar({ children }) {
  const navigate = useNavigate();

  const onNavigate = (data) => {
    navigate(data.value);
  };

  return (
    <div className={"side-nav-inner-toolbar"}>
      <SideNavigationMenu selectedItemChanged={onNavigate} />
      <div className={"content-block"}>
        <div className={"content"} id="main-content">
          {React.Children.map(children, (item) => {
            return item.type !== Footer && item;
          })}
        </div>
        {React.Children.map(children, (item) => {
          return item.type === Footer && item;
        })}
      </div>
    </div>
  );
}
