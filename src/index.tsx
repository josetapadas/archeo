import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider as MobxProvider } from "mobx-react";
import rootStore from "./stores";

import 'mobx-react-lite/batchingForReactDom'

ReactDOM.render(
  <React.StrictMode>
    <MobxProvider {...rootStore}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </MobxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
