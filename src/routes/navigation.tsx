import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "./routes";

export const SAMPLE_NAV = [
  {
    item: "Login",
    mapItemToNode: () => <Link to={ROUTES.LOGIN}>Login</Link>,
    mapItemToString: () => "Login",
  },
  {
    item: "Landing",
    mapItemToNode: () => <Link to={ROUTES.LANDING}>Landing</Link>,
    mapItemToString: () => "Landing",
  },
  {
    item: "Home",
    mapItemToNode: () => <Link to={ROUTES.HOME}>Home</Link>,
    mapItemToString: () => "Home",
  },
];
