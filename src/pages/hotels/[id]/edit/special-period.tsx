import React, { useState } from "react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import HotelRateTable from "components/HotelRateTable";
import Layout from "components/Layout";
import client from "lib/client";
import { deleteRestRate, deleteStayRate, getServiceList } from "lib/hotelRate";
import { getDays } from "lib/hotels";
import { HotelEditType, HotelRateParams } from "types/types";

const SpecialPeriod = ({ name, id, serviceList }: HotelEditType) => {
  const [flag, setFlag] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      rates: serviceList,
    },
  });
  const filedArrayName = "rates";

  const { fields, remove } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const closeConfirmFlag = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 5000);
  };

  const removeRestRate = async (index: number, field: any) => {
    try {
      if (field.service == "休憩") {
        await deleteRestRate(field.serviceId, field.dayId);
      } else {
        await deleteStayRate(field.serviceId, field.dayId);
      }
      remove(index);
    } catch (error: any) {
      console.log(error);
    }
  };

  type UpdateServiceType = HotelRateParams & { id: number };

  const onSubmit = async (data: any) => {
    const services = data.rates.map((service: any) => {
      const converNumberToDate: UpdateServiceType = {
        plan: service.plan,
        rate: service.rate,
        start_time: `${service.startTime}:00`,
        end_time: `${service.endTime}:00`,
        day: service.day,
        service: service.service,
        id: service.id,
      };
      return converNumberToDate;
    });

    try {
      const hotelDays = await getDays(id);

      await Promise.all([
        services.map((service: UpdateServiceType) => {
          updateServiceListByWeekdays(service, hotelDays.data);
        }),
      ]);

      closeConfirmFlag();
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateServiceListByWeekdays = (
    service: UpdateServiceType,
    hotelDays: any
  ) => {};

  return (
    <Layout title={`${name}の料金編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            className="tab tab-md md:tab-lg tab-bordered"
            href={`/hotels/${id}/edit`}
          >
            詳細
          </Link>
          <Link
            href={`/hotels/${id}/rate`}
            className="tab tab-md md:tab-lg tab-bordered"
          >
            料金
          </Link>
          <div className="tab tab-md md:tab-lg tab-bordered  tab-active">
            特別期間
          </div>
          <Link
            href={`/hotels/${id}/edit/facilities`}
            className="tab tab-md md:tab-lg tab-bordered"
          >
            設備
          </Link>
        </div>
        {flag ? (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <div>
                <span>編集が完了しました。</span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="mb-5 font-bold text-xl underline">
          既存の料金を編集する
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>曜日</th>
                <th>サービス</th>
                <th>プラン名</th>
                <th>料金</th>
                <th>開始時刻</th>
                <th>終了時刻</th>
                <th></th>
              </tr>
            </thead>
            {fields.map((field, index) => (
              <>
                <tbody key={field.id}>
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div>
                        <select
                          {...register(`rates.${index}.day`)}
                          className="select select-bordered select-sm max-w-xs"
                        >
                          <option disabled selected>
                            曜日を選択
                          </option>
                          <option value="月曜から木曜">月曜から木曜</option>
                          <option value="金曜">金曜</option>
                          <option value="土曜">土曜</option>
                          <option value="日曜">日曜</option>
                          <option value="祝日">祝日</option>
                          <option value="祝前日">祝前日</option>
                          <option value="特別期間">特別期間</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <select
                        {...register(`rates.${index}.service`)}
                        className="select select-bordered select-sm max-w-xs"
                      >
                        <option disabled selected>
                          サービスを選択
                        </option>
                        <option value="休憩">休憩</option>
                        <option value="宿泊">宿泊</option>
                      </select>
                    </td>
                    <td>
                      <div>
                        <input
                          key={field.id}
                          type="text"
                          className="input input-bordered input-sm"
                          {...register(`rates.${index}.plan`, {
                            required: "必須項目です",
                            maxLength: 10,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.plan && (
                        <div className="text-red-600 text-ssm md:text-sm my-auto">
                          プラン名は10文字以下で入力してください。
                        </div>
                      )}
                    </td>
                    <td>
                      <div>
                        <input
                          key={field.id}
                          type="text"
                          className="input input-bordered input-sm"
                          {...register(`rates.${index}.rate`, {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.rate && (
                        <span className="text-red-600 text-ssm md:text-sm mt-2">
                          半角数字で入力してください。
                        </span>
                      )}
                    </td>
                    <td>
                      <div>
                        <input
                          key={field.id}
                          className="input input-bordered input-sm"
                          {...register(`rates.${index}.startTime`, {
                            required: true,
                            min: 0,
                            max: 24,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.startTime && (
                        <span className="text-red-600 text-ssm md:text-sm mt-2">
                          0時から24時の半角数字で入力してください。
                        </span>
                      )}
                    </td>
                    <td>
                      <div>
                        <input
                          key={field.id}
                          className="input input-bordered input-sm"
                          {...register(`rates.${index}.endTime`, {
                            required: true,
                            min: 0,
                            max: 24,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.endTime && (
                        <span className="text-red-600 text-ssm md:text-sm mt-2">
                          0時から24時の半角数字で入力してください。
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm m-auto"
                        onClick={(e) => removeRestRate(index, field)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
        <button
          disabled={!isDirty}
          className="btn btn-primary btn-sm mb-5"
          type="submit"
        >
          編集を完了する
        </button>
      </form>
      <div className="mt-5 mb-5 font-bold text-xl underline">
        料金を新しく追加する
      </div>
      <HotelRateTable id={id} />
    </Layout>
  );
};

export default SpecialPeriod;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const hotelDetail = await client.get(`/hotels/${id}`, {
      headers: {
        "Content-Type": "application/json",
        uid: ctx.req.cookies["_uid"],
        client: ctx.req.cookies["_client"],
        "access-token": ctx.req.cookies["_access_token"],
      },
    });
    console.log(hotelDetail);

    if (hotelDetail.data) {
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
