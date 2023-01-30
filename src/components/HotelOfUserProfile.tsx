import { useAuthStateContext } from "context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { HotelDetailType } from "types/types";

type PROPS = {
  props: HotelDetailType;
};

const HotelOfUserProfile = ({ props }: PROPS) => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();

  return (
    <>
      <div className="md:hidden card card-side bg-base-100 shadow-xl">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${props.id}`}>
            <Image
              className="rounded-lg"
              src="/hoteler_demo_photo.jpg"
              alt="ホテル画像"
              width={100}
              height={100}
              priority={true}
            />
          </Link>
        </div>
        <div className="flex-1 p-5 pb-1">
          <div className="">
            <Rating
              initialValue={props.averageRating}
              transition
              size={20}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="align-bottom text-sm">
              ({props.averageRating}){" "}
              <Link
                href={`/hotel/${props.id}/reviews`}
                className="text-blue-link text-xs"
              >
                {props.reviewsCount}件
              </Link>
            </span>
            {currentUser && props.userId === currentUser.id ? (
              <div className="ml-auto">
                <button
                  className="btn btn-primary btn-xs md:btn-sm   flex-none mr-2"
                  onClick={() => {
                    router.push(`/hotels/${props.id}/edit`);
                  }}
                ></button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <h2 className="card-title text-xl mt-1 mb-1 font-bold">
            {props.name}
          </h2>
          <h3 className="text-ssm m-auto">{props.fullAddress}</h3>
        </div>
      </div>

      {/* PC */}
      <div className="hidden md:block md:card md:card-side md:bg-base-100 md:shadow-xl">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${props.id}`}>
            <Image
              className="rounded-lg"
              src="/hoteler_demo_photo.jpg"
              alt="ホテル画像"
              width={300}
              height={300}
              priority={true}
            />
          </Link>
          <div className="">
            <div className="flex">
              <div className="mt-auto">
                <Rating
                  initialValue={props.averageRating}
                  transition
                  size={20}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />
              </div>
              <div className="text-sm mt-auto">
                ({props.averageRating}){" "}
                <Link
                  href={`/hotel/${props.id}/reviews`}
                  className="text-blue-link text-xs"
                >
                  {props.reviewsCount}件
                </Link>
              </div>
              {/* 編集と削除と保存ボタン */}
              <div className="ml-auto">
                {currentUser && props.userId === currentUser.id ? (
                  <div className="">
                    <button
                      className="btn btn-primary btn-xs "
                      onClick={() => {
                        router.push(`/hotels/${props.id}/edit`);
                      }}
                    >
                      編集
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <h2 className="card-title text-xl mt-1 mb-1 font-bold">
              {props.name}
            </h2>
            <h3 className="text-ssm m-auto">{props.fullAddress}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelOfUserProfile;
