import Image from "next/image";
import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { createHotel } from "lib/hotels";
import { fetchSignedUrl } from "lib/image";
import { useRouter } from "next/router";
import React, { memo, useContext, useState } from "react";
import { HotelCreateType } from "types/types";

const HotelUploadImages = memo(() => {
  console.log("FormInputがレンダリングされました");
  const [isCommentSending, setIsCommentSending] = useState(false);
  const [keyList, setKeyList] = useState<string[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const maxImagesUpload = 4;
  const [commentText, setCommentText] = useState<string>("");
  const inputId = Math.random().toString(32).substring(2);

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

    // setImageList([locationOfImage]);
    setImageList([...imageList, locationOfImage]);
    setKeyList([...keyList, key]);
  };

  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageList([...imageList, ...e.target.files]);
  };

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList(newImages);
  };
  console.log(imageList);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">ホテル画像</span>
        </label>
        {imageList &&
          imageList.map((item, i) => {
            return (
              <div key={i} className="mb-5 flex">
                <button
                  className="btn btn-square btn-outline"
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
                  width={100}
                  height={100}
                  alt="ホテル画像"
                />
              </div>
            );
          })}
        <label htmlFor={inputId}>
          {imageList.length >= 1 && (
            <>
              <>画像を追加できます</>
              <>画像は最大10枚までです</>
            </>
          )}
          <input
            id={inputId}
            type="file"
            disabled={imageList.length >= maxImagesUpload}
            className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto"
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeImage(e)
            }
          />
        </label>
      </div>
    </>
  );
});

export default HotelUploadImages;
