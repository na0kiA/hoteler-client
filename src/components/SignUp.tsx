import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import fs from "node:timers/promises";
// import { setTimeout } from "node:timers/promises";

import { signUp } from "lib/auth";
import { SignUpParams } from "types/types";
import { useRouter } from "next/navigation";
import { useAuthStateContext } from "context/AuthProvider";

export const SignUp = () => {
  const { setIsSignedIn, setCurrentUser, currentUser } = useAuthStateContext();
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmAlart, setConfirmAlart] = useState(false);
  const confirmSuccessUrl = "http://localhost:3000/signin";
  const router = useRouter();

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      name: "名無しさん",
      image:
        "uploads/hoteler/b0e2987c-016e-4ce6-8099-fb8ae43115fc/blank-profile-picture-g89cfeb4dc_640.png",
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res: SignUpParams = await signUp(params);
      closeConfirmAlart();
      console.log(res);
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        console.log(error.response.data.errors);
        setInvalidEmail(error.response.data.errors.email);
        setInvalidPassword(error.response.data.errors.password);
        setInvalidPasswordConfirmation(
          error.response.data.errors.password_confirmation
        );
      } else {
        console.log(error);
      }
    }
  };

  const closeConfirmAlart = () => {
    setConfirmAlart(true);
    setTimeout(() => {
      setConfirmAlart(false);
    }, 5000);
  };

  return (
    <>
      {confirmAlart ? (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <div>
              <span>認証用のメールを送信しました。</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content  flex-col  w-full">
          <div className="flex text-left  md:text-left">
            <Image
              src="/hartIcon.png"
              alt="ホテル画像"
              width={80}
              height={80}
              priority={true}
            />
            <h1 className="text-2xl font-bold m-auto">ホテラーへようこそ！</h1>
          </div>
          <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
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
                {invalidEmail && (
                  <p className="text-red-600 text-sm mt-2">{invalidEmail}</p>
                )}
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
                {invalidPassword && (
                  <p className="text-red-600 text-sm mt-2">{invalidPassword}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">パスワード確認用</span>
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="input input-bordered"
                />
                {invalidPasswordConfirmation && (
                  <p className="text-red-600 text-sm mt-2">
                    {invalidPasswordConfirmation}
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
                  className="btn btn-primary"
                  onClick={(e) => {
                    handleSignUpSubmit(e);
                    setInvalidPassword("");
                    setInvalidEmail("");
                    setInvalidPasswordConfirmation("");
                  }}
                >
                  登録する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
