import React from "react";
import { withFirebase } from "../Firebase";
import { styled } from "baseui";
import { Button } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../routes/routes';

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginTop: "20px",
});

class Login extends React.Component<any> {
  loginWithGoogle = async () => {
    const { firebase, history } = this.props;

    await firebase.loginWithGoogle();
    history.push(ROUTES.HOME);
  }

  render() {
    return (
      <Centered>
        <Card>
          <StyledBody>
            <p>Bem vindo à plataforma para gerir os items arqueológicos.</p>
            <p>
              Para continuar, por favor faça login usando a conta do Google.
            </p>
          </StyledBody>
          <StyledAction>
            <Button
              onClick={this.loginWithGoogle}
              overrides={{ BaseButton: { style: { width: "100%" } } }}
            >
              Login com o Google
            </Button>
          </StyledAction>
        </Card>
      </Centered>
    );
  }
}

export default withRouter(withFirebase(Login));
