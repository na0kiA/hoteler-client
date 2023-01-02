import React, { createContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";

import { getAllHotel, getCurrentUser } from "lib/allRequests";
import { HotelListType } from "types/types";
import Layout from "components/Layout";
import StarsRating from "components/StarsRating";
import ServiceList from "components/serviceList";

type PROPS = {
  hotels: HotelListType[];
};

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext({} as AuthContextType);

const Home = ({ hotels }: PROPS) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const apiResponse = await getAllHotel();
  const hotels = await apiResponse.data;

  return {
    props: {
      hotels,
    },
  };
};
export default Home;
