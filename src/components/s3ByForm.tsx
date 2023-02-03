import React from "react";
import { fetchSignedUrl } from "lib/image";

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
};
const parseXML = (text: string) =>
  new DOMParser().parseFromString(text, "application/xml");
