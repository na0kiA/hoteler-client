import React, { memo } from "react";
import Cookies from "js-cookie";
import { useFieldArray, useForm } from "react-hook-form";
import { createRestRate, createStayRate } from "lib/hotelRate";
import { getDays } from "lib/hotels";
import { HotelRateParams } from "types/types";
import { useRouter } from "next/router";

const HotelRateTable = memo(({ id }: any) => {
  const router = useRouter();
  const pathname = router.asPath;
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      rates: [
        {
          plan: "休憩90分",
          rate: 5980,
          start_time: 6,
          end_time: 23,
          day: "月曜から木曜",
          service: "",
        },
      ],
    },
  });
  const filedArrayName = "rates";

  const { fields, append, remove, replace, update } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const removeRestRate = (index: number) => {
    remove(index);
  };

  type DATA = {
    rates: ServiceParams[];
  };

  type ServiceParams = {
    plan: string;
    rate: number;
    start_time: number;
    end_time: number;
    day?: string | undefined;
    service?: string | undefined;
  };

  const onSubmit = async (data: DATA) => {
    const services = data.rates.map((service: ServiceParams) => {
      const converNumberToDate: HotelRateParams = {
        plan: service.plan,
        rate: service.rate,
        start_time: `${service.start_time}:00`,
        end_time: `${service.end_time}:00`,
        day: service.day,
        service: service.service,
      };
      return converNumberToDate;
    });

    try {
      const hotelId = Cookies.get("_hotel_id") || id;
      const hotelDays = await getDays(hotelId);

      await Promise.all([
        services.map((service: HotelRateParams) => {
          postServiceListByWeekdays(service, hotelDays.data);
        }),
      ]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const postServiceListByWeekdays = (
    service: HotelRateParams,
    hotelDays: any
  ) => {
    if (service.service == "休憩") {
      switch (service.day) {
        case "月曜から木曜":
          createRestRate(service, hotelDays[0].id);
          break;
        case "金曜":
          createRestRate(service, hotelDays[1].id);
          break;
        case "土曜":
          createRestRate(service, hotelDays[2].id);
          break;
        case "日曜":
          createRestRate(service, hotelDays[3].id);
          break;
        case "祝日":
          createRestRate(service, hotelDays[4].id);
          break;
        case "祝前日":
          createRestRate(service, hotelDays[5].id);
          break;
        case "特別期間":
          createRestRate(service, hotelDays[6].id);
          break;
        default:
          console.log("不一致");
      }
    } else {
      switch (service.day) {
        case "月曜から木曜":
          createStayRate(service, hotelDays[0].id);
          break;
        case "金曜":
          createStayRate(service, hotelDays[1].id);
          break;
        case "土曜":
          createStayRate(service, hotelDays[2].id);
          break;
        case "日曜":
          createStayRate(service, hotelDays[3].id);
          break;
        case "祝日":
          createStayRate(service, hotelDays[4].id);
          break;
        case "祝前日":
          createStayRate(service, hotelDays[5].id);
          break;
        case "特別期間":
          createStayRate(service, hotelDays[6].id);
          break;
        default:
          console.log("不一致");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                          {...register(`rates.${index}.start_time`, {
                            required: true,
                            min: 0,
                            max: 24,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.start_time && (
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
                          {...register(`rates.${index}.end_time`, {
                            required: true,
                            min: 0,
                            max: 24,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                      </div>
                      {errors.rates?.[index]?.end_time && (
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
          className="inline btn btn-sm "
          onClick={(e) => {
            append({
              plan: "休憩90分",
              rate: 0,
              start_time: 0,
              end_time: 24,
              day: "",
              service: "",
            });
          }}
        >
          プランを追加
        </button>
        <button
          disabled={!isDirty}
          className="btn btn-primary btn-sm mb-5 ml-3"
          type="submit"
          onClick={(e) => pathname.endsWith("/edit/rate") && router.reload()}
        >
          この内容で登録する
        </button>
      </form>
    </>
  );
});

export default HotelRateTable;
