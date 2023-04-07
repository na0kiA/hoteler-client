import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStateContext } from "context/AuthProvider";
import { Rating } from "react-simple-star-rating";
import { HotelDetailType } from "types/types";
import { deleteHotel } from "lib/hotels";

type PROPS = {
  props: HotelDetailType[];
};

const HotelOfUserProfile = ({ props }: PROPS) => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();

  const handleDeleteHotel = (id: number) => async () => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        const res = await deleteHotel(id);
        if (res.status === 200) {
          router.reload();
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          alert(`${error.response.data.errors.message}`);
        } else {
          alert("削除に失敗しました。");
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col card card-side bg-base-100 shadow-xl">
        {props.map((hotel: HotelDetailType) => (
          <div key={hotel.id} className="m-auto">
            <div className="m-auto pl-3 pt-5">
              <Link href={`/hotels/${hotel.id}`}>
                <Image
                  className="md:hidden rounded-lg"
                  src={
                    hotel.hotelImages
                      ? hotel.hotelImages[0]?.fileUrl
                      : "/noImageHotel.png"
                  }
                  alt="ホテル画像"
                  width={200}
                  height={200}
                  priority={true}
                />
                <Image
                  className="hidden md:block rounded-lg"
                  src={
                    hotel.hotelImages
                      ? hotel.hotelImages[0]?.fileUrl
                      : "/noImageHotel.png"
                  }
                  alt="ホテル画像"
                  width={300}
                  height={300}
                  priority={true}
                />
              </Link>
            </div>
            <div className="m-auto p-2 mb-1">
              <div className="flex">
                <Rating
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  initialValue={hotel.averageRating}
                  transition
                  size={20}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />
                <div className="mt-auto">
                  <span className="text-sm">
                    ({hotel.averageRating}){" "}
                    <Link
                      href={`/hotel/${hotel.id}/reviews`}
                      className="text-blue-link text-xs"
                    >
                      {hotel.reviewsCount}件
                    </Link>
                  </span>
                </div>
                <div className="md:ml-auto ml-3 mt-auto">
                  {currentUser && hotel.userId === currentUser.id ? (
                    <>
                      {router.pathname.endsWith("delete-hotel") ? (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={handleDeleteHotel(hotel.id)}
                        >
                          削除
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => {
                            router.push(`/hotels/${hotel.id}/edit`);
                          }}
                        >
                          編集
                        </button>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <Link href={`/hotels/${hotel.id}`}>
                <h2 className="card-title text-xl mt-1 mb-1 font-bold">
                  {hotel.name}
                </h2>
                <h3 className="text-ssm m-auto">{hotel.fullAddress}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HotelOfUserProfile;
