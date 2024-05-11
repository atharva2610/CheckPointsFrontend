import { baseURL } from "../backendConfig";

export default async function deleteTask(token, taskId, setTasks, setIsLoading, setInfo){
    setIsLoading(true);

    try{
        const response = await fetch(`${baseURL}/apis/task/${taskId}/`,{
            method: "DELETE",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
        });

        if(response.status === 204){
            setTasks(prev => prev.filter( task => task.id !== taskId));
            setInfo({message: "Task deleted!", type: "success"});
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