import { useContext, useState, createContext, memo } from "react";

type HotelFormContextType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  keyList: string[];
  setKeyList: React.Dispatch<React.SetStateAction<string[]>>;
};

export const HotelFormContext = createContext({} as HotelFormContextType);

export const HotelFormProvider = memo(({ children }: any) => {
  const [id, setId] = useState<number>(0);
  const [keyList, setKeyList] = useState<string[]>([]);

  console.log("HotelFormProviderが呼ばれたよ");

  return (
    <HotelFormContext.Provider
      value={{
        id,
        setId,
        keyList,
        setKeyList,
      }}
    >
      {children}
    </HotelFormContext.Provider>
  );
});
export const useHotelFormStateContext = () => useContext(HotelFormContext);
