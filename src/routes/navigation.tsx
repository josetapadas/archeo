import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "./routes";

export const LOGGED_NAV = [
  {
    item: "Início",
    mapItemToNode: () => <Link to={ROUTES.HOME}>Início</Link>,
    mapItemToString: () => "Início",
  },
  {
    item: "Sair",
    mapItemToNode: () => <Link to={ROUTES.LOGOUT}>Sair</Link>,
    mapItemToString: () => "Sair",
  },
];

export const GUEST_NAV = [
  {
    item: "Entrar",
    mapItemToNode: () => <Link to={ROUTES.LOGIN}>Entrar</Link>,
    mapItemToString: () => "Entrar",
  },
];
