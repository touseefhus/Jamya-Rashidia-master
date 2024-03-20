import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../Context/AuthContext";

export const useAuthContext = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
}

// const{user,dispatch}=useAuthContext();