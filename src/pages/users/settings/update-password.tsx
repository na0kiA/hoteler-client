import UpdatePassword from "components/UpdatePassword";
import { withAuthServerSideProps } from "lib/auth";
import React from "react";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Resetpassword = () => {
  return <UpdatePassword />;
};
export default Resetpassword;
