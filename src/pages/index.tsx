import React, { createContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";

import { getAllHotel } from "lib/hotels";
import { CurrentUser, HotelListType } from "types/types";
import Layout from "components/Layout";
import StarsRating from "components/StarsRating";
import ServiceList from "components/serviceList";
import { getCurrentUser } from "lib/auth";
import Navbar from "components/Navbar";

type PROPS = {
  hotels: HotelListType[];
};

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
};

export const AuthContext = createContext({} as AuthContextType);

const Home = ({ hotels }: PROPS) => {
  console.log("index.tsxが呼ばれたよ");

  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        setIsSignedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const sliceNameOrNot = (name: string) => {
    if (name.length > 6) {
      return name.slice(0, 6).concat("…");
    } else {
      return name;
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <Layout title={"ホテラー"}>
          <div className="md:grid grid-cols-4 gap-5 p-10 pt-5" id="home">
            {hotels &&
              hotels.map((hotel: HotelListType) => (
                <div key={hotel.id}>
                  <figure>
                    <Image
                      className="object-fill rounded-lg"
                      src="/hoteler_demo_photo.jpg"
                      alt="ホテル画像"
                      width={640}
                      height={480}
                      priority={true}
                    />
                  </figure>
                  <div className="p-0 mb-10">
                    <Link href={`/hotels/${hotel.id}`}>
                      <div className="inline-block mt-1 text-base font-bold font-mono">
                        {sliceNameOrNot(hotel.name)}
                      </div>
                    </Link>
                    <div
                      className={
                        hotel.full
                          ? "badge ml-1 bg-pink-500 text-black rounded-lg float-right  mt-1"
                          : "badge ml-1 bg-green-500 text-black rounded-lg float-right  mt-1"
                      }
                    >
                      {hotel.full ? "満室" : "空室"}
                    </div>
                    <div>
                      <p className="text-xs  font-sans font-thin italic">
                        {hotel.fullAddress}
                      </p>
                    </div>
                    <StarsRating props={hotel} />
                    <ServiceList
                      stay={hotel.stayRates}
                      rest={hotel.restRates}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Layout>
      </AuthContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const apiResponse = await getAllHotel();
  const hotels = await apiResponse.data;
  // console.log(req.cookies._access_token);

  // if (req.cookies._access_token) {
  //   hotels.isLogin = true;
  // } else {
  //   hotels.isLogin = false;
  // }

  return {
    props: {
      hotels,
    },
  };
};
export default Home;
