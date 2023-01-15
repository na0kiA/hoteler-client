import Cookies from "js-cookie";
import React, { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { postResetPassword, signIn } from "lib/auth";
import { useRouter } from "next/navigation";
import { PostResetPasswordParams } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";

export const ResetPassword = () => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [confirmAlart, setConfirmAlart] = useState(false);
  const redirectUrl = "http://localhost:3000/update-password";

  const generateParams = () => {
    const signInParams: PostResetPasswordParams = {
      email: email,
      redirectUrl: redirectUrl,
    };
    return signInParams;
  };

  const closeConfirmAlart = () => {
    setConfirmAlart(true);
    setTimeout(() => {
      setConfirmAlart(false);
    }, 5000);
  };

  const handlePostMail = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const params = generateParams();

    try {
      const res = await postResetPassword(params);
      closeConfirmAlart();

      if (res.status === 200) {
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
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">パスワードを再設定する</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {error && (
                <p className="text-red-600 font-bold text-xs">{error}</p>
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
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={(event) => {
                    handlePostMail(event);
                  }}
                >
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
