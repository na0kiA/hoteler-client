import React, { memo, useContext, useState } from "react";
import { useRouter } from "next/router";

import { createHotel } from "lib/hotels";
import { HotelCreateType } from "types/types";
import { useForm, useFormState } from "react-hook-form";
import Cookies from "js-cookie";

const HotelFormInput = memo(
  ({
    name,
    content,
    company,
    city,
    prefecture,
    postalCode,
    streetAddress,
    phoneNumber,
  }: any) => {
    console.log("FormInputがレンダリングされました");
    const [invalidName, setInvalidName] = useState("");
    const [invalidContent, setInvalidContent] = useState("");
    const [invalidCompany, setInvalidCompany] = useState("");
    const [invalidPrefecture, setInvalidPrefecture] = useState("");
    const [invalidCity, setInvalidCity] = useState("");
    const [invalidPostalCode, setInvalidPostalCode] = useState("");
    const [invalidStreetAddress, setInvalidStreetAddress] = useState("");
    const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
    const router = useRouter();
    const {
      register,
      handleSubmit,
      getValues,
      control,
      formState: { errors, isDirty },
    } = useForm({
      defaultValues: {
        name: "" || name,
        content: "" || content,
        company: "" || company,
        prefecture: "" || prefecture,
        city: "" || city,
        postalCode: "" || postalCode,
        streetAddress: "" || streetAddress,
        phoneNumber: "" || phoneNumber,
      },
    });
    const { dirtyFields } = useFormState({
      control,
    });

    const getHotelFormValue = getValues();

    type HotelFormKeys = keyof typeof getHotelFormValue;
    console.log(errors.content?.message);

    const inputForm = (
      labelText: string,
      value: HotelFormKeys,
      errorValue = ""
    ) => {
      return (
        <>
          <div className="form-control">
            <>
              <label className="label">
                <span className="label-text text-sm">{labelText}</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-sm"
                {...register(value, {
                  required: "必須項目です",
                })}
              />
              {errors?.[value] && errors?.[value]?.message}
            </>
          </div>
          {errorText(errorValue)}
        </>
      );
    };

    const errorText = (text: string) => {
      return (
        <>
          {text && (
            <p className="text-red-600 text-sm md:text-sm mt-2">{text}</p>
          )}
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
          <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
            <div className="card-body">
              {inputForm("ホテル名", "name", invalidName)}
              {inputForm("会社", "company", invalidCompany)}
              {inputForm("ホテルの電話番号", "phoneNumber", invalidPhoneNumber)}
              {inputForm("都道府県", "prefecture", invalidPrefecture)}
              {inputForm("市区町村", "city", invalidCity)}
              {inputForm("番地", "streetAddress", invalidStreetAddress)}
              {inputForm("郵便番号", "postalCode", invalidPostalCode)}
              <div className="form-control">
                <>
                  <label className="label">
                    <span className="label-text">ホテルの説明</span>
                  </label>
                  <textarea
                    rows={30}
                    className="textarea textarea-lg	textarea-bordered w-full  text-xs"
                    {...register("content", {
                      required: "コンテンツは10文字以上入力してください",
                    })}
                  ></textarea>
                  {errors.content?.message && errors.content.message}
                </>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={
                    !(
                      dirtyFields.name &&
                      dirtyFields.city &&
                      dirtyFields.company &&
                      dirtyFields.content &&
                      dirtyFields.phoneNumber &&
                      dirtyFields.postalCode &&
                      dirtyFields.prefecture &&
                      dirtyFields.streetAddress
                    )
                  }
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
  }
);

export default HotelFormInput;
