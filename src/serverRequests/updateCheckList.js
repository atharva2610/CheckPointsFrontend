import { baseURL } from "../backendConfig";

export default async function updateCheckList(token, checkListId, fdata, setCheckList, setIsProcessing, setInfo){
    setIsProcessing(true);

    try{
        const response = await fetch(`${baseURL}/apis/${checkListId}/`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fdata)
        });

        const data = await response.json();

        if(response.status === 200){
            setCheckList(data);
            setInfo({message: "CheckList has been updated!", type: "success"});
        }
        else if(response.status === 401){
            setInfo({message: "Unauthenticated"});
        }
        else if (response.status === 400){
            console.log("Form error: ",data);
        }
        else{
            setInfo({message:"An error occured! Try again later.", type: "error"});
            console.log("Error: ", data);
        }
    }
    catch(error){
        console.error("Server Error: ", error);
        setInfo({message:"Unable to connect with Server!", type: "error"});
    }

    setIsProcessing(false);
}