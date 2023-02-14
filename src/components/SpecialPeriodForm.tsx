import React, { memo, useState } from "react";
import { useRouter } from "next/router";
import { createHotel, getDays, updateHotel } from "lib/hotels";
import {
  HotelEditFormType,
  HotelUpdateType,
  SpecialPeriodType,
} from "types/types";
import { useForm, useFormState } from "react-hook-form";
import Cookies from "js-cookie";
import { createSpecialPeriod, updateSpecialPeriod } from "lib/specialPeriods";

type PROPS = {
  id?: number;
};

const SpecialPeriodForm = ({ id }: PROPS) => {
  const router = useRouter();
  const pathName = router.asPath;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      period: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: SpecialPeriodType[]) => {
    const periods = data.map((periodParams: SpecialPeriodType) => {
      const convertNumberToDate: SpecialPeriodType = {
        period: periodParams.period,
        startDate: `${periodParams.startDate}`,
        endDate: `${periodParams.endDate}`,
        id: periodParams.id,
      };
      return convertNumberToDate;
    });

    try {
      const hotelId = Cookies.get("_hotel_id") || id;
      const hotelDays = await getDays(hotelId);
      const specialDay = hotelDays[6];
      if (pathName.startsWith("/hotels/register")) {
        await Promise.all([
          periods.map((periodParams: SpecialPeriodType) => {
            createSpecialPeriod(periodParams, specialDay);
          }),
        ]);
        if (res.status == 200) {
          router.push(`/hotels/register/facilities`);
        }
      } else {
        await Promise.all([
          periods.map((periodParams: SpecialPeriodType) => {
            updateSpecialPeriod(periodParams, specialDay, periodId);
          }),
        ]);
        if (res.status == 200) {
          router.reload();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getPeriodsFormValue = getValues();

  const periodDateForm = (periodName: string) => {
    return (
      <>
        <th>{periodName}</th>
        <td>
          <div>
            <input
              className="input input-bordered input-sm"
              placeholder="(例) 20230101"
              {...register("startDate", {
                required: true,
                pattern: /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
              })}
            />
            {errors?.["startDate"] && errors?.["startDate"]?.message}
          </div>
        </td>
        <td>
          <div>
            <input
              className="input input-bordered input-sm"
              placeholder="(例) 20231230"
              {...register("endDate", {
                required: true,
                pattern: /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
              })}
            />
            {errors?.["endDate"] && errors?.["endDate"]?.message}
          </div>
        </td>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>特別期間</th>
                <th>開始日時</th>
                <th>終了日時</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>{periodDateForm("お盆")}</tr>
              <tr>{periodDateForm("GW")}</tr>
              <tr>{periodDateForm("年末年始")}</tr>
            </tbody>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                {pathName.startsWith("/hotels/register")
                  ? "特別期間を登録する"
                  : "特別期間を更新する"}
              </button>
            </div>
          </table>
        </div>
      </form>
    </>
  );
};

export default SpecialPeriodForm;
