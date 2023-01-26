import { useAuthStateContext } from "context/AuthProvider";
import { useHotelFormStateContext } from "context/HotelFormProvider";
import Cookies from "js-cookie";
import { createRestRate } from "lib/hotelRate";
import { getDays } from "lib/hotels";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HotelRateParams } from "types/types";

const HotelRestRateTable = memo(() => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      rates: [
        {
          plan: "休憩90分",
          rate: 5980,
          start_time: 3,
          end_time: 21,
          day: "月曜から木曜",
        },
      ],
    },
  });
  const filedArrayName = "rates";

  const { fields, append, remove } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const getFieldArray = getValues("rates");

  const generateEachParams = getFieldArray.map((service) => {
    console.log(service);

    const restRateParams: HotelRateParams = {
      plan: service.plan,
      rate: service.rate,
      start_time: `${service.start_time}:00`,
      end_time: `${service.end_time}:00`,
      day: service.day,
    };

    return restRateParams;
  });

  const handleCreateRestRates = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const hotelId = Cookies.get("_hotel_id");
      const hotelDays = await getDays(hotelId);
      const mondayThroughThursday = hotelDays.data?.[0].id;
      const friday = hotelDays.data?.[1].id;
      await Promise.all([
        generateEachParams.map((service) => {
          if (service.day == "月曜から木曜") {
            createRestRate(service, mondayThroughThursday);
          } else if (service.day == "金曜") {
            createRestRate(service, friday);
          }
        }),
      ]);
      // console.log([postAllRestRate]);

      // if (postAllRestRate.status == 200) {
      //   router.push("/hotels/register/facilities");
      // }
    } catch (error: any) {
      console.log(error);
    }
  };

  const addRestRate = () => {
    append({ plan: "", rate: 0, start_time: 0, end_time: 24, day: "" });
  };

  const removeRestRate = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>曜日</th>
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
                          className="select w-full max-w-xs"
                        >
                          <option disabled selected>
                            曜日を選択
                          </option>
                          <option value="月曜から木曜">月曜から木曜</option>
                          <option value="金曜">金曜</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          key={field.id}
                          type="text"
                          className="input input-bordered input-sm md:input-md"
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
          <button className="btn" onClick={addRestRate}>
            休憩料金を追加
          </button>
          <button
            disabled={!isDirty}
            className="btn btn-primary"
            onClick={(e) => handleCreateRestRates(e)}
          >
            登録
          </button>
        </div>
      </form>
    </>
  );
});

export default HotelRestRateTable;
