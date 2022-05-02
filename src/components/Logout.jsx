import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export const Logout = () => {
    const { handleAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    handleAuth(false)
    console.log("userIsOut");
    navigate("/",{replace:true})
  // Logout component, just log user out and take him to `/` homepage

  // suggestion: if you are storing anyting in redux it's a good idea to
  // empty it before loggin out. eg: order

  return <></>;
};
