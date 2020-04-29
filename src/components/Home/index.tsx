import React, { FunctionComponent } from "react";
import { inject, observer } from "mobx-react";
import { SessionStoreType } from "../../stores/sessionStore";

type HomeProps = {
  sessionStore: SessionStoreType;
};

const Home: FunctionComponent<HomeProps> = ({ sessionStore }) => (
  <div>
    Welcome{" "}
    {sessionStore.authUser ? sessionStore.authUser.displayName : "stranger"} !
  </div>
);

export default inject("sessionStore")(observer(Home));
