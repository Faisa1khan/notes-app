import React from "react";

const LogoutBtn = ({ logoutHandler }) => (
  <button onClick={logoutHandler} className="logout">
    {" "}
    Log Out
  </button>
);

export default LogoutBtn;
