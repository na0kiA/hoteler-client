import React, { useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import client from "lib/client";
import { getDays } from "lib/hotels";
import { SpecialPeriodEditType, SpecialPeriodType } from "types/types";
import { deleteSpecialPeriod, updateSpecialPeriod } from "lib/specialPeriods";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import Layout from "components/Layout";
import SpecialPeriodForm from "components/SpecialPeriodForm";
import Link from "next/link";
import { useRouter } from "next/router";

type PROPS = {
  name: string;
  id: string;
  specialPeriod: SpecialPeriodEditType[];
};

const SpecialPeriod = ({ name, id, specialPeriod }: PROPS) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      periods: specialPeriod,
    },
  });

  const filedArrayName = "periods";

  const { fields, remove } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const removeSpecialPeriod = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    field: SpecialPeriodEditType
  ) => {
    e.preventDefault();
    try {
      const res = await deleteSpecialPeriod(field.dayId, field.serviceId);
      if (res.status === 200) {
        remove(index);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertStringToAlphabet = (str: string) => {
    if (str === "GW") {
      return "golden_week";
    } else if (str === "お盆") {
      return "obon";
    } else if (str === "年末年始") {
      return "the_new_years_holiday";
    } else {
      return "";
    }
  };

  type DATA = {
    periods: SpecialPeriodEditType[];
  };

  const buttonRef = useRef(false);

  const onSubmit = async (data: DATA) => {
    if (buttonRef.current) return;
    buttonRef.current = true;

    const periods = data.periods.map((periodParams: SpecialPeriodEditType) => {
      const convertNumberToDate: SpecialPeriodType = {
        period: convertStringToAlphabet(periodParams.period),
        start_date: `${periodParams.startDate}`,
        end_date: `${periodParams.endDate}`,
        id: periodParams.id,
      };
      return convertNumberToDate;
    });

    try {
      const hotelId = Cookies.get("_hotel_id") || id;
      const hotelDays = await getDays(hotelId);
      const specialDay: number = hotelDays.data?.days?.[6]?.id;

      await Promise.all([
        periods.forEach((periodParams: SpecialPeriodType) => {
          if (!periodParams.id) return;
          updateSpecialPeriod(periodParams, specialDay, periodParams.id);
        }),
      ]);
      router.reload();
    } catch (error: any) {
      console.log(error);
    } finally {
      buttonRef.current = false;
    }
  };

  return (
    <Layout title={`${name}の特別期間編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            className="tab tab-md md:tab-lg tab-bordered"
            href={`/hotels/${id}/edit`}
          >
            詳細
          </Link>
          <Link
            className="tab tab-md md:tab-lg tab-bordered"
            href={`/hotels/${id}/edit/rate`}
          >
            料金
          </Link>
          <div className="tab tab-md md:tab-lg tab-bordered tab-active">
            特別期間
          </div>
          <Link
            href={`/hotels/${id}/edit/facilities`}
            className="tab tab-md md:tab-lg tab-bordered"
          >
            設備
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 mb-5 font-bold text-xl underline">
          既存の特別期間を編集する
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>開始日時</th>
                <th>終了日時</th>
                <th></th>
              </tr>
            </thead>
            {fields.map((field, index) => (
              <tbody key={field.id}>
                <tr key={field.id}>
                  <th>{index + 1}</th>
                  <td>
                    <div>
                      <select
                        {...register(`periods.${index}.period`)}
                        className="select select-bordered select-sm max-w-xs"
                      >
                        <option disabled>特別期間を選択</option>
                        <option value="GW">GW</option>
                        <option value="お盆">お盆</option>
                        <option value="年末年始">年末年始</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        className="input input-bordered input-sm"
                        placeholder="(例) 20230101"
                        {...register(`periods.${index}.startDate`, {
                          required: true,
                          pattern:
                            /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        })}
                      />
                    </div>
                    {errors?.periods?.[index]?.startDate && (
                      <div className="text-red-600 text-ssm md:text-sm my-auto">
                        西暦4桁、月2桁、日2桁で入力してください。
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      <input
                        className="input input-bordered input-sm"
                        placeholder="(例) 20231230"
                        {...register(`periods.${index}.endDate`, {
                          required: true,
                          pattern:
                            /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        })}
                      />
                      {errors?.periods?.[index]?.endDate && (
                        <div className="text-red-600 text-ssm md:text-sm my-auto">
                          西暦4桁、月2桁、日2桁で入力してください。
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm m-auto"
                      onClick={(e) => removeSpecialPeriod(e, index, field)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <button className="btn btn-sm btn-primary ml-3 mt-3 mb-3" type="submit">
          特別期間を更新する
        </button>
      </form>
      <div className="mt-5 mb-5 font-bold text-xl underline">
        特別期間を新しく追加する
      </div>
      <SpecialPeriodForm id={id} />
    </Layout>
  );
};

export default SpecialPeriod;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail, currentUser, hotelDays] = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid,
          client: ctx.req.cookies._client,
          "access-token": ctx.req.cookies._access_token,
        },
      }),
      client.get(`/auth/sessions`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid,
          client: ctx.req.cookies._client,
          "access-token": ctx.req.cookies._access_token,
        },
      }),
      getDays(id),
    ]);

    const specialPeriodId = await hotelDays.data.days?.[6].id;
    console.log(specialPeriodId);

    const specialPeriodResponse = await client.get(
      `/days/${specialPeriodId}/special_periods`,
      {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid || "",
          client: ctx.req.cookies._client || "",
          "access-token": ctx.req.cookies._access_token || "",
        },
      }
    );

    if (!specialPeriodResponse.data.specialPeriods) {
      return {
        props: {
          ...hotelDetail.data.hotel,
          specialPeriod: [],
        },
      };
    }

    const specialPeriod = await specialPeriodResponse?.data?.specialPeriods;

    if (currentUser.data.data.id === hotelDetail.data.hotel.userId) {
      return {
        props: {
          ...hotelDetail.data.hotel,
          specialPeriod,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
