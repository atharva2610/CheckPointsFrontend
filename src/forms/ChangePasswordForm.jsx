import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import FormErrors from "../components/FormErrors";
import { PrimaryButton } from "../components/Button";
import InputField from "../components/InputField";

import { setToken } from "../reduxStore/authSlice";
import { addMessage } from "../reduxStore/messageSlice";
import changePassword from "../serverRequests/changePassword";

export default function ChangePasswordForm(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [info, setInfo] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);

    function handleChangePassword(event){
        event.preventDefault();
        if (isProcessing)
            return;
        setFieldErrors(null);
        const form = event.target;
        changePassword(token, {old_password: form.old_password.value, new_password: form.new_password.value}, setIsProcessing, setInfo, setFieldErrors);
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
        if (!token)
            navigate("/signin");
    }, [token])

    return (
        <Form submitHandler={handleChangePassword} formTitle="Change Password" fieldErrors={fieldErrors}>
            
            <InputField label="Old Password" type="password" name="old_password" placeholder="Enter old password" autoFocus={true}/>
            <FormErrors errors={fieldErrors?.old_password}/>

            <InputField label="New Password" type="password" name="new_password" placeholder="Enter new password"/>
            <FormErrors errors={fieldErrors?.new_password}/>

            <PrimaryButton type="submit" iconName="done" width="w-full" extraCSS="my-8" processing={isProcessing}>Save Password</PrimaryButton>

        </Form>
    )
}