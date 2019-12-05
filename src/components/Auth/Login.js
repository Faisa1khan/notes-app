import React from "react";
import { useAuth0 } from "./react-auth0-spa";

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <button
      onClick={() => {
        loginWithRedirect({});
      }}
    >
      Log In
    </button>
  );
};

export default Login;
