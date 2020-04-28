import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Unstable_AppNavBar as AppNavBar } from "baseui/app-nav-bar";
import { SAMPLE_NAV } from "../../routes/navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";

const engine = new Styletron();

const App = () => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Router>
        <AppNavBar
          appDisplayName={"Archeo"}
          onNavItemSelect={({ item }) => {
            console.log(item);
          }}
          mainNav={SAMPLE_NAV}
        />
      </Router>
    </BaseProvider>
  </StyletronProvider>
);

export default App;
