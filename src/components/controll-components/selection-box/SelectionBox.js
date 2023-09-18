import React from "react";

import InlineIcon from "../../base-components/inline-icon/InlineIcon";

import "./SelectionBox.scss";

/**
 * Selection box component
 * @param {Object} props the props
 * @param {string} props.icon the icon
 * @param {string} props.title the title
 * @param {Object[]} props.options the options
 * @param {string} props.options[].name the option name
 * @param {string} props.options[].value the option value
 * @param {string} props.defaultValue the default value
 * @param {Function} props.onChange the change handler
 * @returns {JSX.Element} the selection box
 */
export default function SelectionBox(props) {
  return (
    <div className="selection-box">
      <div className="selection-box-title">
        <InlineIcon icon={props.icon} className={"selection-box-title-icon"} />
        {props.title}
      </div>
      <div className="selection-box-selection">
        <select
          className={"select"}
          value={props.defaultValue}
          onChange={props.onChange}
        >
          {props.options.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
