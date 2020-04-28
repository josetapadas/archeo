import React from "react";
import { withFirebase } from "../Firebase/context";
import { styled } from "baseui";
import { Card, StyledBody } from "baseui/card";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginTop: "20px",
});

type LogoutProps = {
  firebase: any;
};

class Logout extends React.Component<LogoutProps> {
  componentDidMount() {
    this.props.firebase.logout();
  }
  render() {
    return (
      <Centered>
        <Card>
          <StyledBody>
            <p>Sessão terminada.</p>
          </StyledBody>
        </Card>
      </Centered>
    );
  }
}

export default withFirebase(Logout);
