import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import FormErrors from "../components/FormErrors";
import { PrimaryButton } from "../components/Button";
import InputField from "../components/InputField";
import HelpLink from "../components/HelpLink";

import { baseURL } from "../backendConfig";
import { setToken, setUser } from "../reduxStore/authSlice";
import { addMessage } from "../reduxStore/messageSlice";
import login from "../serverRequests/login";

export default function SigninForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const [isProcessing, setIsProcessing] = useState(false);
    const [info, setInfo] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    function handlerSigninUser(event){
        event.preventDefault();
        if (isProcessing)
            return;
        setFieldErrors(null);
        (async ()=>{
            const data = await login({username: event.target.username.value, password: event.target.password.value}, setIsProcessing, setInfo, setFieldErrors);
            if (data){
                dispatch(setToken(data.access));
                dispatch(setUser(data.user));
            }
        })();
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
        <Form submitHandler={handlerSigninUser} formTitle="Sign In" fieldErrors={fieldErrors}> 
            
            <InputField label="Username" type="text" name="username" placeholder="Enter username" autoFocus={true}/>
            <FormErrors errors={fieldErrors?.username}/>

            <InputField label="Password" type="password" name="password" placeholder="Enter password"/>
            <FormErrors errors={fieldErrors?.password}/>

            <PrimaryButton type="submit" iconName="done" width="w-full" extraCSS="my-8" processing={isProcessing}>SignIn</PrimaryButton>
            
            <p className="w-full my-6 text-base leading-none text-center"><a href={`${baseURL}/password-reset/`} target="_blank" className="text-purple-600">Forget password?</a></p>
            <HelpLink helpText="Don't have account? let's" targetLink="/signup" targetLinkText="SignUp" />
        </Form>
    );
}