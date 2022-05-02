import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user,setUser]=useState({})
  const handleAuth = (state) => {
    setIsAuth(state);
  };
  return <AuthContext.Provider value={{ isAuth, handleAuth, user, setUser }}>{children}</AuthContext.Provider>;
};
