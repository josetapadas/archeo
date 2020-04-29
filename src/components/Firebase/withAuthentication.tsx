import React from "react";
import { withFirebase } from "./withFirebase";

const FirebaseAuthenticationContext = React.createContext<any | null>(null);

export const withFirebaseAuthentication = (Component: any) => {
  class WithFirebaseAuthentication extends React.Component<any, any> {
    authListener: any;

    constructor(props: any) {
      super(props);
      this.authListener = null;
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.authListener = this.props.firebase.auth.onAuthStateChanged(
        (authUser: any) => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
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

  return withFirebase(WithFirebaseAuthentication);
};

export default withFirebaseAuthentication;
