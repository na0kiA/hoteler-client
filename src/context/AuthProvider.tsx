import Cookies from "js-cookie";
import { getCurrentUser, withAuthServerSideProps } from "lib/auth";
import {
  useContext,
  useState,
  createContext,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { CurrentUser } from "types/types";

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = memo(({ children, props }: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  console.log("AuthProviderが呼ばれたよ");

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      // console.log(res);
      if (res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
      } else {
        setIsSignedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
export const useAuthStateContext = () => useContext(AuthContext);
