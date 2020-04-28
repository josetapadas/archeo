import React from "react";
import { withFirebase } from "../Firebase/context";
import { styled } from "baseui";
import { Button } from "baseui/button";
import {
    Card,
    StyledBody,
    StyledAction
  } from "baseui/card";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginTop: "20px",
});

const Login = ({ firebase } : { firebase: any }) => (
  <Centered>
    <Card>
      <StyledBody>
        <p>Bem vindo à plataforma para gerir os items arqueológicos.</p>
        <p>Para continuar, por favor faça login usando a conta do Google.</p>
      </StyledBody>
      <StyledAction>
        <Button onClick={firebase.loginWithGoogle} overrides={{BaseButton: {style: {width: '100%'}}}}>Login com o Google</Button>  
      </StyledAction>
    </Card>
  </Centered>
);

export default withFirebase(Login);
