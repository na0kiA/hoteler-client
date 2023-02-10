import React, { memo, useState } from "react";
import Image from "next/image";
import { useHotelFormStateContext } from "context/HotelFormProvider";
import { fetchSignedUrl } from "lib/image";
import { useRouter } from "next/router";
import { HotelImagesType } from "types/types";

const HotelUploadImages = memo(({ imageUrl = [], keys = [] }: any) => {
  console.log("FormInputがレンダリングされました");

  const router = useRouter();
  const { setKeys } = useHotelFormStateContext();
  const [keyList, setKeyList] = useState<string[]>([...keys]);
  const [imageList, setImageList] = useState<string[]>([...imageUrl]);
  const maxImagesUpload = 10;
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

    setImageList([...imageList, locationOfImage]);
    setKeyList([...keyList, key]);
    setKeys([...keyList, key]);
  };

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...imageList];
    newImages.splice(index, 1);
    setImageList(newImages);

    const newKeyList = [...keyList];
    newKeyList.splice(index, 1);
    setKeyList(newKeyList);
    setKeys(newKeyList);
  };

  return (
    <>
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
