import Cookies from "js-cookie";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser, signIn } from "lib/auth";
import { AuthContext } from "pages";
import { useRouter } from "next/router";
import { SignInParams } from "types/types";
import Navbar from "components/Navbar";

export const SignIn = () => {
  const { setCurrentUser, setIsSignedIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const generateParams = () => {
    const signInParams: SignInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn == true;
        setCurrentUser == res.data.data;
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        setError(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <p>ホテラーにログイン</p>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={(event) => {
            handleSignInSubmit(event);
          }}
        >
          ログイン
        </button>
      </form>
      {error && (
        <>
          <p className="whitespace-pre-wrap mt-5 text-red-600">{error}</p>
        </>
      )}
      <Link href="/signup">サインアップへ</Link>
    </>
  );
};
export default SignIn;
