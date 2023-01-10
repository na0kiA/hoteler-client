import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { Rating } from "react-simple-star-rating";

import { deleteReview, getReviewShow, updateReview } from "lib/reviews";
import { ReviewEditParams, ReviewShowType } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import { useRouter } from "next/router";

const UserReviewShow = ({
  title,
  content,
  fiveStarRate,
  helpfulnessesCount,
  userName,
  userImage,
  userId,
  createdAt,
  id,
}: ReviewShowType) => {
  const { currentUser } = useAuthStateContext();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [editReviewTitle, setEditReviewTitle] = useState<string>(title);
  const [editReviewContent, setEditReviewContent] = useState<string>(content);
  const [editReviewRating, setEditReviewRating] =
    useState<number>(fiveStarRate);

  const router = useRouter();
  console.log(editReviewRating);

  const handleRating = (rate: number) => {
    setEditReviewRating(rate);
  };

  const createdDateByJapanese = useCallback((date: Date) => {
    const yearAndMonthAndDays = date.toString().slice(0, 10);
    return `${yearAndMonthAndDays.slice(0, 4)}年${yearAndMonthAndDays.slice(
      6,
      7
    )}月${yearAndMonthAndDays.slice(8, 10)}日`;
  }, []);

  const handleDeleteReviews = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await deleteReview(id);
      if (res.status == 200) {
        console.log("口コミ削除に成功");
        router.push(`/users/${userId}`);
      } else {
        throw new Error(
          "口コミ削除に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const generateParams = () => {
    const reviewEditParams: ReviewEditParams = {
      title: editReviewTitle,
      content: editReviewContent,
      fiveStarRate: editReviewRating,
    };
    return reviewEditParams;
  };

  const handleUpdateReview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const params = generateParams();

    try {
      const res = await updateReview(id, params);
      if (res.status == 200) {
        console.log("口コミ編集に成功");
        router.push(`/reviews/${id}`);
      } else {
        throw new Error(
          "口コミ削除に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            {editToggle ? (
              <>
                <Rating
                  initialValue={editReviewRating}
                  transition
                  size={20}
                  allowTitleTag={false}
                  onClick={handleRating}
                />{" "}
                <span className="align-bottom">({editReviewRating})</span>
              </>
            ) : (
              <>
                <Rating
                  initialValue={editReviewRating}
                  transition
                  size={20}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />{" "}
                <span className="align-bottom">({editReviewRating})</span>
              </>
            )}
          </div>
          <p className="text-xs mt-1">
            <>{createdDateByJapanese(createdAt)}に作成</>
          </p>
          <h2 className="text-base mt-1 mb-1">
            {editToggle ? (
              <>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={editReviewTitle}
                  onChange={(event) => {
                    setEditReviewTitle(event.target.value);
                  }}
                />
              </>
            ) : (
              <>{title}</>
            )}
          </h2>
          <p className="text-xs">
            {editToggle ? (
              <>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={editReviewContent}
                  onChange={(event) => {
                    setEditReviewContent(event.target.value);
                  }}
                />
              </>
            ) : (
              <>{content}</>
            )}
          </p>
          <div className="justify-start">
            <p className="text-xs">
              <span className="text-sm"> {helpfulnessesCount}</span>
              人が参考になった
            </p>
          </div>
        </div>
      </div>
      {currentUser && currentUser.id === userId ? (
        <>
          <button
            className="btn btn-xs"
            onClick={(event) => {
              handleDeleteReviews(event);
            }}
          >
            削除
          </button>
          <button
            className="btn btn-xs"
            onClick={() => {
              setEditToggle(!editToggle);
            }}
          >
            編集
          </button>
          {editToggle && (
            <>
              <button
                className="btn btn-xs"
                onClick={(event) => {
                  handleUpdateReview(event);
                  setEditToggle(!editToggle);
                }}
              >
                保存
              </button>
            </>
          )}
        </>
      ) : (
        <></>
      )}
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
