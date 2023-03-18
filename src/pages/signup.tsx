import React from "react";
import SignUp from "components/SignUp";
import { withRequireNotAuthServerSideProps } from "lib/auth";
export const getServerSideProps = withRequireNotAuthServerSideProps();

const Signin = () => {
  return <SignUp />;
};
export default Signin;
