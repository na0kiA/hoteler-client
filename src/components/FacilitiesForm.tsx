import { useHotelFormStateContext } from "context/HotelFormProvider";
import { updateFacilities } from "lib/hotels";
import Link from "next/link";
import React from "react";
import { HotelFacilityType } from "types/types";
import { useForm } from "react-hook-form";

const FacilitiesForm = () => {
  const { id } = useHotelFormStateContext();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      wifiEnabled: false,
      parkingEnabled: false,
      creditCardEnabled: false,
      phoneReservationEnabled: false,
      netReservationEnabled: false,
      tripleRoomsEnabled: false,
      secretPaymentEnabled: false,
      cookingEnabled: false,
      breakfastEnabled: false,
      couponEnabled: false,
    },
  });

  // const handleUpdateFacilities = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,

  // ) => {
  //   e.preventDefault();
  //   // const params = generateParams();

  //   try {
  //     const res: HotelFacilityType = await updateFacilities(id);
  //   } catch (error: any) {
  //     if (error.response.data) {
  //       console.log(error);
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };

  const getFieldArray = getValues("wifiEnabled");
  console.log(getFieldArray);

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();
    try {
      const res: HotelFacilityType = await updateFacilities(id, data);
    } catch (error: any) {
      if (error.response.data) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  // const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <>
      ホテル設備の設定
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">Remember me</span>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              defaultChecked
              {...register("wifiEnabled")}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link href={`/hotels/${id}`} className="link md:text-lg">
        仮登録
      </Link>
    </>
  );
};

export default FacilitiesForm;
