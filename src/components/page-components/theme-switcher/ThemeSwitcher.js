import React, { useState } from "react";

import CookieManager from "../../../utils/cookie-manager";

import "./ThemeSwitcher.scss";
import SelectionBox from "../../controll-components/selection-box/SelectionBox";

const themes = [
  {
    name: "Dark Mode",
    value: "dark-mode",
  },
  {
    name: "Light Mode",
    value: "light-mode",
  },
];

/**
 * Theme switcher component
 * @returns {JSX.Element} the theme switcher
 */
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    CookieManager.getCookie("theme") || "dark-mode"
  );

  const changeTheme = (e) => {
    const theme = e.target.value;
    setTheme(theme);
    CookieManager.setCookie("theme", theme);
    document.documentElement.className = theme;
  };

  return (
    <SelectionBox
      title={"Theme"}
      icon={"fa-solid fa-palette"}
      options={themes}
      defaultValue={theme}
      onChange={changeTheme}
    />
  );
}
