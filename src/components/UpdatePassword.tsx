import React, { useEffect, useState } from "react";
import { updatePassword } from "lib/auth";
import { useRouter } from "next/router";
import { UpdatePasswordParams } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";

export const UpdatePassword = () => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [confirmAlart, setConfirmAlart] = useState(false);

  const generateParams = () => {
    const updatePasswordParams: UpdatePasswordParams = {
      password: password,
      passwordConfirmation: passwordConfirmation,
      token: query.token,
    };
    return updatePasswordParams;
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
      const res = await updatePassword(params, query);
      if (res.status === 200) {
        closeConfirmAlart();
        router.push("/signin");
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

  useEffect(() => {
    currentUser && router.push("/");
  }, [router]);

  return (
    <>
      {confirmAlart ? (
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
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">パスワードを更新する</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              {error && (
                <p className="text-red-600 font-bold text-xs">{error}</p>
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
