import React, { useState } from "react";
import { useRouter } from "next/router";
import { updatePassword } from "lib/auth";
import { UpdatePasswordParams } from "types/types";
import HomeIcon from "./HomeIcon";

export const UpdatePassword = () => {
  const router = useRouter();
  const query = router.query;

  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmAlarm, setConfirmAlarm] = useState(false);

  const generateParams = () => {
    const updatePasswordParams: UpdatePasswordParams = {
      password,
      passwordConfirmation,
      token: query.token,
    };
    return updatePasswordParams;
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
      const res = await updatePassword(params, query);
      if (res.status === 200) {
        closeConfirmAlarm();
        router.push("/signin");
      }
    } catch (error: any) {
      if (error.response?.data.errors === "Unauthorized") {
        setError("認証情報が無効です。");
      } else if (error.response?.data) {
        setInvalidPassword(error.response.data.errors.password);
        setInvalidPasswordConfirmation(
          error.response.data.errors.password_confirmation
        );
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <HomeIcon title={"パスワード更新ページ"} />
      {confirmAlarm ? (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <div>
              <span>パスワードが正常に更新されました。</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="hero min-h-screen  bg-base-200">
        <div className="hero-content flex-col w-full mb-auto">
          <div className="text-center m-auto">
            <h1 className="text-2xl md:text-4xl font-bold">
              パスワードを更新する
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
                  <span className="label-text">新規パスワード</span>
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
                  <span className="label-text">新規パスワード(確認用)</span>
                </label>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="input input-bordered"
                />
                {invalidPasswordConfirmation && (
                  <p className="text-red-600 text-sm md:text-sm mt-2">
                    {invalidPasswordConfirmation}
                  </p>
                )}
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
export default UpdatePassword;
