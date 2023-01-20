import ResetPassword from "components/ResetPassword";
import { withAuthServerSideProps } from "lib/auth";
import React from "react";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Resetpassword = () => {
  return <ResetPassword />;
};
export default Resetpassword;
