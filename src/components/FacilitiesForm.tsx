import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { postImageKeyOfHotel, updateFacilities } from "lib/hotels";
import { useHotelFormStateContext } from "context/HotelFormProvider";
import { HotelFacilityType } from "types/types";

type PROPS = {
  id: string | undefined;
  facilities?: HotelFacilityType;
};

const FacilitiesForm = ({ id }: PROPS) => {
  const [error, setError] = useState("");
  const { keys } = useHotelFormStateContext();
  const router = useRouter();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      wifiEnabled: false,
      parkingEnabled: false,
      creditCardEnabled: false,
      phoneReservationEnabled: false,
      netReservationEnabled: false,
      tripleRoomsEnabled: false,
      secretPaymentEnabled: false,
      cookingEnabled: false,
      breakfastEnabled: false,
      couponEnabled: false,
    },
  });

  const getFacilitiesValue = getValues();

  type FacilitiesKey = keyof typeof getFacilitiesValue;

  const onSubmit = async (data: HotelFacilityType) => {
    console.log(data);

    try {
      const [results]: any = await Promise.all([
        postImageKeyOfHotel(id, keys),
        updateFacilities(id, data),
      ]);
      console.log(results);

      if (results.status === 200) {
        Cookies.remove("_hotel_id");
        router.push(`/hotels/${id}`);
      }
    } catch (error: any) {
      if (error.response.data) {
        console.log(error);
        setError(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const toggleOfFacilities = (label: string, value: FacilitiesKey) => {
    return (
      <div className="form-control w-3/4 md:w-1/4 m-auto">
        <label className="cursor-pointer label">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            {...register(value)}
          />
        </label>
      </div>
    );
  };

  return (
    <div className="text-center p-10">
      <div className="text-xl font-bold mb-1 underline">ホテル設備の設定</div>
      {error && (
        <div className="text-red-600 text-ssm md:text-sm my-auto">{error}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {toggleOfFacilities("WiFiの有無", "wifiEnabled")}
        {toggleOfFacilities("駐車場の有無", "parkingEnabled")}
        {toggleOfFacilities("クレジットカードの利用可否", "creditCardEnabled")}
        {toggleOfFacilities("電話予約の可否", "phoneReservationEnabled")}
        {toggleOfFacilities("ネット予約の可否", "netReservationEnabled")}
        {toggleOfFacilities("3人以上の利用の可否", "tripleRoomsEnabled")}
        {toggleOfFacilities("料理の提供の有無", "cookingEnabled")}
        {toggleOfFacilities("朝食の提供の有無", "breakfastEnabled")}
        {toggleOfFacilities("クーポンの有無", "couponEnabled")}
        {toggleOfFacilities(
          "フロントと会わずに精算ができる",
          "secretPaymentEnabled"
        )}
        <div className="mt-5">
          <Link href={`/hotels/${id}`} className="link md:text-lg mr-10">
            今はスキップ
          </Link>
          <button type="submit" className="btn btn-primary">
            仮登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacilitiesForm;
