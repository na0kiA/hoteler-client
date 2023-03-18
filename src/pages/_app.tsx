import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "context/AuthProvider";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      {pageLoading && (
        <div className="md:hidden absolute bottom-5 right-10">
          <button className="md:hidden btn btn-square loading"></button>
        </div>
      )}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
