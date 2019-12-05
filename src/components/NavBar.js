import React from "react";
import LogoutBtn from "./Auth/LogoutBtn";

const Header = ({ logoutHandler }) => (
  <LogoutBtn logoutHandler={logoutHandler} />
);

export default Header;
