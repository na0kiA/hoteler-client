import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import client from "lib/client";
import { postImageKeyOfHotel, updateFacilities } from "lib/hotels";
import { HotelFacilityType, HotelEditType } from "types/types";
import Layout from "components/Layout";
import { fetchSignedUrl } from "lib/image";

const Facilities = ({
  name,
  id,
  hotelFacilities,
  hotelImages,
}: HotelEditType) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      ...hotelFacilities,
    },
  });
  const hotelId = id.toString();

  const image = hotelImages ? hotelImages.map((image) => image.fileUrl) : [];

  // const image = hotelImages?.map((image) => {
  //   if (!image.fileUrl) return "";
  //   return image.fileUrl;
  // });

  const defaultKeyList = hotelImages
    ? hotelImages.map((image) => image.key)
    : [];

  // const defaultKeyList = hotelImages?.map((image) => {
  //   if (!image.key) return "";
  //   return image.key;
  // });

  const router = useRouter();
  const [keyList, setKeyList] = useState<string[]>(defaultKeyList);
  const [imageList, setImageList] = useState<string[]>(image);
  const maxImagesUpload = 10;
  const inputId = Math.random().toString(32).substring(2);

  const closeConfirmFlag = () => {
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 3000);
  };

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const res = await fetchSignedUrl();
    const S3DirectPost = await res.data;
    if (!event.target.files) return;
    const file: File = event.target.files[0];

    const fields = S3DirectPost.fields;
    const formData = new FormData();
    for (const key in fields) {
      formData.append(key, fields[key]);
    }
    formData.append("file", file);

    const ret = await fetch(S3DirectPost.url, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    });
    const resText = await ret.text();
    const parseXML = (text: string) =>
      new DOMParser().parseFromString(text, "application/xml");
    const resXML = await parseXML(resText);
    const locationOfImage =
      resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
    if (!locationOfImage) return;
    const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
      .nodeValue;
    if (!key) return;

    setImageList([...imageList, locationOfImage]);
    setKeyList([...keyList, key]);
  };

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList(newImages);

    const newKeyList = [...keyList];
    newKeyList.splice(index, 1);
    setKeyList(newKeyList);
  };

  const getFacilitiesValue = getValues();

  type FacilitiesKey = keyof typeof getFacilitiesValue;

  const buttonRef = useRef(false);

  const onSubmit = async (data: HotelFacilityType) => {
    if (buttonRef.current) return;
    buttonRef.current = true;

    try {
      const [results]: any = await Promise.all([
        postImageKeyOfHotel(hotelId, keyList),
        updateFacilities(hotelId, data),
      ]);
      if (results.status === 200) {
        closeConfirmFlag();
        router.push(`/hotels/${id}`);
      }
    } catch (error: any) {
      if (error.response.data) {
        setError(error.response.data);
      }
    } finally {
      buttonRef.current = false;
    }
  };

  const toggleOfFacilities = (label: string, value: FacilitiesKey) => {
    return (
      <div className="form-control w-3/4 md:w-1/4 m-auto">
        <label className="cursor-pointer label">
          <span className="label-text">{label}</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            {...register(value)}
          />
        </label>
      </div>
    );
  };

  return (
    <Layout title={`${name}の設備編集ページ`}>
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
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            href={`/hotels/${id}/edit`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            詳細
          </Link>
          <Link
            href={`/hotels/${id}/edit/rate`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            料金
          </Link>
          <Link
            href={`/hotels/${id}/edit/special-period`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            特別期間
          </Link>
          <div className="tab tab-md md:tab-lg tab-bordered tab-active">
            設備
          </div>
        </div>
      </div>
      <div className="form-control text-center mb-5 mt-5">
        <label className="label m-auto">
          <span className="text-xl font-bold underline">ホテル画像の設定</span>
        </label>
        {imageList &&
          imageList.map((item, i) => {
            return (
              <div key={i} className="mb-5 flex justify-center">
                <button
                  className="btn btn-square btn-outline btn-xs"
                  onClick={(e) => handleOnRemoveImage(i)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Image
                  className=""
                  src={item}
                  width={300}
                  height={300}
                  alt="ホテル画像"
                  priority={true}
                />
              </div>
            );
          })}
        <label htmlFor={inputId}>
          {imageList.length >= 1 && (
            <>
              <span className="align-bottom">
                画像を追加選択できます。画像は最大10枚です。
              </span>
            </>
          )}
          <input
            id={inputId}
            type="file"
            disabled={imageList.length >= maxImagesUpload}
            className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto ml-1"
            multiple
            onChange={(e) => handleChangeImage(e)}
          />
        </label>
      </div>
      <div className="text-center p-10">
        <div className="text-xl font-bold mb-1 underline">ホテル設備の設定</div>
        {error && (
          <div className="text-red-600 text-ssm md:text-sm my-auto">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {toggleOfFacilities("WiFiの有無", "wifiEnabled")}
          {toggleOfFacilities("駐車場の有無", "parkingEnabled")}
          {toggleOfFacilities(
            "クレジットカードの利用可否",
            "creditCardEnabled"
          )}
          {toggleOfFacilities("電話予約の可否", "phoneReservationEnabled")}
          {toggleOfFacilities("ネット予約の可否", "netReservationEnabled")}
          {toggleOfFacilities("3人以上の利用の可否", "tripleRoomsEnabled")}
          {toggleOfFacilities("料理の提供の有無", "cookingEnabled")}
          {toggleOfFacilities("朝食の提供の有無", "breakfastEnabled")}
          {toggleOfFacilities("クーポンの有無", "couponEnabled")}
          {toggleOfFacilities(
            "フロントと会わずに精算ができる",
            "secretPaymentEnabled"
          )}
          <div className="mt-5">
            <button type="submit" className="btn btn-primary">
              編集を完了する
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Facilities;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;
  try {
    const [hotelDetail, currentUser]: any = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid,
          client: ctx.req.cookies._client,
          "access-token": ctx.req.cookies._access_token,
        },
      }),
      client.get(`/auth/sessions`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid,
          client: ctx.req.cookies._client,
          "access-token": ctx.req.cookies._access_token,
        },
      }),
    ]);
    console.log(hotelDetail);

    if (currentUser.data.data.id === hotelDetail.data.hotel.userId) {
      return {
        props: {
          ...hotelDetail.data.hotel,
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
