import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "lib/auth";
import HomeIcon from "./HomeIcon";
import { useForm, useFormState } from "react-hook-form";

export const SignUp = () => {
  const [error, setError] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });
  const [confirmAlarm, setConfirmAlarm] = useState(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "名無しさん",
      image:
        "uploads/hoteler/4786f605-a290-4849-929f-cafbacb46beb/blank-profile-picture-g89cfeb4dc_640.png",
      passwordConfirmation: "",
      confirmSuccessUrl: "https://jp.lovehoteler.com/signin",
    },
  });

  const { dirtyFields } = useFormState({
    control,
  });

  const buttonRef = useRef(false);

  type SignUpDataType = {
    email: string;
    password: string;
    name: string;
    passwordConfirmation: string;
    confirmSuccessUrl: string;
  };

  const onSubmit = async (data: SignUpDataType) => {
    if (buttonRef.current) return;
    buttonRef.current = true;
    setPageLoading(true);
    try {
      const res = await signUp(data);
      console.log(res);
      if (res.status === 200) {
        setError({
          email: "",
          password: "",
          name: "",
          password_confirmation: "",
        });
        setPageLoading(false);
        openAndCloseConfirmAlarm();
      }
    } catch (error: any) {
      setPageLoading(false);
      if (error.response.data) {
        setError(error.response.data.errors);
      } else {
        console.log(error);
      }
    } finally {
      buttonRef.current = false;
    }
  };

  const openAndCloseConfirmAlarm = () => {
    setConfirmAlarm(true);
    setTimeout(() => {
      setConfirmAlarm(false);
    }, 5000);
  };

  return (
    <>
      <HomeIcon title={"新規登録"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {pageLoading && (
          <div className="md:hidden absolute bottom-5 right-10">
            <button className="md:hidden btn btn-square loading"></button>
          </div>
        )}
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col w-full mb-auto">
            {confirmAlarm && (
              <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                  <div>
                    <span>
                      認証用のメールを送信しました。届くのに数分かかる場合があります。
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex text-center m-auto">
              <Image
                src="/hartIcon.png"
                alt="ホテル画像"
                width={80}
                height={80}
                priority={true}
              />
              <h1 className="text-2xl md:text-3xl font-bold m-auto">
                ホテラーへようこそ！
              </h1>
            </div>
            <div className="card card-compact	flex-shrink-0 md:w-full  max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">メールアドレス</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    {...register("email", {
                      required: "必須項目です",
                    })}
                  />
                  {error?.email && (
                    <p className="text-red-600 text-sm md:text-sm mt-2">
                      {error?.email}
                    </p>
                  )}
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
                  {error?.password && (
                    <p className="text-red-600 text-sm md:text-sm mt-2">
                      {error?.password}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">パスワード確認用</span>
                  </label>
                  <input
                    type="password"
                    {...register("passwordConfirmation", {
                      required: "必須項目です",
                    })}
                    className="input input-bordered"
                  />
                  {error?.password_confirmation && (
                    <p className="text-red-600 text-sm md:text-sm mt-2">
                      {error?.password_confirmation}
                    </p>
                  )}
                  <label className="label">
                    <p className="label-text-alt link link-hover ">
                      既にアカウントをお持ちの方は
                      <Link href={"/signin"} className="text-blue-link">
                        ログイン
                      </Link>
                      から。
                    </p>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !(
                        dirtyFields.email &&
                        dirtyFields.password &&
                        dirtyFields.passwordConfirmation
                      )
                    }
                  >
                    登録する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default SignUp;
