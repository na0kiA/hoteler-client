import React from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "components/Layout";
import { getHotelReviews } from "lib/reviews";
import { ReviewType } from "types/types";
import { Rating } from "react-simple-star-rating";

type PROPS = {
  hotelReviews: ReviewType[];
};

const HotelReviews = ({ hotelReviews }: PROPS) => {
  return (
    <Layout title={`${hotelReviews?.[1]?.hotelName}の口コミ一覧ページ`}>
      {hotelReviews.map((review: ReviewType) => (
        <div key={review.id} className="px-8 py-2">
          {review ? (
            <>
              <div className="flex flex-wrap">
                <Link href={`/users/${review.userId}`} className="flex">
                  <Image
                    className="rounded-full"
                    src={review.userImage}
                    alt="アバター"
                    width={40}
                    height={40}
                    priority={true}
                  />
                  <span className="flex-none ml-2 mt-2">{review.userName}</span>
                </Link>
              </div>
              <div className="flex my-1">
                <Link href={`/reivews/${review.id}`}>
                  <span className="align-middle">
                    <Rating
                      emptyStyle={{ display: "flex" }}
                      fillStyle={{ display: "-webkit-inline-box" }}
                      initialValue={review.fiveStarRate}
                      transition
                      size={20}
                      allowFraction
                      allowHover={false}
                      readonly={true}
                      allowTitleTag={false}
                    />{" "}
                    <span className="align-bottom">{review.title}</span>
                  </span>
                </Link>
              </div>
              <div className="italic text-sm my-1">
                {review.createdDate}に口コミを投稿
              </div>
              <div className="max-x-sm">
                <Link href={`/reivews/${review.id}`}>{review.content}</Link>
              </div>
            </>
          ) : (
            <div className="mt-3">口コミはまだありません</div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default HotelReviews;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const res = await getHotelReviews(id);

    const hotelReviews = await res.data.reviews;

    return {
      props: {
        hotelReviews,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
