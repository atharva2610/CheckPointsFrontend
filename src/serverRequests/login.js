import { baseURL } from "../backendConfig";

export default async function login(fdata, setIsProcessing, setInfo, setFieldErrors){
  setIsProcessing(true);

  try{
    const response = await fetch(baseURL+"/apis/login/",{
      method: 'POST',
        headers: {'Content-Type':'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(fdata)
    });

    const data = await response.json();

    if(response.status == 200){
        localStorage.setItem("authToken", data["access"]);
        return data;
    }
    else if(response.status === 400 || response.status === 401){
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
      setInfo({message:"Unable to connect with Server!", type: "error"});
  }

  setIsProcessing(false);
  return null;
}