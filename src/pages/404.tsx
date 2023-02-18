import React from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <Layout title="存在しないページ">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">おっと！</h1>
            <p className="py-6">既に削除されたか存在しないページです</p>
            <button className="btn btn-primary" onClick={() => router.back()}>
              前へ戻る
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
