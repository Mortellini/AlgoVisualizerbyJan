import React, { useState, useEffect } from "react";

import "./Drawer.scss";

/**
 * Side drawer component
 *
 * @param {Object} props the props
 * @param {boolean} props.opened whether the drawer is opened or not
 * @param {boolean} props.transition whether the drawer should transition or not
 * @param {string} props.direction the direction of the drawer
 * @param {React.ReactNode} props.children the children
 * @returns {React.ReactNode} the drawer
 */
export default function Drawer(props) {
  const { opened, direction, transition } = props;
  const drawerClass = direction ? `drawer-${direction}` : "";
  const animationDuration = 300;
  const [animationClass, setAnimationClass] = useState(drawerClass);

  useEffect(() => {
    if (!transition) {
      setAnimationClass(drawerClass + (opened ? "" : "-closed"));
       return
    }

    if (opened) {
      setAnimationClass(drawerClass + "-expand");
    } else {
      setAnimationClass(drawerClass + "-shrink");
    }
    setTimeout(() => {
      setAnimationClass(drawerClass + (opened ? "" : "-closed"));
    }, animationDuration);

  }, [opened]); // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Rewrite to be more generic (top/bottom/left/right)
  // TODO: Make animation only happen when the drawer is opened/closed not on every render
  return (
    <div className={"drawer " + animationClass}>
      <div className={"drawer-content"}>
        {React.Children.map(props.children, (child) => {
          return child;
        })}
      </div>
    </div>
  );
}
