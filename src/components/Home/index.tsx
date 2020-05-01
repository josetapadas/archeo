import React from "react";
import { withFirebase } from "../Firebase";
import { styled } from "baseui";
import { Card, StyledBody } from "baseui/card";
import { Button } from "baseui/button";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes/routes";
import withAuthorization from "../Firebase/withAuthorization";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  marginTop: "20px",
});

type HomeProps = {
  firebase: any;
};

class Home extends React.Component<any> {
  render() {
    return (
      <Centered>
        <Card>
          <StyledBody>
            <div>
              <Button
                onClick={() => this.props.history.push(ROUTES.ADD)}
                overrides={{ BaseButton: { style: { width: "100%" } } }}
              >
                Adicionar moeda
              </Button>
            </div>
            <br />
            <div>
              <Button
                onClick={() => this.props.history.push(ROUTES.ARCHIVE)}
                overrides={{ BaseButton: { style: { width: "100%" } } }}
              >
                Arquivo
              </Button>
            </div>
          </StyledBody>
        </Card>
      </Centered>
    );
  }
}

export default withAuthorization(withFirebase(withRouter(Home)));
