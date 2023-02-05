import React from "react";
import Link from "next/link";
import { getServiceList } from "lib/hotelRate";
import HotelFormInput from "components/HotelFormInput";
import Layout from "components/Layout";
import client from "lib/client";
import { HotelEditType } from "types/types";

const Edit = ({
  name,
  content,
  company,
  city,
  prefecture,
  postalCode,
  streetAddress,
  phoneNumber,
  id,
}: HotelEditType) => {
  console.log(prefecture);

  return (
    <Layout title={`${name}の編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <div className="tab tab-md md:tab-lg tab-bordered tab-active">
            詳細
          </div>
          <Link
            href={`/hotels/${id}/rate`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            料金
          </Link>
          <Link
            href={`/hotels/${id}/facilities`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            設備
          </Link>
        </div>
      </div>
      <HotelFormInput
        name={name}
        content={content}
        company={company}
        city={city}
        prefecture={prefecture}
        postalCode={postalCode}
        streetAddress={streetAddress}
        phoneNumber={phoneNumber}
        id={id}
      />
    </Layout>
  );
};

export default Edit;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail, currentUser]: any = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
      client.get(`/auth/sessions`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
    ]);
    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
