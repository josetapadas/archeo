import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "./routes";

export const SAMPLE_NAV = [

  {
    item: "Home",
    mapItemToNode: () => <Link to={ROUTES.HOME}>Home</Link>,
    mapItemToString: () => "Home",
  },
  {
    item: "Entrar",
    mapItemToNode: () => <Link to={ROUTES.LOGIN}>Entrar</Link>,
    mapItemToString: () => "Entrar",
  },
  {
    item: "Sair",
    mapItemToNode: () => <Link to={ROUTES.LOGOUT}>Sair</Link>,
    mapItemToString: () => "Sair",
  },
];
