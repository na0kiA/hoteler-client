import React from "react";
import Image from "next/image";
import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <Layout title="存在しないページ">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
