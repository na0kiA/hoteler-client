import React, { memo, useCallback } from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { ReviewType } from "types/types";
import Link from "next/link";
import { useAuthStateContext } from "context/AuthProvider";
import { useRouter } from "next/navigation";
import { deleteReview } from "lib/reviews";

type PROPS = {
  props: ReviewType;
};

const ReviewsHotelCard = ({ props }: PROPS) => {
  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();
  const router = useRouter();

  const createdDateByJapanese = useCallback((date: Date) => {
    const yearAndMonthAndDays = date.toString().slice(0, 10);
    return `${yearAndMonthAndDays.slice(0, 4)}年${yearAndMonthAndDays.slice(
      6,
      7
    )}月${yearAndMonthAndDays.slice(8, 10)}日`;
  }, []);

  const sliceReviewContent = useCallback((content: string) => {
    if (content.length > 15) {
      return content.slice(0, 15).concat("…");
    } else {
      return content;
    }
  }, []);

  const handleDeleteReviews = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await deleteReview(props.id);
      if (res.status == 200) {
        // router.push("/");
        console.log("口コミ削除に成功");
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
    <div className="flex card card-side bg-base-100 shadow-xl">
      <div className="flex-none m-auto pl-3 pt-5">
        <Link href={`/hotels/${props.hotelId}`}>
          <Image
            className="rounded-lg"
            src="/hoteler_demo_photo.jpg"
            alt="ホテル画像"
            width={100}
            height={100}
            priority={true}
          />
          <span className="m-auto">{props.hotelName}</span>
          <p className="text-ssm m-auto">{props.hotelFullAddress}</p>
        </Link>
        <div>
          <Rating
            initialValue={props.hotelAverageRating}
            transition
            size={15}
            allowFraction
            allowHover={false}
            readonly={true}
            allowTitleTag={false}
          />
          <span className="text-ssm"> {props.hotelReviewsCount}件</span>
        </div>
      </div>
      <div className="flex-1 p-5 pb-1">
        <div className="">
          <Rating
            initialValue={props.fiveStarRate}
            transition
            size={20}
            allowFraction
            allowHover={false}
            readonly={true}
            allowTitleTag={false}
          />
          <span className="align-bottom">({props.fiveStarRate})</span>
        </div>
        <p className="text-xs mt-1">
          <>{createdDateByJapanese(props.createdAt)}に作成</>
        </p>
        <h2 className="card-title text-base mt-1 mb-1">{props.title}</h2>
        <p className="card-title text-xs">
          {sliceReviewContent(props.content)}
        </p>
        <div className="justify-start">
          <Link
            href={`/reviews/${props.id}`}
            className="text-xs text-blue-link"
          >
            口コミ全文を表示する
          </Link>
          <p className="text-xs">
            <span className="text-sm"> {props.helpfulnessesCount}</span>
            人が参考になった
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ReviewsHotelCard);
