import React, { useLayoutEffect } from "react";
import SignIn from "components/SignIn";
import { getUserShow, getCurrentUser } from "lib/auth";
import { GetServerSideProps } from "next";
import { UserDetailType } from "types/types";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);
      if (res?.data.is_login === true) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    handleGetCurrentUser();
  }, []);

  return <SignIn />;
};
export default Signin;

// export const getServerSideProps: GetServerSideProps = async () => {

//   const res = await getCurrentUser();
//   const data = {login: false}

//   if (res?.data.is_login === true) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }
//   return {  data };
// };
