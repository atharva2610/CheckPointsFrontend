import { baseURL } from "../backendConfig";

export default async function getAllCheckLists(token, setCheckLists, setIsLoading, setInfo){
    setIsLoading(true);

    try{
        const response = await fetch(`${baseURL}/apis/`,{
            method: "GET",
            headers: {"Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();
    
        if(response.status === 200){
            setCheckLists(data);
        }
        else if(response.status === 401){
            setInfo({message: "Unauthenticated"});
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