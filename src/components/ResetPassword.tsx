import React, { useState } from "react";
import { postResetPassword } from "lib/auth";
import { PostResetPasswordParams } from "types/types";
import HomeIcon from "./HomeIcon";

export const ResetPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [confirmAlarm, setConfirmAlarm] = useState(false);
  const redirectUrl =
    "https://jp.lovehoteler.com/users/settings/update-password";

  const generateParams = () => {
    const signInParams: PostResetPasswordParams = {
      email,
      redirectUrl,
    };
    return signInParams;
  };

  const closeConfirmAlarm = () => {
    setConfirmAlarm(true);
    setTimeout(() => {
      setConfirmAlarm(false);
    }, 5000);
  };

  const handlePostMail = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const params = generateParams();

    try {
      await postResetPassword(params);
      closeConfirmAlarm();
    } catch (error: any) {
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <HomeIcon title={"パスワード再設定ページ"} />
      {confirmAlarm ? (
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
          <div className="text-center m-auto">
            <h1 className="text-2xl md:text-3xl font-bold">
              パスワードを再設定する
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
