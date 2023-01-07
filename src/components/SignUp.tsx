import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "pages";
import { signUp } from "lib/auth";
import { SignUpParams } from "types/types";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const { setIsSignedIn, setCurrentUser, currentUser } =
    useContext(AuthContext);
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000/signin";
  const router = useRouter();

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
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
      console.log(res);
      alert("confirm email");
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        console.log(error.response.data.errors);
        setInvalidEmail(error.response.data.errors.email);
        setInvalidPassword(error.response.data.errors.password);
      } else {
        console.log(error);
      }
    }
  };

  const successAlart = () => {
    return (
      <>
        <div className="alert alert-success shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>アカウント認証用のメールを送信致しました。</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h1>ホテラーへようこそ!</h1>
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
        <div>
          <label htmlFor="password_confirmation">パスワード確認</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="hidden"
            id="confirm_success_url"
            name="confirm_success_url"
            value={confirmSuccessUrl}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            handleSignUpSubmit(e);
            setInvalidPassword("");
            setInvalidEmail("");
            successAlart;
          }}
        >
          登録する
        </button>
      </form>
      {invalidEmail && (
        <>
          <p className="whitespace-pre-wrap mt-5 text-red-600">
            {invalidEmail}
          </p>
        </>
      )}
      {invalidPassword && (
        <>
          <p className="whitespace-pre-wrap mt-5 text-red-600">
            {invalidPassword}
          </p>
        </>
      )}
      <div>
        既にアカウントを持っている方は
        <Link href="/signin" className="text-blue-link">
          ログインから。
        </Link>
      </div>
    </>
  );
};
export default SignUp;
