import React, { memo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createHotel, updateHotel } from "lib/hotels";
import { HotelEditFormType, HotelUpdateType } from "types/types";
import { useForm, useFormState } from "react-hook-form";
import Cookies from "js-cookie";

const HotelFormInput = memo(function hotelFormInput({
  name,
  content,
  company,
  city,
  prefecture,
  postalCode,
  streetAddress,
  phoneNumber,
  id,
}: HotelEditFormType) {
  console.log("FormInputがレンダリングされました");
  const [flag, setFlag] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<string>("");
  const [, setInvalidContent] = useState<string>("");
  const [invalidCompany, setInvalidCompany] = useState<string>("");
  const [invalidPrefecture, setInvalidPrefecture] = useState<string>("");
  const [invalidCity, setInvalidCity] = useState<string>("");
  const [invalidPostalCode, setInvalidPostalCode] = useState<string>("");
  const [invalidStreetAddress, setInvalidStreetAddress] = useState<string>("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState<string>("");
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const router = useRouter();
  const pathname = router.asPath;

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
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
      notification: { message: "" },
    },
  });
  const { dirtyFields } = useFormState({
    control,
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
        {text && <p className="text-red-600 text-sm md:text-sm mt-2">{text}</p>}
      </>
    );
  };

  const closeConfirmFlag = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  };
  const buttonRef = useRef(false);

  const onSubmit = async (data: HotelEditFormType | HotelUpdateType) => {
    if (buttonRef.current) return;
    buttonRef.current = true;
    try {
      if (pathname.startsWith("/hotels/register")) {
        const res = await createHotel(data);
        if (res.status === 200) {
          Cookies.set("_hotel_id", res.data.id);
          router.push(`/hotels/register/price`);
        }
      } else {
        if (data.notification?.message && id) {
          const res = await updateHotel(id, data);
          console.log(res);

          if (res.status === 200) {
            closeConfirmFlag();
          }
        }
      }
    } catch (error: any) {
      if (error.response.data) {
        setInvalidMessage(error.response.data.message);
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
    } finally {
      buttonRef.current = false;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
          <div className="card-body">
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
            {pathname.startsWith("/hotels/register") ? (
              <></>
            ) : (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-bold">
                      更新メッセージ
                    </span>
                  </label>
                  <span className="text-sm mb-3">
                    (お気に入り登録しているユーザーに送信されます)
                  </span>
                  <input
                    type="text"
                    id="notification.message"
                    className="input input-bordered input-sm"
                    {...register("notification.message", {
                      required: "必須項目です",
                    })}
                  />
                </div>
              </>
            )}
            {errorText(invalidMessage)}
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
                  rows={20}
                  wrap="soft"
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
                  pathname.startsWith("/hotels/register") &&
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
                  setInvalidMessage("");
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
                {pathname.startsWith("/hotels/register")
                  ? "次に進む"
                  : "更新する"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default HotelFormInput;
