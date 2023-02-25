import React from "react";

const NotificationCard = () => {
  return (
    <div>
      <div className="md:hidden card card-side bg-base-100 shadow-xl ml-auto">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${favorite.hotelId}`}>
            <Image
              className="md:hidden rounded-lg"
              src={
                favorite.hotelTopImage
                  ? favorite.hotelTopImage
                  : "/noImageHotel.png"
              }
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
              initialValue={favorite.fiveStarRate}
              transition
              size={20}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="align-bottom text-sm">
              ({favorite.fiveStarRate}){" "}
              <Link
                href={`/hotel/${favorite.id}/reviews`}
                className="text-blue-link text-xs"
              >
                {favorite.hotelReviewsCount}件
              </Link>
            </span>
          </div>
          <h2 className="text-ssm mt-1 italic">
            {favorite.createdDate}に登録済み
          </h2>
          <h2 className="card-title text-xl mt-1 mb-1 font-bold">
            {favorite.hotelName}
          </h2>
          <h3 className="text-ssm m-auto">{favorite.hotelFullAddress}</h3>
        </div>
      </div>
      <div className="hidden md:block md:card md:card-side md:bg-base-100 md:shadow-xl">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${favorite.hotelId}`}>
            <Image
              className="rounded-lg"
              src={
                favorite.hotelTopImage
                  ? favorite.hotelTopImage
                  : "/noImageHotel.png"
              }
              alt="ホテル画像"
              width={300}
              height={300}
              priority={true}
            />
          </Link>
          <div className="">
            <div className="">
              <Rating
                initialValue={favorite.fiveStarRate}
                transition
                size={20}
                allowFraction
                allowHover={false}
                readonly={true}
                allowTitleTag={false}
              />
              <span className="align-middle text-sm">
                ({favorite.fiveStarRate}){" "}
                <Link
                  href={`/hotel/${favorite.id}/reviews`}
                  className="text-blue-link text-xs"
                >
                  {favorite.hotelReviewsCount}件
                </Link>
              </span>
            </div>
            <h2 className="text-sm italic mt-1">
              {favorite.createdDate}に登録済み
            </h2>
            <h2 className="card-title text-xl mt-1 mb-1 font-bold">
              {favorite.hotelName}
            </h2>
            <h3 className="text-ssm m-auto">{favorite.hotelFullAddress}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
