import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import FormErrors from "../components/FormErrors";
import { PrimaryButton } from "../components/Button";
import InputField from "../components/InputField";
import HelpLink from "../components/HelpLink";

import { setToken } from "../reduxStore/authSlice";
import { addMessage } from "../reduxStore/messageSlice";
import registerUser from "../serverRequests/registerUser";


export default function SignupForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const [isProcessing, setIsProcessing] = useState(false);
    const [info, setInfo] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    function handlerSignupUser(event){
        event.preventDefault();
        if (isProcessing)
            return;
        setFieldErrors(null);
        const userData = new FormData(event.target);
        let data = {}
        for (const [key, val] of userData.entries())
            data[key] = val
    
        registerUser(data, setIsProcessing, setInfo, setFieldErrors);
        event.target.reset();
    }


    useEffect(()=>{
        if (info){
            if (info.message === "Unauthenticated")
                dispatch(setToken(null));
            else
                dispatch(addMessage(info))
        }
    }, [info])


    useEffect(()=>{
        if (token)
            navigate("/");
    }, [token])

    return (
        <Form submitHandler={handlerSignupUser} formTitle="Sign Up" fieldErrors={fieldErrors}>

            <InputField label="Username" type="text" name="username" placeholder="Enter username" autoFocus={true}/>
            <FormErrors errors={fieldErrors?.username}/>

            <InputField label="Email" type="email" name="email" placeholder="Enter email-id"/>
            <FormErrors errors={fieldErrors?.email}/>

            <InputField label="Password" type="password" name="password" placeholder="Enter password"/>
            <FormErrors errors={fieldErrors?.password}/>

            <InputField label="Confirm Password" type="password" name="password2" placeholder="Confirm password"/>
            <FormErrors errors={fieldErrors?.password2}/>
            
            <PrimaryButton type="submit" iconName="done" width="w-full" extraCSS="my-8" processing={isProcessing}>SignUp</PrimaryButton>

            <HelpLink helpText="Already have an account? Just" targetLink="/signin" targetLinkText="SignIn" />
        </Form>
     );
}