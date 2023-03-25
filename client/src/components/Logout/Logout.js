import { Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { ToolContext } from "../../contexts/ToolContext";

export default function Logout(){
    const {onLogout} = useContext(ToolContext);
    useEffect(() => {
        onLogout();

    },[onLogout]);

    return <Navigate to = "/" />
}