import { baseURL } from "../backendConfig";

export default async function getUser(token, setInfo){

  try{
      const response = await fetch(`${baseURL}/apis/user/`,{
      method: "GET",
      headers: {"Content-Type":"application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (response.status === 200){
          return data;
      }
      else if(response.status === 401){
        setInfo({message: "Unauthenticated"});
      }
      else{
          setInfo({message: "Something went wrong!", type: "error"});
          console.log(data);
      }

  }
  catch(error){
    console.error("Server ERROR : ", error);
    setInfo({message:"Unable to connect with Server!", type: "error"});
  }

  return null;
  
}