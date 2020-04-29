import React from "react";
import { withFirebase } from "./withFirebase";
import { inject } from "mobx-react";

const FirebaseAuthenticationContext = React.createContext<any | null>(null);

export const withFirebaseAuthentication = (Component: any) => {
  class WithFirebaseAuthentication extends React.Component<any, any> {
    authListener: any;

    constructor(props: any) {
      super(props);

      this.authListener = null;

      props.sessionStore.setAuthUser(
        JSON.parse(localStorage.getItem("authUser") || "{}")
      );

      this.state = {
        authUser: null,
      };
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
      return (
        <FirebaseAuthenticationContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </FirebaseAuthenticationContext.Provider>
      );
    }
  }

  return inject("sessionStore")(withFirebase(WithFirebaseAuthentication));
};

export default withFirebaseAuthentication;
