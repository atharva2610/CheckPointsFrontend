import { baseURL } from "../backendConfig";

export default async function updateUser(token, fdata, setIsProcessing, setInfo, setFieldErrors){
    setIsProcessing(true);

    try{
        const response = await fetch(`${baseURL}/apis/user/`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fdata)
        });
    
        const data = await response.json();

        if(response.status == 200){
            setInfo({message: "Your Account has been updated!", type: "success"});
            setIsProcessing(false);
            return data;
        }
        else if(response.status === 401){
            setInfo({message: "Unauthenticated"});
        }
        else if(response.status === 400){
            console.log("Form error: ", data);
            setFieldErrors(data);
        }
        else{
            setInfo({message:"An error occured! Try again later.", type: "error"});
            console.log("Error: ", data);
        }
    }
    catch(error){
        console.error("Server Error: ", error);
        alert("Unable to connect with Server!");
    }

    setIsProcessing(false);
    return null;
}