import Cookies from "js-cookie";
import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "lib/auth";
import { useRouter } from "next/navigation";
import { SignInParams } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import HomeIcon from "./HomeIcon";

export const SignIn = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser, currentUser } = useAuthStateContext();

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
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    }
  };
  console.log(currentUser);

  useLayoutEffect(() => {
    currentUser && router.push("/");
  }, [currentUser]);

  return (
    <>
      <HomeIcon title={"ログイン"} />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col w-full mb-auto">
          <div className="text-center m-auto">
            <h1 className="text-3xl md:text-4xl font-bold">
              ホテラーにログイン
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {error && (
                <p className="text-red-600 font-bold text-xs md:text-sm">
                  {error}
                </p>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">メールアドレス</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">パスワード</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                />
                <label className="label">
                  <p className="label-text-alt link link-hover">
                    <Link href={"/users/settings/reset-password"}>
                      パスワードを忘れた場合
                    </Link>
                  </p>
                </label>
                <label className="label">
                  <p className="label-text-alt link link-hover ">
                    アカウントを持っていない場合は
                    <Link href={"/signup"} className="text-blue-link">
                      新規登録
                    </Link>
                    から。
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={(event) => {
                    handleSignInSubmit(event);
                  }}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
