import { useHotelFormStateContext } from "context/HotelFormProvider";
import { postImageKeyOfHotel, updateFacilities } from "lib/hotels";
import Link from "next/link";
import React, { memo } from "react";
import { HotelFacilityType } from "types/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// type FacilitiesKey = keyof typeof HotelFacilityType;

const FacilitiesForm = memo(() => {
  const { id, keyList } = useHotelFormStateContext();
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
  console.log(getFacilitiesValue);

  const onSubmit = async (data: HotelFacilityType) => {
    try {
      const [results]: any = await Promise.all([
        postImageKeyOfHotel(keyList, id),
        updateFacilities(id, data),
      ]);
      if (results.status == 200) {
        router.push(`/hotels/${id}`);
      }
    } catch (error: any) {
      if (error.response.data) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const toggleOfFacilities = (label: string, value: FacilitiesKey) => {
    return (
      <div className="form-control w-52">
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
    <>
      ホテル設備の設定
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
          "フロントと会わずに精算ができるかどうか",
          "secretPaymentEnabled"
        )}
        <button type="submit" className="btn btn-primary">
          仮登録
        </button>
      </form>
    </>
  );
});

export default FacilitiesForm;
