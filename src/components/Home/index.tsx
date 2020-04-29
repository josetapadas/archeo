import React, { FunctionComponent } from "react";
import { SessionStoreType } from "../../stores/sessionStore";
import withAuthorization from "../Firebase/withAuthorization";

type HomeProps = {
  sessionStore: SessionStoreType;
};

const Home: FunctionComponent<HomeProps> = ({ sessionStore }) => (
  <div>
    Welcome{" "}
    {JSON.stringify(sessionStore.authUser)} !
  </div>
);

export default withAuthorization(Home);
