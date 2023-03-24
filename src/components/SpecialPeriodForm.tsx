import React from "react";
import { useRouter } from "next/router";
import { getDays } from "lib/hotels";
import { SpecialPeriodType } from "types/types";
import { useFieldArray, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { createSpecialPeriod } from "lib/specialPeriods";

type PROPS = {
  id?: number | string;
};

const SpecialPeriodForm = ({ id }: PROPS) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      periods: [{ period: "GW", start_date: "", end_date: "" }],
    },
  });

  const filedArrayName = "periods";

  const { fields, append, remove } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const removeRestRate = (index: number) => {
    remove(index);
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

  const onSubmit = async (data: DATA) => {
    const periods = data.periods.map((periodParams: SpecialPeriodType) => {
      const convertNumberToDate: SpecialPeriodType = {
        period: convertStringToAlphabet(periodParams.period),
        start_date: `${periodParams.start_date}`,
        end_date: `${periodParams.end_date}`,
        id: periodParams.id,
      };
      return convertNumberToDate;
    });

    try {
      const hotelId = Cookies.get("_hotel_id") || id;
      const hotelDays = await getDays(hotelId);
      const specialDay = hotelDays.data.days?.[6].id;

      await Promise.all([
        periods.forEach((periodParams: SpecialPeriodType) => {
          createSpecialPeriod(periodParams, specialDay);
        }),
      ]);
      router.push(`/hotels/register/facilities`);
    } catch (error: any) {
      console.log(error);
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
                        {...register(`periods.${index}.start_date`, {
                          required: true,
                          pattern:
                            /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        })}
                      />
                    </div>
                    {errors?.periods?.[index]?.start_date && (
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
                        {...register(`periods.${index}.end_date`, {
                          required: true,
                          pattern:
                            /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        })}
                      />
                      {errors?.periods?.[index]?.end_date && (
                        <div className="text-red-600 text-ssm md:text-sm my-auto">
                          西暦4桁、月2桁、日2桁で入力してください。
                        </div>
                      )}
                    </div>
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
            ))}
          </table>
        </div>
        <button
          className="inline btn btn-sm "
          onClick={(e) => {
            append({
              period: "GW",
              start_date: "",
              end_date: "",
            });
          }}
        >
          追加
        </button>
        <button className="btn btn-sm btn-primary ml-3 mt-3 mb-3" type="submit">
          特別期間を登録する
        </button>
      </form>
    </>
  );
};

export default SpecialPeriodForm;
