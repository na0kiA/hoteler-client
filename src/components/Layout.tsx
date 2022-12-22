import Head from "next/head";
import Link from "next/link";
// import Image from 'next/image'
import React from "react";

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
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a
                  data-testid="blog-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Blog
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
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
