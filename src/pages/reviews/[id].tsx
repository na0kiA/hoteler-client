import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { Rating } from "react-simple-star-rating";

import {
  createHelpfulness,
  deleteHelpfulness,
  deleteReview,
  getReviewShow,
  updateReview,
} from "lib/reviews";
import { ReviewEditParams, ReviewShowType } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import { useRouter } from "next/router";
import Layout from "components/Layout";

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
  const { currentUser, isSignedIn } = useAuthStateContext();
  const [error, setError] = useState("");
  const [submitHelpfulness, setSubmitHelpfulness] = useState<boolean>(false);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [editReviewTitle, setEditReviewTitle] = useState<string>(title);
  const [editReviewContent, setEditReviewContent] = useState<string>(content);
  const [editReviewRating, setEditReviewRating] =
    useState<number>(fiveStarRate);
  console.log(editToggle);

  const router = useRouter();

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
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
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
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteHelpfulness = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await deleteHelpfulness(id);
      if (res.status == 200) {
        console.log("参考になったの解除に成功");
        router.push(`/reviews/${id}`);
      } else {
        throw new Error(
          "参考になったの解除に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  const handleCreateHelpfulness = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await createHelpfulness(id);
      console.log(res);

      if (res.status == 200) {
        console.log("参考になったの登録に成功");
        router.push(`/reviews/${id}`);
      } else {
        throw new Error(
          "参考になったの登録に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Layout title={`${title}`}>
        <div className="md:w-2/3 md:h-5/6 bg-base-100 shadow-xl p-5 ">
          <div className="flex">
            <Link href={`/users/${userId}`} className="flex">
              <Image
                className="rounded-lg"
                src={userImage}
                alt="アバター"
                width={40}
                height={40}
                priority={true}
              />
              <span className="ml-2 mt-2">{userName}</span>
            </Link>

            {/* 編集と削除と保存ボタン */}
            {currentUser && currentUser.id === userId ? (
              <div className="m-auto">
                <button
                  className="btn btn-primary btn-xs md:btn-sm   flex-none mr-2"
                  onClick={() => {
                    setEditToggle(!editToggle);
                  }}
                >
                  {editToggle ? "キャンセル" : "編集"}
                </button>

                {editToggle ? (
                  <></>
                ) : (
                  <button
                    className="btn btn-primary btn-xs md:btn-sm flex-none"
                    onClick={(event) => {
                      handleDeleteReviews(event);
                    }}
                  >
                    削除
                  </button>
                )}

                {editToggle && (
                  <>
                    <button
                      className="btn btn-primary btn-xs md:btn-sm  flex-none"
                      onClick={(event) => {
                        handleUpdateReview(event);
                        setEditToggle(!editToggle);
                      }}
                    >
                      保存
                    </button>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* 星評価の編集 */}
          <div className="">
            <div className="mt-3">
              {editToggle ? (
                <>
                  <Rating
                    initialValue={editReviewRating}
                    transition
                    size={30}
                    allowTitleTag={false}
                    onClick={handleRating}
                  />{" "}
                  <span className="align-middle text-base">
                    ({editReviewRating})
                  </span>
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

            {/* 口コミのタイトル */}
            <div className="mt-3">
              {editToggle ? (
                <div className="form-control">
                  <label className="label p-1">
                    <span className="label-text text-sm">タイトル</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-sm w-full max-w-xs text-xs"
                    value={editReviewTitle}
                    onChange={(event) => {
                      setEditReviewTitle(event.target.value);
                    }}
                  />
                </div>
              ) : (
                <div className="text-sm font-bold">{title}</div>
              )}
            </div>
            <p className="text-xs italic mt-1 mb-1">
              {editToggle ? (
                <></>
              ) : (
                <>{createdDateByJapanese(createdAt)}に口コミを投稿</>
              )}
            </p>

            {/* 口コミの内容 */}
            <div className="mt-3">
              {editToggle ? (
                <div className="form-control">
                  <label className="label p-1">
                    <span className="label-text text-sm">内容</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full max-h-full text-xs"
                    value={editReviewContent}
                    onChange={(event) => {
                      setEditReviewContent(event.target.value);
                    }}
                  >
                    {editReviewContent}
                  </textarea>
                </div>
              ) : (
                <div className="text-sm">{content}</div>
              )}
            </div>

            {/* 参考になったの数 */}
            <p className="text-xs  mt-1 mb-1">
              {editToggle ? (
                <></>
              ) : (
                <>
                  <span className="text-sm"> {helpfulnessesCount}</span>
                  人のお客様がこれが役に立ったと考えています
                </>
              )}
            </p>
          </div>

          {editToggle ? (
            <></>
          ) : (
            <>
              {submitHelpfulness ? (
                <>
                  <button
                    type="submit"
                    className="btn btn-outline btn-active btn-xs md:btn-sm"
                    onClick={(e) => {
                      handleDeleteHelpfulness(e),
                        setSubmitHelpfulness(!submitHelpfulness),
                        setError("");
                    }}
                  >
                    参考になったを取り消す
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn btn-outline btn-xs md:btn-sm"
                    onClick={(e) => {
                      handleCreateHelpfulness(e),
                        setSubmitHelpfulness(!submitHelpfulness),
                        setError("");
                    }}
                  >
                    参考になった
                  </button>
                </>
              )}
              {error && (
                <>
                  <p className="whitespace-pre-wrap mt-5 text-red-600">
                    {error}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </Layout>
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
