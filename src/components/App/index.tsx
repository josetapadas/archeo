import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import * as ROUTES from "../../routes/routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import Logout from "../Logout";
import { withFirebase } from "../Firebase/context";

const engine = new Styletron();

type AppProps = {
  firebase: any;
};

class App extends React.Component<AppProps> {
  authListener: any;

  constructor(props: any) {
      super(props);
      this.authListener = null;
  }

  componentDidMount() {
    this.authListener = this.props.firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser ? console.log({ authUser }) : console.log({ authUser: null });
    });
  }

  componentWillUnmount() {
      this.authListener();
  }

  render() {
    return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.LOGOUT} component={Logout} />
          </Router>
        </BaseProvider>
      </StyletronProvider>
    );
  }
}

export default withFirebase(App);
