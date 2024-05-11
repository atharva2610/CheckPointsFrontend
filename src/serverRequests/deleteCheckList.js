import { baseURL } from "../backendConfig";

export default async function deleteCheckList(token, checkListId, setCheckList, setTasks, setIsLoading, setInfo){
    setIsLoading(true);

    try{
        const response = await fetch(`${baseURL}/apis/${checkListId}/`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
        });

        if(response.status === 204){
            setTasks([]);
            setCheckList(null);
            setInfo({message: "CheckList deleted!", type: "success"});
        }
        else if(response.status === 401){
            setInfo({message: "Unauthenticated"});
        }
        else if(response.status === 400){
            console.log("Form error: ", data);
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

    setIsLoading(false);
}