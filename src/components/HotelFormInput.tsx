import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { createHotel } from "lib/hotels";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { HotelCreateType } from "types/types";
import HotelUploadImages from "./HotelUploadImages";

const HotelFormInput = memo(() => {
  console.log("FormInputがレンダリングされました");
  const {
    id,
    setId,
    name,
    setName,
    invalidName,
    setInvalidName,
    content,
    setContent,
    invalidContent,
    setInvalidContent,
    company,
    setCompany,
    invalidCompany,
    setInvalidCompany,
    prefecture,
    setPrefecture,
    invalidPrefecture,
    setInvalidPrefecture,
    city,
    setCity,
    invalidCity,
    setInvalidCity,
    streetAddress,
    setStreetAddress,
    invalidStreetAddress,
    setInvalidStreetAddress,
    phoneNumber,
    setPhoneNumber,
    invalidPhoneNumber,
    setInvalidPhoneNumber,
    postalCode,
    setPostalCode,
    invalidPostalCode,
    setInvalidPostalCode,
  } = useHotelFormStateContext();

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
            <span className="label-text text-sm">{labelText}</span>
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input input-bordered input-sm"
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
      content: content,
      company: company,
      prefecture: prefecture,
      phone_number: phoneNumber,
      city: city,
      postal_code: postalCode,
      street_address: streetAddress,
    };
    return createHotelParams;
  };

  const handleCreateHotel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params: HotelCreateType = generateParams();

    try {
      const res = await createHotel(params);
      console.log(res.data.id);

      setId(res.data.id);
      router.push("/hotels/register/price");
    } catch (error: any) {
      if (error.response.data) {
        console.log(error);

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

  return (
    <>
      <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          {inputForm("ホテル名", name, setName, invalidName)}
          {inputForm("会社", company, setCompany, invalidCompany)}
          {inputForm(
            "ホテルの電話番号",
            phoneNumber,
            setPhoneNumber,
            invalidPhoneNumber
          )}
          {inputForm("都道府県", prefecture, setPrefecture, invalidPrefecture)}
          {inputForm("市区町村", city, setCity, invalidCity)}
          {inputForm(
            "番地",
            streetAddress,
            setStreetAddress,
            invalidStreetAddress
          )}
          {inputForm("郵便番号", postalCode, setPostalCode, invalidPostalCode)}
          <div className="form-control">
            <label className="label">
              <span className="label-text">ホテルの説明</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full max-h-full text-xs"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
            {errorText(invalidContent)}
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleCreateHotel(e);
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
    </>
  );
});

export default HotelFormInput;
