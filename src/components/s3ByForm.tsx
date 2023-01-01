// import { postImageKeyOfHotel } from "lib/post";
import React, { useState } from "react";

const OnUploadImage: React.FC<any> = ({ locationOfImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/images`);
    const S3DirectPost = await res.json();
    if (!event.target.files) return;
    const file: File = event.target.files[0];

    const fields = S3DirectPost.fields;
    const formData = new FormData();
    for (const key in fields) {
      formData.append(key, fields[key]);
    }
    formData.append("file", file);
    // console.log(formData);

    const ret = await fetch(S3DirectPost.url, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    });
    console.log(ret);
    // https://hoteler-image.s3.ap-northeast-1.amazonaws.com

    const resText = await ret.text();
    // console.log(resText);

    const resXML = await parseXML(resText);
    // console.log(resXML);

    const locationOfImage =
      resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
    if (!locationOfImage) return;
    setImageUrl(locationOfImage);

    const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
      .nodeValue;
    if (!key) return;
    const hotelKey: any = {
      key,
    };
    console.log(hotelKey);
    // postImageKeyOfHotel(hotelKey);
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <img src={imageUrl} className="h-32 m-4" />
    </>
  );
};
const parseXML = (text: string) =>
  new DOMParser().parseFromString(text, "application/xml");

export default OnUploadImage;
