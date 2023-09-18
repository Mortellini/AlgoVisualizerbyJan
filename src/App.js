import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useScreenSizeClass } from "./utils/media-query";

import Footer from "./components/page-components/footer/Footer";
import SideNavToolbar from "./layouts/side-nav-toolbar/side-nav-toolbar";
import Loading from "./components/page-components/loading/loading";
import { NavigationProvider } from "./contexts/navigation";
import CookieManager from "./utils/cookie-manager";
import appInfo from "./app-info";
import routes from "./app-routes";

import "./base-style.scss";
import "./themes/dark-mode.css";
import "./themes/light-mode.css";

document.documentElement.className = CookieManager.getCookie("theme")
  ? CookieManager.getCookie("theme")
  : "dark-mode";

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <NavigationProvider>
        <div className={`app ${screenSizeClass}`}>
          <SideNavToolbar title={appInfo.title}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <React.Suspense fallback={<Loading />}>
                      {element}
                    </React.Suspense>
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <Footer>Made by Jan Klett</Footer>
          </SideNavToolbar>
        </div>
      </NavigationProvider>
    </Router>
  );
}
