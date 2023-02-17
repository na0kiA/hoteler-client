import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import client from "lib/client";
import { getDays } from "lib/hotels";
import { SpecialPeriodEditType, SpecialPeriodType } from "types/types";
import { deleteSpecialPeriod, updateSpecialPeriod } from "lib/specialPeriods";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Layout from "components/Layout";
import SpecialPeriodForm from "components/SpecialPeriodForm";

type PROPS = {
  name: string;
  id: string;
  specialPeriod: SpecialPeriodEditType[];
};

const SpecialPeriod = ({ name, id, specialPeriod }: PROPS) => {
  const [flag, setFlag] = useState<boolean>(false);
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
      console.log(field);
      const res = await deleteSpecialPeriod(field.dayId, field.serviceId);
      console.log(res);

      if (res.status === 200) {
        remove(index);
      }
    } catch (error) {
      console.log(error);
    }
  };

  type DATA = {
    periods: SpecialPeriodType[];
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

  const closeConfirmFlag = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 5000);
  };

  const onSubmit = async (data: DATA) => {
    console.log(data.periods);

    const periods = data.periods.map((periodParams: any) => {
      console.log(typeof periodParams);

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
      const specialDay: number = hotelDays.data?.[6]?.id;

      await Promise.all([
        periods.map((periodParams: SpecialPeriodType) => {
          if (!periodParams.id) return;
          updateSpecialPeriod(periodParams, specialDay, periodParams.id);
        }),
      ]);
      closeConfirmFlag();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout title={`${name}の特別期間編集ページ`}>
      {flag ? (
        <div className="toast toast-middle toast-end">
          <div className="alert alert-success">
            <div>
              <span>編集が完了しました。</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
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
      getDays(id),
    ]);
    const specialPeriodId = await hotelDays.data?.[6]?.id;
    const specialPeriodResponse = await client.get(
      `/days/${specialPeriodId}/special_periods`,
      {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }
    );

    const specialPeriod = await specialPeriodResponse?.data;
    console.log(specialPeriod);

    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
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
