import HotelEdit from "components/HotelEdit";
import Layout from "components/Layout";
import client from "lib/client";
import { getRestRates, getServiceList, getStayRates } from "lib/hotelRate";
import { getDays, getHotelDetail } from "lib/hotels";
import React, { useState } from "react";
import { HotelDetailType, HotelEditType, ServiceRateType } from "types/types";

const edit = ({
  name,
  content,
  company,
  city,
  prefecture,
  postalCode,
  streetAddress,
  phoneNumber,
  serviceList,
}: HotelEditType) => {
  return (
    <Layout title={`${name}の編集ページ`}>
      <HotelEdit
        name={name}
        content={content}
        company={company}
        city={city}
        prefecture={prefecture}
        postalCode={postalCode}
        streetAddress={streetAddress}
        phoneNumber={phoneNumber}
      />
    </Layout>
  );
};

export default edit;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail, currentUser, serviceList]: any = await Promise.all([
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
      getServiceList(
        id,
        ctx.req.cookies["_access_token"],
        ctx.req.cookies["_client"],
        ctx.req.cookies["_uid"]
      ),
    ]);
    console.log(serviceList);
    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
          serviceList,
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
