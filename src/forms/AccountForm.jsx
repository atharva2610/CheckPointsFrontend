import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import FormErrors from "../components/FormErrors";
import InputField from "../components/InputField";
import HelpLink from "../components/HelpLink";
import { PrimaryButton } from "../components/Button";

import { setToken, setUser } from "../reduxStore/authSlice";
import { addMessage } from "../reduxStore/messageSlice";
import updateUser from "../serverRequests/updateUser";

export default function AccountForm() {

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [info, setInfo] = useState(null);
    const [fieldErrors, setFieldErrors] = useState(null);


    function handleUpdateAccount(event){
        event.preventDefault();
        if (isProcessing)
            return;
        setFieldErrors(null);
        const form = event.target;
        (async ()=>{
            const data = await updateUser(token, {username: form.username.value, email: form.email.value}, setIsProcessing, setInfo, setFieldErrors);
            if (data){
                dispatch(setUser(data));
            }
        })();
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
        <Form submitHandler={handleUpdateAccount} formTitle="Account" fieldErrors={fieldErrors}>

            <InputField label="Username" value={user?.username} name="username" placeholder="Enter username" defaultDisable={disabled} autoFocus={true}/>
            <FormErrors errors={fieldErrors?.username}/>

            <InputField label="Email" type="email" value={user?.email} name="email" placeholder="Enter email-id" defaultDisable={disabled}/>
            <FormErrors errors={fieldErrors?.email}/>

            {
                disabled ?
                    <PrimaryButton onClick={()=>setDisabled(false)} iconName="edit" width="w-full" extraCSS="my-8">Update Account</PrimaryButton>
                :
                    <div className="grid grid-cols-2 gap-2 my-8">
                        <PrimaryButton bgColor="bg-transparent" textColor="text-purple-600" onClick={()=>setDisabled(true)} iconName="close">Cancel</PrimaryButton>
                        <PrimaryButton type="submit" iconName="done" processing={isProcessing}>Save Changes</PrimaryButton>
                    </div>
            }

            <HelpLink targetLink="/change-password" targetLinkText="Change Password" />
        </Form>
     );
}