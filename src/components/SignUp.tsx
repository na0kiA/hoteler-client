import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "lib/auth";
import { SignUpParams } from "types/types";
import HomeIcon from "./HomeIcon";

export const SignUp = () => {
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmAlart, setConfirmAlart] = useState(false);

  const confirmSuccessUrl = "http://localhost:3000/signin";

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      name: "名無しさん",
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
      openAndCloseConfirmAlart();
    } catch (error: any) {
      if (error.response.data) {
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

  const openAndCloseConfirmAlart = () => {
    setConfirmAlart(true);
    setTimeout(() => {
      setConfirmAlart(false);
    }, 5000);
  };

  return (
    <>
      <HomeIcon title={"新規登録"} />
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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full mb-auto">
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
                  <p className="text-red-600 text-sm md:text-sm mt-2">
                    {invalidEmail}
                  </p>
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
                  <p className="text-red-600 text-sm md:text-sm mt-2">
                    {invalidPassword}
                  </p>
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
                  <p className="text-red-600 text-sm md:text-sm mt-2">
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
