import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { Rating } from "react-simple-star-rating";

import { getReviewShow } from "lib/auth";
import { ReviewShowType } from "types/types";

const UserReviewShow = ({
  title,
  content,
  fiveStarRate,
  helpfulnessesCount,
  userName,
  userImage,
  userId,
  createdAt,
}: ReviewShowType) => {
  const createdDateByJapanese = useCallback((date: Date) => {
    const yearAndMonthAndDays = date.toString().slice(0, 10);
    return `${yearAndMonthAndDays.slice(0, 4)}年${yearAndMonthAndDays.slice(
      6,
      7
    )}月${yearAndMonthAndDays.slice(8, 10)}日`;
  }, []);

  return (
    <>
      <div className="flex bg-base-100 shadow-xl">
        <div className="flex-none p-3">
          <Link href={`/users/${userId}`}>
            <Image
              className="rounded-lg"
              src={userImage}
              alt="アバター"
              width={50}
              height={50}
              priority={true}
            />
            <span className="m-auto">{userName}</span>
          </Link>
        </div>
        <div className="flex-1 p-5 pb-1">
          <div className="">
            <Rating
              initialValue={fiveStarRate}
              transition
              size={20}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="align-bottom">({fiveStarRate})</span>
          </div>
          <p className="text-xs mt-1">
            <>{createdDateByJapanese(createdAt)}に作成</>
          </p>
          <h2 className="text-base mt-1 mb-1">{title}</h2>
          <p className="text-xs">{content}</p>
          <div className="justify-start">
            <p className="text-xs">
              <span className="text-sm"> {helpfulnessesCount}</span>
              人が参考になった
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviewShow;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const { id } = ctx.query;
  const apiResponse = await getReviewShow(id);

  const ReviewDetail: ReviewShowType = apiResponse.data;

  console.log(ReviewDetail);

  if (!ReviewDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...ReviewDetail,
    },
  };
};
