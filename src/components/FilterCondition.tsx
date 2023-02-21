import { useRouter } from "next/router";
import React from "react";
import { useForm, useFormState } from "react-hook-form";

const FilterCondition = () => {
  const router = useRouter();
  const query = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      hotelFacilities: [],
    },
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const filteringComponent = (
    leftValue: string,
    leftLabel: string,
    rightValue: string,
    rightLabel: string
  ) => {
    return (
      <li className="w-full border-b rounded-t-lg">
        <div className="flex">
          <label className="flex justify-start items-center label cursor-pointer ">
            <input
              type="checkbox"
              value={leftValue}
              {...register("hotelFacilities")}
              className="w-4 h-4 checkbox checkbox-secondary"
            />
            <span className="py-3 ml-2 text-sm font-medium ">{leftLabel}</span>
          </label>
          <label className="flex mr-auto items-center pl-3 label cursor-pointer ">
            <input
              type="checkbox"
              value={rightValue}
              {...register("hotelFacilities")}
              className="w-4 h-4 checkbox checkbox-secondary"
            />
            <span className="py-3 ml-2 text-sm font-medium ">{rightLabel}</span>
          </label>
        </div>
      </li>
    );
  };

  type InputType = {
    hotelFacilities: string[];
  };

  const onSubmit = (data: InputType) => {
    const keywordUrl = `/search?keyword=${query.keyword}`;
    router.push(`${keywordUrl}${makingQuery(data)}`);
  };

  const makingQuery = (data: InputType) => {
    const { hotelFacilities } = data;
    let query = "";
    hotelFacilities.forEach((facility) => {
      query += `&hotel_facilities[]=${facility}`;
    });
    return query;
  };

  const facilityList: string[] = [
    "wifi_enabled",
    "parking_enabled",
    "credit_card_enabled",
    "phone_reservation_enabled",
    "net_reservation_enabled",
    "triple_rooms_enabled",
    "cooking_enabled",
    "breakfast_enabled",
    "coupon_enabled",
    "secret_payment_enabled",
  ];
  const hogeList: string[] = ["inu", "neko", "ushi"];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="card w-full  bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title justify-start font-semibold">
              アメニティ・設備
            </h3>
            <div className="flex gap-3">
              <button
                className="btn btn-xs btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setValue("hotelFacilities", facilityList as never[], {
                    shouldDirty: true,
                  });
                }}
              >
                <span className="text-sm font-medium">全てを選択</span>
              </button>
              <button
                className="btn btn-xs btn-active btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  reset({ hotelFacilities: [] });
                }}
              >
                <span className="text-sm font-medium">取り消し</span>
              </button>
            </div>
            <ul className="w-full text-sm">
              {filteringComponent(
                "wifi_enabled",
                "Wi-Fi",
                "parking_enabled",
                "駐車場"
              )}
              {filteringComponent(
                "coupon_enabled",
                "クーポン",
                "triple_rooms_enabled",
                "3人以上"
              )}
              {filteringComponent(
                "phone_reservation_enabled",
                "電話予約",
                "net_reservation_enabled",
                "ネット予約"
              )}
              {filteringComponent(
                "cooking_enabled",
                "料理",
                "breakfast_enabled",
                "朝食"
              )}
              <li className="w-full border-b rounded-t-lg">
                <div className="flex">
                  <label className="flex justify-start items-center label cursor-pointer">
                    <input
                      type="checkbox"
                      value="credit_card_enabled"
                      {...register("hotelFacilities")}
                      className="w-4 h-4 checkbox checkbox-secondary"
                    />
                    <span className="py-3 ml-2 text-sm font-medium">
                      クレジットカード決済
                    </span>
                  </label>
                </div>
              </li>
              <li className="w-full border-b rounded-t-lg">
                <div className="flex">
                  <label className="flex justify-start items-center label cursor-pointer">
                    <input
                      type="checkbox"
                      value="secret_payment_enabled"
                      {...register("hotelFacilities")}
                      className="w-4 h-4 checkbox checkbox-secondary"
                    />
                    <span className="py-3 ml-2 text-sm font-medium ">
                      入室から退室までフロントと会わない
                    </span>
                  </label>
                </div>
              </li>
            </ul>
            <div className="card-actions justify-end mt-3">
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                disabled={!isDirty}
              >
                絞り込む
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FilterCondition;
