// import Head from "next/head";
// import Link from "next/link";
// import Image from 'next/image'
import React from "react";

type TITLE = {
  title: string;
  children: any;
};

const Layout: React.FC<TITLE> = ({ children, title = "ホテラー" }) => {
  return (
    <div className="bg-gray-900">
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
export default Layout;
