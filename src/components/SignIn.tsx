import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { signIn } from "lib/auth";
import { useAuthStateContext } from "context/AuthProvider";
import HomeIcon from "./HomeIcon";
import { useForm, useFormState } from "react-hook-form";

export const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser } = useAuthStateContext();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { dirtyFields } = useFormState({
    control,
  });

  type SignInDataType = {
    email: string;
    password: string;
  };

  const buttonRef = useRef(false);

  const onSubmit = async (data: SignInDataType) => {
    if (buttonRef.current) return;
    buttonRef.current = true;
    try {
      const res = await signIn(data);
      if (res.status === 200) {
        buttonRef.current = false;

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    } finally {
      buttonRef.current = false;
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("email", {
                      required: "必須項目です",
                    })}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">パスワード</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "必須項目です",
                    })}
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
                    type="submit"
                    disabled={!(dirtyFields.email && dirtyFields.password)}
                  >
                    ログイン
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignIn;
