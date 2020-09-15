import React from "react";
import Card from "./login";
import { data } from "../data";

const LoginButton = () => {
  return data.map((app) => {
    return <Card {...app} key={app.name} />;
  });
};

export default LoginButton;
