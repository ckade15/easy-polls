import UserContext from "../../setup/app-context-manager";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const logout = () => {
    localStorage.removeItem('sessionToken');

}
export default logout;