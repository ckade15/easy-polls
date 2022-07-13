import UserContext from "../../setup/app-context-manager";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const logout = () => {
    localStorage.removeItem('sessionToken');

    return <Navigate to="/" replace />
}
export default logout;