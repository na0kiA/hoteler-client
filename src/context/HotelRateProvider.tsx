import { useContext, useState, createContext, memo } from "react";

type HotelRateContextType = {
  name: string;
};

export const HotelRateContext = createContext({} as HotelRateContextType);

export const HotelRateProvider = memo(({ children }: any) => {
  const [name, setName] = useState("");
  console.log("HotelFormProviderが呼ばれたよ");

  return (
    <HotelRateContext.Provider
      value={{
        name,
      }}
    >
      {children}
    </HotelRateContext.Provider>
  );
});
export const useHotelRateStateContext = () => useContext(HotelRateContext);
