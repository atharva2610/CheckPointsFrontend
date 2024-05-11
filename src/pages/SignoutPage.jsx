import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setToken } from "../reduxStore/authSlice";

export default function SignoutPage(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    
    useEffect(()=>{
        if (token){
            localStorage.removeItem("authToken");
            dispatch(setToken(null));
        }
        else{
            navigate("/signin");
        }
    }, [])

    return (
        <h1 className="my-8 text-center text-lg">Signout successful!</h1>
    )
}