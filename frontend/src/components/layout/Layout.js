import React, { createContext, useState, useEffect, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Content, Theme } from "@carbon/react";
import { GlobalTheme } from '@carbon/react';
import UserSessionDetailsContext from "../../UserSessionDetailsContext";
import { getFromOpenElisServer } from "../utils/Utils";

import ThemeSelector from '../CustomComponent/ThemeSelector';

export const ConfigurationContext = createContext(null);
export const NotificationContext = createContext(null);

let currentTheme = 'white';
(window.matchMedia('(prefers-color-scheme: dark)').matches) ? currentTheme = 'g100' : currentTheme = 'white';

export default function Layout(props) {
  const { children } = props;
  const { userSessionDetails } = useContext(UserSessionDetailsContext);
  const [resetConfig, setResetConfig] = useState(false);
  const [configurationProperties, setConfigurationProperties] = useState({});
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // const [darkMode, setDarkMode] = useState(true); // <-- State to toggle dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleChange = (theme) => {
    setSelectedTheme(theme);
  };
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };
  const addNotification = (notificationBody) => {
    setNotifications([...notifications, notificationBody]);
  };

  const removeNotification = (index) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  const fetchConfigurationProperties = (res) => {
    setConfigurationProperties(res);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', selectedTheme);
    if (userSessionDetails.authenticated) {
      getFromOpenElisServer(
        "/rest/configuration-properties",
        fetchConfigurationProperties,
      );
    } else {
      getFromOpenElisServer(
        "/rest/open-configuration-properties",
        fetchConfigurationProperties,
      );
    }
    setResetConfig(false);
  }, [userSessionDetails.authenticated, resetConfig,selectedTheme]);

  return (
    <ConfigurationContext.Provider
      value={{
        configurationProperties: configurationProperties,
        reloadConfiguration: () => {
          setResetConfig(true);
        },
      }}
    >
      <NotificationContext.Provider
        value={{
          notificationVisible,
          setNotificationVisible,
          notifications,
          addNotification,
          removeNotification,
        }}
      >
         {/* <GlobalTheme theme={selectedTheme}> */}
         <Theme theme={darkMode ? "g90" : "white"}>
        <div className="d-flex flex-column min-vh-100">
       
          <Header 
            onChangeLanguage={props.onChangeLanguage} 
            // onToggleTheme={() => setDarkMode(!darkMode)} // <-- Pass function to toggle theme
            onToggleTheme={() => setDarkMode(!darkMode)} 
  darkMode={darkMode} // Pass dark mode state
            // onThemeChange={handleChange}  // <-- Pass handleChange function
          />
           {/* </Theme> */}
           {/* <ThemeSelector handleSelectionChange={handleChange} />    */}
          {/* <Theme theme={darkMode ? "g100" : "white"}> Dark theme applied dynamically */}
          {/* <Theme theme="g90" > */}
               <Content>{children}</Content>
             
          <Footer />
        </div>
        </Theme>
      </NotificationContext.Provider>
    </ConfigurationContext.Provider>
  );
}
