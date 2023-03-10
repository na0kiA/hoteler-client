import React, { useState } from "react";
import Image from "next/image";
import { useAuthStateContext } from "context/AuthProvider";
import { updateUserShow } from "lib/auth";
import { fetchSignedUrl } from "lib/image";
import { UpdateUserShowParams } from "types/types";
import { useRouter } from "next/router";

type UpdateUserProfileType = {
  name: string;
  image: string;
  uid: string;
};

const UpdateUserProfile = ({ name, image, uid }: UpdateUserProfileType) => {
  const router = useRouter();
  const forSliceImageKeyNumber = 59;
  const { currentUser } = useAuthStateContext();
  console.log("ユーザー詳細ページが呼ばれたよ");

  const [nameError, setNameError] = useState("");
  const [userName, setUserName] = useState<string>(name);
  const [userEmail] = useState<string>(uid);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [userImageKey, setUserImageKey] = useState(
    image.slice(forSliceImageKeyNumber)
  );
  const [imageUrl, setImageUrl] = useState("");

  const generateParams = () => {
    const editProfileParams: UpdateUserShowParams = {
      name: userName,
      email: userEmail,
      image: userImageKey,
    };
    return editProfileParams;
  };

  const handleUpdateUserProfile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const params = generateParams();

    try {
      await updateUserShow(params);
      setImageUrl("");
    } catch (error: any) {
      if (error.response.data) {
        setNameError(error.response.data.errors.name);
      } else {
        console.log(error.response);
      }
    }
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
    const resXML = parseXML(resText);
    const locationOfImage =
      resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
    if (!locationOfImage) return;
    const key = resXML.getElementsByTagName("Key")[0].childNodes[0].nodeValue;
    if (!key) return;

    setImageUrl(locationOfImage);
    setUserImageKey(key);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl pt-5">
      {editToggle ? (
        <>
          <Image
            src={image}
            alt="ユーザー画像"
            width={50}
            height={50}
            priority={true}
            className="rounded-full m-auto"
          />
          <input
            type="file"
            className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto mt-5"
            onChange={handleChangeImage}
          />
          {imageUrl && (
            <>
              <Image
                src={imageUrl}
                alt="ユーザー画像"
                width={50}
                height={50}
                className="rounded-full m-auto mt-3"
              />
            </>
          )}
        </>
      ) : (
        <>
          <Image
            src={`https://hoteler-image-list.s3.ap-northeast-1.amazonaws.com/${userImageKey}`}
            alt="ユーザー画像"
            width={50}
            height={50}
            priority={true}
            className="rounded-full m-auto"
          />
        </>
      )}
      <div className="card-body items-center text-center pt-1">
        <h2 className="card-title">
          {editToggle ? (
            <>
              <div className="form-control">
                <label className="label p-1">
                  <span className="label-text text-sm">名前</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full max-w-xs text-xs"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-2">
                {userName}
                {nameError && (
                  <p className="text-red-600 font-bold text-xs mt-3">
                    {nameError}
                  </p>
                )}
              </div>
            </>
          )}
        </h2>
        <div className="card-actions">
          {currentUser && currentUser.uid === uid ? (
            <>
              <div>
                <button
                  className="btn btn-primary btn-xs md:btn-sm   flex-none mr-2"
                  onClick={() => {
                    setEditToggle(!editToggle);
                  }}
                >
                  {editToggle ? "キャンセル" : "プロフィールを編集する"}
                </button>
              </div>
              {editToggle ? (
                <>
                  <button
                    className="btn btn-primary btn-xs md:btn-sm  flex-none"
                    onClick={(event) => {
                      handleUpdateUserProfile(event);
                      setNameError("");
                      setEditToggle(!editToggle);
                      router.reload();
                    }}
                  >
                    保存
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
