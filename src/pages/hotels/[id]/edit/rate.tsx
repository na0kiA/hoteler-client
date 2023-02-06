import HotelRateTable from "components/HotelRateTable";
import Layout from "components/Layout";
import client from "lib/client";
import { getServiceList, updateRestRate, updateStayRate } from "lib/hotelRate";
import { getDays } from "lib/hotels";
import Link from "next/link";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { HotelEditType, HotelRateParams } from "types/types";

const Rate = ({ name, id, serviceList }: HotelEditType) => {
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

  const removeRestRate = (index: number) => {
    remove(index);
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
          console.log(service);

          postServiceListByWeekdays(service, hotelDays.data);
        }),
      ]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const postServiceListByWeekdays = (
    service: UpdateServiceType,
    hotelDays: any
  ) => {
    if (service.service == "休憩") {
      switch (service.day) {
        case "月曜から木曜":
          updateRestRate(service, hotelDays[0].id, service.id);
          break;
        case "金曜":
          updateRestRate(service, hotelDays[1].id, service.id);
          break;
        case "土曜":
          updateRestRate(service, hotelDays[2].id, service.id);
          break;
        case "日曜":
          updateRestRate(service, hotelDays[3].id, service.id);
          break;
        case "祝日":
          updateRestRate(service, hotelDays[4].id, service.id);
          break;
        case "祝前日":
          updateRestRate(service, hotelDays[5].id, service.id);
          break;
        case "特別期間":
          updateRestRate(service, hotelDays[6].id, service.id);
          break;
        default:
          console.log("不一致");
      }
    } else {
      switch (service.day) {
        case "月曜から木曜":
          updateStayRate(service, hotelDays[0].id, service.id);
          break;
        case "金曜":
          updateStayRate(service, hotelDays[1].id, service.id);
          break;
        case "土曜":
          updateStayRate(service, hotelDays[2].id, service.id);
          break;
        case "日曜":
          updateStayRate(service, hotelDays[3].id, service.id);
          break;
        case "祝日":
          updateStayRate(service, hotelDays[4].id, service.id);
          break;
        case "祝前日":
          updateStayRate(service, hotelDays[5].id, service.id);
          break;
        case "特別期間":
          updateStayRate(service, hotelDays[6].id, service.id);
          break;
        default:
          console.log("不一致");
      }
    }
  };
  return (
    <Layout title={`${name}の料金編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            className="tab tab-md md:tab-lg tab-bordered tab-active"
            href={`/hotels/${id}/edit`}
          >
            詳細
          </Link>
          <div className="tab tab-md md:tab-lg tab-active">料金</div>
          <Link
            href={`/hotels/${id}/facilities`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            設備
          </Link>
        </div>
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
                        onClick={() => removeRestRate(index)}
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

export default Rate;

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
