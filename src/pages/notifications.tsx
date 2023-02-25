import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import Layout from "components/Layout";
import { getNotification } from "lib/notification";
import { NotificationType } from "types/types";
import NotificationCard from "components/NotificationCard";

type PROPS = {
  notificationList: NotificationType[];
};

const Notifications = ({ notificationList }: PROPS) => {
  const sliceTooLongContent = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength).concat("…");
    } else {
      return content;
    }
  };

  return (
    <Layout title="通知ページ">
      <div className="hidden md:block">
        <NotificationCard props={notificationList} />
      </div>
      {notificationList.map((notification: NotificationType) => (
        <>
          <div
            className="md:hidden card card-side bg-base-100 shadow-xl ml-auto"
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
                  className="md:hidden rounded-full"
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
                <h3 className="text-sm mr-auto">
                  {sliceTooLongContent(notification.message, 15)}
                </h3>
                <p className="text-ssm mt-1 italic">
                  {notification.createdDate}
                </p>
              </div>
            </Link>
          </div>
        </>
      ))}
    </Layout>
  );
};

export default Notifications;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const accessToken = ctx.req.cookies._access_token;
  const clientToken = ctx.req.cookies._client;
  const uid = ctx.req.cookies._uid;

  try {
    const notificationListResponse = await getNotification(
      accessToken,
      clientToken,
      uid
    );
    const notificationList = await notificationListResponse.data;

    console.log(notificationList);

    if (!notificationList) {
      return {
        props: {
          notFount: true,
        },
      };
    }

    return {
      props: {
        notificationList,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
};
