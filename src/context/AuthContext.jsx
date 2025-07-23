import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    activeUser !== null ? true : false
  );
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  //   const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const authValue = {
    isLoggedIn,
    setIsLoggedIn,
    activeUser,
    showLoginMessage,
    setShowLoginMessage,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
