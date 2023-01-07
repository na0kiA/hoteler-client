import { useAuthStateContext } from "context/AuthProvider";
import React, { useContext } from "react";

export const UserProfile = () => {
  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();

  return <></>;
};
export default UserProfile;
