import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NotificationType } from "types/types";

type PROPS = {
  props: NotificationType[];
};

const NotificationCard = ({ props }: PROPS) => {
  return (
    <div>
      {props.map((notification: NotificationType) => (
        <>
          <div
            className="card card-side bg-base-100 shadow-xl ml-auto"
            key={notification.id}
          >
            <div className="m-auto pl-3 pt-5">
              <Link
                href={`${
                  notification.kind === "came_reviews"
                    ? `/users/${notification.senderId}`
                    : `/hotels/${notification.hotelId}`
                }`}
              >
                <Image
                  className="rounded-full"
                  src={
                    notification.image
                      ? notification.image
                      : "/noImageHotel.png"
                  }
                  alt="通知を送ったユーザー画像"
                  width={50}
                  height={50}
                  priority={true}
                />
              </Link>
            </div>
            <Link
              href={`${
                notification.kind === "came_reviews"
                  ? `/hotels/${notification.hotelId}/reviews`
                  : `/hotels/${notification.hotelId}`
              }`}
            >
              <div className="flex flex-col p-5 pb-1">
                <h2 className="card-title text-sm mt-1 mb-1 font-bold">
                  {notification.kind === "came_reviews" && (
                    <span>
                      <span className="italic">{notification.senderName}</span>
                      が<span className="italic">{notification.hotelName}</span>
                      に星
                      {notification.reviewerRating}
                      つの口コミを投稿しました。
                    </span>
                  )}
                  {notification.kind === "hotel_updates" && (
                    <span>
                      {notification.hotelName}がホテルを更新しました。
                    </span>
                  )}
                </h2>
                <h3 className="text-sm mr-auto">{notification.message}</h3>
                <p className="text-ssm mt-1 italic">
                  {notification.createdDate}
                </p>
              </div>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default NotificationCard;
