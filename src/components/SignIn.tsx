import Cookies from "js-cookie";
import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "lib/auth";
import { useRouter } from "next/navigation";
import { SignInParams } from "types/types";
import Navbar from "components/Navbar";
import { useAuthStateContext } from "context/AuthProvider";

export const SignIn = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser, isSignedIn, currentUser } =
    useAuthStateContext();

  console.log(currentUser);

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

  useLayoutEffect(() => {
    currentUser && router.push("/");
  }, []);

  return (
    <>
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content flex-col w-full lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">ホテラーにログイン</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                />
                <label className="label">
                  <p className="label-text-alt link link-hover">
                    パスワードを忘れた場合
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
              {error && (
                <>
                  <p className="whitespace-pre-wrap mt-5 text-red-600">
                    {error}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <p>ホテラーにログイン</p>
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
      <Link href="/signup">サインアップへ</Link> */}
    </>
  );
};
export default SignIn;
