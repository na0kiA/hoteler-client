import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  memo,
} from "react";
import Cookies from "js-cookie";
import { getCurrentUser } from "lib/auth";
import client from "lib/client";
import { CurrentUser } from "types/types";

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | undefined>>;
  notificationCount: number;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = memo(function authProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [id, setId] = useState<number>(0);

  console.log("AuthProviderが呼ばれたよ");

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      client.defaults.headers.common["X-CSRF-Token"] =
        res.headers["x-csrf-token"];
      if (res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        setNotificationCount(res?.data.notifications_count);

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers.client);
        Cookies.set("_uid", res.headers.uid);
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
        id,
        setId,
        loading,
        setLoading,
        notificationCount,
        setNotificationCount,
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
