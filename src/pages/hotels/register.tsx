import FormInput from "components/FormInput";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
import { withAuthServerSideProps } from "lib/auth";
import { createHotel } from "lib/hotels";
import React, { createContext, useState } from "react";
import { HotelCreateType } from "types/types";

// export const getServerSideProps = withAuthServerSideProps(
//   "/auth/sessions",
//   true
// );

type HotelFormContextType = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export const HotelFormContext = createContext({} as HotelFormContextType);

const register = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [company, setCompany] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [invalidName, setInvalidName] = useState("");
  const [invalidCompany, setInvalidCompany] = useState("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");

  const generateParams = () => {
    const createHotelParams = {
      name: "ss",
      content: "ss",
      company: "ss",
      prefecture: "ss",
      city: "ss",
      postalCode: "ss",
      streetAddress: "ss",
      phoneNumber: "ss",
    };
    return createHotelParams;
  };

  const handleCreateHotel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res: HotelCreateType = await createHotel(params);
    } catch (error: any) {
      if (error.response.data) {
        // setInvalidEmail(error.response.data.errors.email);
        // setInvalidPassword(error.response.data.errors.password);
        // setInvalidPasswordConfirmation(
        //   error.response.data.errors.password_confirmation
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <HotelFormContext.Provider
        value={{
          name,
          setName,
          content,
          setContent,
        }}
      ></HotelFormContext.Provider>
      <Navbar />
      <ul className="steps steps-horizontal">
        <li className="step step-primary">ホテル詳細の設定</li>
        <li className="step">料金の設定</li>
        <li className="step">仮登録</li>
      </ul>
      <div className="card card-compact	flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <FormInput labelTitle={"ホテル名"} />
          <FormInput labelTitle={"会社名"} />
          <FormInput labelTitle={"電話番号"} />
          <FormInput labelTitle={"都道府県"} />
          <FormInput labelTitle={"市区町村"} />
          <FormInput labelTitle={"番地"} />

          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleCreateHotel(e);
              }}
            >
              次に進む
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
