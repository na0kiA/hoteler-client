import React from "react";
import SignIn from "components/SignIn";
import { withRequireNotAuthServerSideProps } from "lib/auth";

export const getServerSideProps = withRequireNotAuthServerSideProps();

const Signin = () => {
  return <SignIn />;
};
export default Signin;
