import { useContext, useState, createContext, memo } from "react";

type HotelFormContextType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  keyList: string[];
  setKeyList: React.Dispatch<React.SetStateAction<string[]>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  prefecture: string;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  streetAddress: string;
  setStreetAddress: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;

  invalidName: string;
  setInvalidName: React.Dispatch<React.SetStateAction<string>>;
  invalidContent: string;
  setInvalidContent: React.Dispatch<React.SetStateAction<string>>;
  invalidCompany: string;
  setInvalidCompany: React.Dispatch<React.SetStateAction<string>>;
  invalidPrefecture: string;
  setInvalidPrefecture: React.Dispatch<React.SetStateAction<string>>;
  invalidCity: string;
  setInvalidCity: React.Dispatch<React.SetStateAction<string>>;
  invalidPostalCode: string;
  setInvalidPostalCode: React.Dispatch<React.SetStateAction<string>>;
  invalidStreetAddress: string;
  setInvalidStreetAddress: React.Dispatch<React.SetStateAction<string>>;
  invalidPhoneNumber: string;
  setInvalidPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

export const HotelFormContext = createContext({} as HotelFormContextType);

export const HotelFormProvider = memo(({ children }: any) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState("");
  const [keyList, setKeyList] = useState<string[]>([]);
  const [invalidName, setInvalidName] = useState("");
  const [content, setContent] = useState("");
  const [invalidContent, setInvalidContent] = useState("");
  const [company, setCompany] = useState("");
  const [invalidCompany, setInvalidCompany] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [invalidPrefecture, setInvalidPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [invalidPostalCode, setInvalidPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [invalidStreetAddress, setInvalidStreetAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");

  console.log("HotelFormProviderが呼ばれたよ");

  return (
    <HotelFormContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        keyList,
        setKeyList,
        invalidName,
        setInvalidName,
        content,
        setContent,
        invalidContent,
        setInvalidContent,
        company,
        setCompany,
        invalidCompany,
        setInvalidCompany,
        prefecture,
        setPrefecture,
        invalidPrefecture,
        setInvalidPrefecture,
        city,
        setCity,
        invalidCity,
        setInvalidCity,
        streetAddress,
        setStreetAddress,
        invalidStreetAddress,
        setInvalidStreetAddress,
        phoneNumber,
        setPhoneNumber,
        invalidPhoneNumber,
        setInvalidPhoneNumber,
        postalCode,
        setPostalCode,
        invalidPostalCode,
        setInvalidPostalCode,
      }}
    >
      {children}
    </HotelFormContext.Provider>
  );
});
export const useHotelFormStateContext = () => useContext(HotelFormContext);
