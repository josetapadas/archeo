import React, { FunctionComponent } from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import * as ROUTES from "../../routes/routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Logout from "../Logout";
import { withFirebaseAuthentication } from "../Firebase";
import { Unstable_AppNavBar as AppNavBar } from "baseui/app-nav-bar";
import { LOGGED_NAV, GUEST_NAV } from "../../routes/navigation";
import CoinView from "../CoinView";
import Archive from "../Archive";
import CoinAdd from "../CoinAdd";

const engine = new Styletron();

type AppProps = {
  sessionStore: any,
}

const App: FunctionComponent<AppProps> = ({ sessionStore }) => (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <Router>
        <AppNavBar
          appDisplayName="Archeos"
          mainNav={sessionStore.authUser.email ? LOGGED_NAV : GUEST_NAV}
          onNavItemSelect={() => {}}
          userNav={[]}
          username="Archeos"
          usernameSubtitle="1.0"
          userImgUrl=""
        />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.LOGOUT} component={Logout} />
        <Route path={ROUTES.ARCHIVE} component={Archive} />
        <Route path={ROUTES.ADD} component={CoinAdd} />
        <Route path={`${ROUTES.COINS}/:id`} component={CoinView} />
      </Router>
    </BaseProvider>
  </StyletronProvider>
);

export default withFirebaseAuthentication(App);
