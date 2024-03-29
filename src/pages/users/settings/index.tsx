import { useAuthStateContext } from "context/AuthProvider";
import { updateUserShow } from "lib/auth";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "components/Layout";
import Image from "next/image";
import { fetchSignedUrl } from "lib/image";
import { UpdateUserShowParams, UserDetailType } from "types/types";
import client from "lib/client";

const Home = ({
  name,
  image,
  uid,
  hasHotel,
}: UserDetailType & { hasHotel: boolean }) => {
  const { currentUser } = useAuthStateContext();
  const [nameError, setNameError] = useState("");
  const [userName, setUserName] = useState<string>(name);
  const [userEmail] = useState<string>(uid);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [userImageKey, setUserImageKey] = useState(image);
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
    const resXML = await parseXML(resText);
    const locationOfImage =
      resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
    if (!locationOfImage) return;
    const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
      .nodeValue;
    if (!key) return;

    setImageUrl(locationOfImage);
    setUserImageKey(key);
  };

  return (
    <Layout title={"設定"}>
      <div className="card w-full bg-base-100 shadow-xl pt-5">
        {editToggle ? (
          <>
            <div className="avatar m-auto">
              <div className="w-14 md:w-20 rounded-full">
                <Image
                  src={`https://hoteler-image-list.s3.ap-northeast-1.amazonaws.com/${image}`}
                  alt="アバター"
                  width={600}
                  height={600}
                  priority={true}
                />
              </div>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto mt-5"
              onChange={handleChangeImage}
            />
            {imageUrl && (
              <div className="avatar m-auto">
                <div className="w-14 md:w-20 rounded-full">
                  <Image
                    src={imageUrl}
                    alt="アバター"
                    width={600}
                    height={600}
                    priority={true}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="avatar m-auto">
              <div className="w-14 md:w-20 rounded-full">
                <Image
                  src={`https://hoteler-image-list.s3.ap-northeast-1.amazonaws.com/${userImageKey}`}
                  alt="アバター"
                  width={600}
                  height={600}
                  priority={true}
                />
              </div>
            </div>
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
                    <p className="text-red-600 font-bold text-xs">
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
      <div className="m-auto bg-base-200 text-center">
        <ul className="menu w-2/3 p-2 rounded-box underline">
          <li>
            <Link
              className="link text-lg"
              href={`/users/${currentUser && currentUser.id}`}
            >
              公開プロフィール
            </Link>
          </li>
          <li>
            <Link
              className="link text-lg"
              href={`/users/${currentUser && currentUser.id}/favorites`}
            >
              お気に入りホテル一覧
            </Link>
          </li>
          <li>
            <Link
              className="link text-lg "
              href={"/users/settings/reset-password"}
            >
              パスワード再設定
            </Link>
          </li>
          <li>
            {hasHotel && (
              <Link
                className="link text-lg"
                href={"/users/settings/delete-hotel"}
              >
                掲載ホテルを削除する
              </Link>
            )}
          </li>
          <li>
            <Link
              className="link text-base"
              href={"/users/settings/delete-account"}
            >
              アカウントを削除する
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const { req } = ctx;

  const response = await client.get(`/auth/sessions`, {
    headers: {
      "Content-Type": "application/json",
      uid: req?.cookies._uid || null,
      client: req?.cookies._client || null,
      "access-token": req?.cookies._access_token || null,
    },
  });

  if (!response.data.is_login) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const hasHotel = response.data.has_hotel;

  return {
    props: {
      ...response.data.data,
      hasHotel,
    },
  };
};
