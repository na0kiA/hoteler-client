import React, { useState } from "react";
import { updateUserShow } from "lib/auth";
import { fetchSignedUrl } from "lib/image";

// export const OnUploadImage = ({ name, email, image }: any) => {
// const [imageUrl, setImageUrl] = useState("");
// const [error, setError] = useState("");
export const handleChangeImage = async (
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

  const resXML = await parseXML(resText);

  const locationOfImage =
    resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
  if (!locationOfImage) return;
  // setImageUrl(locationOfImage);

  console.log(locationOfImage);

  const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
    .nodeValue;
  if (!key) return;
  console.log(key);
  return key;

  // const generateParams = () => {
  //   const editProfileParams: updateUserShowParams = {
  //     name: name,
  //     email: email,
  //     image: key,
  //   };
  //   return editProfileParams;
  // };
  // console.log(name);
  // console.log(email);
  // console.log(key);

  // const params = generateParams();
  // const postResponse = await updateUserShow(params);

  // try {
  //   if (postResponse.status == 200) {
  //     console.log("画像投稿に成功");
  //   } else {
  //     throw new Error(
  //       "アカウント編集に失敗しました。画面をご確認の上もう一度実行してください。"
  //     );
  //   }
  // } catch (error: any) {
  //   console.log(error);
  //   if (error?.response.data) {
  //     setError(error.response.data.errors);
  //   } else {
  //     console.log(error);
  //   }
  // }
};

// return (
//   <>
//     <input
//       type="file"
//       className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto mt-3"
//       onChange={handleChangeImage}
//     />
//     {error && (
//       <p className="whitespace-pre-wrap mt-5 text-red-600">{error}</p>
//     )}
//   </>
// );
// };
const parseXML = (text: string) =>
  new DOMParser().parseFromString(text, "application/xml");

// export default OnUploadImage;
