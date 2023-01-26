import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { createHotel } from "lib/hotels";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { HotelCreateType } from "types/types";
import { useForm } from "react-hook-form";
import { useAuthStateContext } from "context/AuthProvider";
import Cookies from "js-cookie";

const HotelFormInput = memo(() => {
  console.log("FormInputがレンダリングされました");
  const [invalidName, setInvalidName] = useState("");
  const [invalidContent, setInvalidContent] = useState("");
  const [invalidCompany, setInvalidCompany] = useState("");
  const [invalidPrefecture, setInvalidPrefecture] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidPostalCode, setInvalidPostalCode] = useState("");
  const [invalidStreetAddress, setInvalidStreetAddress] = useState("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const { id, setId } = useAuthStateContext();
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "",
      content: "",
      company: "",
      prefecture: "",
      city: "",
      postalCode: "",
      streetAddress: "",
      phoneNumber: "",
    },
  });

  const getHotelFormValue = getValues();

  type HotelFormKeys = keyof typeof getHotelFormValue;

  const inputForm = (
    labelText: string,
    value: HotelFormKeys,
    errorValue = ""
  ) => {
    return (
      <>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm">{labelText}</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm"
            {...register(value, {
              required: true,
              // required: "必須項目です",
            })}
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

  const onSubmit = async (data: HotelCreateType) => {
    try {
      const res = await createHotel(data);
      console.log(res);
      if (res.status == 200) {
        Cookies.set("_hotel_id", res.data.id);
        router.push(`/hotels/register/price`);
      }
    } catch (error: any) {
      if (error.response.data) {
        setInvalidName(error.response.data.name);
        setInvalidContent(error.response.data.content);
        setInvalidCompany(error.response.data.company);
        setInvalidPhoneNumber(error.response.data.phone_number);
        setInvalidPostalCode(error.response.data.postal_code);
        setInvalidPrefecture(error.response.data.prefecture);
        setInvalidCity(error.response.data.city);
        setInvalidStreetAddress(error.response.data.street_address);
      } else {
        console.log(error);
      }
    }
  };

  console.log(getHotelFormValue);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {inputForm("ホテル名", "name", invalidName)}
            {inputForm("会社", "company", invalidCompany)}
            {inputForm("ホテルの電話番号", "phoneNumber", invalidPhoneNumber)}
            {inputForm("都道府県", "prefecture", invalidPrefecture)}
            {inputForm("市区町村", "city", invalidCity)}
            {inputForm("番地", "streetAddress", invalidStreetAddress)}
            {inputForm("郵便番号", "postalCode", invalidPostalCode)}
            <div className="form-control">
              <label className="label">
                <span className="label-text">ホテルの説明</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full max-h-full text-xs"
                {...register("content", { required: true })}
              ></textarea>
              {errorText(invalidContent)}
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={(e) => {
                  setInvalidName("");
                  setInvalidContent("");
                  setInvalidCompany("");
                  setInvalidPhoneNumber("");
                  setInvalidPostalCode("");
                  setInvalidPrefecture("");
                  setInvalidCity("");
                  setInvalidStreetAddress("");
                }}
              >
                次に進む
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default HotelFormInput;
