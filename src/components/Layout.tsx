// import Head from "next/head";
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
    <div>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
export default Layout;
