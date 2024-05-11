import { baseURL } from "../backendConfig";

export default async function updateTask(token, taskId, fdata, setTasks, setIsProcessing, setInfo){
    setIsProcessing(true);

    try{
        const response = await fetch(`${baseURL}/apis/task/${taskId}/`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(fdata)
        });

        const data = await response.json();

        if(response.status === 200){
            setTasks(prev => prev.map(task => task.id === data.id ? {...data} : task));
            setInfo({message: "Task has been updated!", type: "success"});
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