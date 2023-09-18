import React from "react";

import getIcon from "../../../icons/icons";

import "./InlineIcon.scss";

/**
 * Inline icon component
 *
 * @param {Object} props the props
 * @param {string} props.icon the icon
 * @param {string} props.className the class name
 * @returns {React.ReactNode} the icon
 */
export default function InlineIcon(props) {
  if (props.icon == null) {
    return null;
  } else if (props.icon.charAt(0) === ".") {
    return (
      <div className={"icon-wrapper " + props.className}>
        {getIcon(props.icon.substring(1))}
      </div>
    );
  } else if (props.icon.split(" ")[0] === "fa-solid") {
    return (
      <div className={"icon-wrapper " + props.className}>
        <i className={"icon " + props.icon}></i>
      </div>
    );
  }
}
