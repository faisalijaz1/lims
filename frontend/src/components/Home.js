// import React from "react";
import { injectIntl } from "react-intl";
import HomeDashBoard from "./home/Dashboard.tsx";
import PageBreadCrumb from "./common/PageBreadCrumb.js";
// import ThemeSelector from './CustomComponent/ThemeSelector';
import { useEffect, useState } from 'react';
// import { GlobalTheme } from '@carbon/react';

let breadcrumbs = [{ label: "home.label", link: "/" }];

// let currentTheme = 'white';
// (window.matchMedia('(prefers-color-scheme: dark)').matches) ? currentTheme = 'g100' : currentTheme = 'white';


function Home() {

  // const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  useEffect(() => {
    // document.documentElement.setAttribute('data-carbon-theme', selectedTheme);
  }, []);

  
  return (
    <>
  {/* <GlobalTheme theme={selectedTheme}> */}
  {/* <ThemeSelector handleSelectionChange={handleChange} /> */}
      <PageBreadCrumb breadcrumbs={breadcrumbs} />

      <div>
        <HomeDashBoard />
      </div>
      {/* </GlobalTheme> */}
    </>
  );
}

export default injectIntl(Home);
