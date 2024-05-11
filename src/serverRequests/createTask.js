import { baseURL } from "../backendConfig";

export default async function createTask(token,checkListId, fdata, setTasks, setIsLoading, setInfo){
    setIsLoading(true);

    try{
        const response = await fetch(`${baseURL}/apis/${checkListId}/tasks/`,{
            method: "POST",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fdata)
        });
    
        const data = await response.json();

        if(response.status === 201){
            setTasks(prev => [data, ...prev]);
            setInfo({message: "New Task has been created!", type: "success"});
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