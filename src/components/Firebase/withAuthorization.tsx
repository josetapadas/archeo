import React from "react";
import { inject, observer } from "mobx-react";
import { withFirebase } from "./withFirebase";
import * as ROUTES from "../../routes/routes";
import { withRouter } from "react-router-dom";

const withAuthorization = (Component: any) => {
  @inject("sessionStore")
  @observer
  class WithFirebaseAuthorization extends React.Component<any, any> {
    authListener: any;

    componentDidMount() {
      const { history, sessionStore } = this.props;
      if (!sessionStore.authUser.email) history.push(ROUTES.LOGIN);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withFirebase(withRouter(WithFirebaseAuthorization));
};

export default withAuthorization;
