import React from "react";
import { withFirebase } from "./withFirebase";
import { inject, observer } from "mobx-react";

export const withFirebaseAuthentication = (Component: any) => {
  
  @inject("sessionStore")
  @observer
  class WithFirebaseAuthentication extends React.Component<any, any> {
    authListener: any;

    constructor(props: any) {
      super(props);

      this.authListener = null;

      props.sessionStore.setAuthUser(
        JSON.parse(localStorage.getItem("authUser") || "{}")
      );
    }

    componentDidMount() {
      this.authListener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: any) => {
          if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            this.props.sessionStore.setAuthUser(authUser);
          } else {
            localStorage.removeItem("authUser");
            this.props.sessionStore.setAuthUser(null);
          }
        }
      );
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withFirebase(WithFirebaseAuthentication);
};

export default withFirebaseAuthentication;
