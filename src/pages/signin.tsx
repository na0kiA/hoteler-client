import React from "react";
import SignIn from "components/SignIn";
import { AuthProvider } from "context/AuthProvider";

const Signin = () => {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
};
export default Signin;
