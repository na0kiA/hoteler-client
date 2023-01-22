import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { createHotel } from "lib/hotels";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { HotelCreateType } from "types/types";

const HotelRateInput = memo(() => {
  console.log("FormInputがレンダリングされました");
  const { name, setName, invalidName, setInvalidName } =
    useHotelFormStateContext();

  const router = useRouter();

  const inputForm = (
    labelText: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    errorValue = ""
  ) => {
    return (
      <>
        <div className="form-control">
          <label className="label">
            <span className="label-text">{labelText}</span>
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input input-bordered"
          />
          {errorText(errorValue)}
        </div>
      </>
    );
  };

  const errorText = (text: string) => {
    return (
      <>
        {text && <p className="text-red-600 text-sm md:text-sm mt-2">{text}</p>}
      </>
    );
  };

  const generateParams = () => {
    const createHotelParams = {
      name: name,
    };
    return createHotelParams;
  };

  const handleCreateRestRate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res: HotelCreateType = await createHotel(params);
      router.push("/hotels/register/price");
    } catch (error: any) {
      if (error.response.data) {
        console.log(error);

        setInvalidName(error.response.data.name);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ul className="steps steps-horizontal flex justify-center text-lg">
        <li className="step step-primary">
          <span className="text-xs">詳細設定</span>
        </li>
        <li className="step">
          <span className="text-xs">料金設定</span>
        </li>
        <li className="step">
          <span className="text-xs">設備設定</span>
        </li>
        <li className="step">
          <span className="text-xs">仮登録</span>
        </li>
      </ul>
      <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          {inputForm("ホテル名", name, setName, invalidName)}
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleCreateRestRate(e);
                handleCreateStayRate(e);
              }}
            >
              次に進む
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default HotelRateInput;
