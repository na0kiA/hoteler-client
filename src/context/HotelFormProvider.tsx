import React, { useContext, useState, createContext, memo } from "react";

type HotelFormContextType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  keys: string[];
  setKeys: React.Dispatch<React.SetStateAction<string[]>>;
};

export const HotelFormContext = createContext({} as HotelFormContextType);

export const HotelFormProvider = memo(function hotelFormProvider({
  children,
}: any) {
  const [id, setId] = useState<number>(0);
  const [keys, setKeys] = useState<string[]>([]);

  console.log("HotelFormProviderが呼ばれたよ");

  return (
    <HotelFormContext.Provider
      value={{
        id,
        setId,
        keys,
        setKeys,
      }}
    >
      {children}
    </HotelFormContext.Provider>
  );
});
export const useHotelFormStateContext = () => useContext(HotelFormContext);
