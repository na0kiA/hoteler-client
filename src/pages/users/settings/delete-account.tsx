import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "components/Layout";
import { useAuthStateContext } from "context/AuthProvider";
import { deleteAccount } from "lib/auth";

const DeleteAccount = () => {
  const [confirmAlart, setConfirmAlart] = useState(false);
  const { currentUser, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();
  const router = useRouter();

  const closeConfirmAlart = () => {
    setConfirmAlart(true);
    setTimeout(() => {
      setConfirmAlart(false);
    }, 5000);
  };

  const handleDeleteAccountSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await deleteAccount();
      if (res.status === 200) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        closeConfirmAlart();
        setIsSignedIn(false);
        setCurrentUser(undefined);
        router.replace("/");
      } else {
        throw new Error(
          "アカウントの削除に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"設定"}>
        {confirmAlart ? (
          <div className="toast toast-end">
            <div className="alert alert-success">
              <div>
                <span>アカウントを削除しました。</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="card w-96 bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title text-base">アカウントの削除</h2>
            <p className="text-xs font-bold">
              一度アカウントを削除すると、二度と元に戻せません。十分ご注意ください。
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleDeleteAccountSubmit}
              >
                アカウントを削除する
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DeleteAccount;
