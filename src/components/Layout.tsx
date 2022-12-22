import Head from "next/head";
// import Link from "next/link";
// import Image from 'next/image'
import React from "react";
import Header from "./Header";

type TITLE = {
  title: string;
  children: any;
};

const Layout: React.FC<TITLE> = ({ children, title = "ホテラー" }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>

      <footer className="w-full h-12 flex justify-center items-center border-t">
        フッターです
      </footer>
    </div>
  );
};
export default Layout;
