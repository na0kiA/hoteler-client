import { useHotelFormStateContext } from "context/HotelFormProvider";
import { createRestRate } from "lib/hotelRate";
import { getDays } from "lib/hotels";
import React, { memo, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HotelRateParams } from "types/types";

const HotelRestRateTable = memo(() => {
  const { id, setId } = useHotelFormStateContext();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      rates: [{ plan: "", rate: 5980, startTime: 0, endTime: 24 }],
    },
  });
  const filedArrayName = "rates";

  const { fields, append, remove } = useFieldArray({
    control,
    name: filedArrayName,
  });

  const getFieldArray = getValues("rates");

  const generateEachParams = getFieldArray.map((service) => {
    const restRateParams: HotelRateParams = {
      plan: service.plan,
      rate: service.rate,
      startTime: `${service.startTime}:00`,
      endTime: `${service.endTime}:00`,
    };

    return restRateParams;
  });

  const handlePostRestRate = async () => {
    try {
      const hotelDays = await getDays(id);
      const mondayThroughThursday = hotelDays[0].id;
      const [postAllRestRate]: any = await Promise.all([
        generateEachParams.map((service) => {
          createRestRate(service, mondayThroughThursday);
        }),
      ]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit = (data: any) => console.log(data);

  const addRestRate = () => {
    append({ plan: "", rate: 0, startTime: 0, endTime: 24 });
  };

  const removeRestRate = (index: number) => {
    remove(index);
  };

  useEffect(() => {}, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>プラン名</th>
                <th>料金</th>
                <th>開始時刻</th>
                <th>終了時刻</th>
                <th></th>
              </tr>
            </thead>
            {fields.map((field, index) => (
              <>
                <tbody>
                  <tr>
                    <th>{index + 1}</th>
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
          <button className="btn" onClick={addRestRate}>
            休憩料金を追加
          </button>
          <button type="submit" disabled={!isDirty} className="btn btn-primary">
            登録
          </button>
        </div>
      </form>
    </>
  );
});
export default HotelRestRateTable;
