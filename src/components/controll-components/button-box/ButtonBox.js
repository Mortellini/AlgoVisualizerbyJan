import React from "react";

import InlineIcon from "../../base-components/inline-icon/InlineIcon";

import "./ButtonBox.scss";

/**
 * button box component
 * @param {Object} props the props
 * @param {string} props.icon the icon
 * @param {string} props.title the title
 * @param {Function} props.onClick the click handler
 * @returns {JSX.Element} the button box
 */
export default function ButtonBox(props) {
  return (
    <div className="button-box">
      <div className="button-box-button" onClick={props.onClick}>
        <div className="button-box-title">
          <InlineIcon icon={props.icon} className={"button-box-title-icon"} />
          {props.title}
        </div>
      </div>
    </div>
  );
}
