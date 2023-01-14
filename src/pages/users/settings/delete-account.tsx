import Layout from "components/Layout";
import { useAuthStateContext } from "context/AuthProvider";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";

const DeleteAccount = () => {
  const { currentUser } = useAuthStateContext();
  console.log(currentUser);

  const router = useRouter();

  useLayoutEffect(() => {
    !currentUser && router.push("/signin");
  }, []);

  return (
    <>
      <Layout title={"設定"}>
        <div className="card w-96 bg-base-100 shadow-xl m-auto">
          <div className="card-body">
            <h2 className="card-title text-base">アカウントの削除</h2>
            <p className="text-xs font-bold">
              一度アカウントを削除すると、二度と元に戻せません。十分ご注意ください。
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-sm btn-secondary">
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
