import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import { IconButton } from "./components/Button.jsx";

import { setToken, setUser } from "./reduxStore/authSlice.js";
import { addMessage, removeMessage } from "./reduxStore/messageSlice.js";
import getUser from "./serverRequests/getUser.js";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
export const csrftoken = getCookie('csrftoken');


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(state => state.message.messages);

  const [info, setInfo] = useState(null);


  useEffect(()=>{
    const authToken = localStorage.getItem("authToken");

    if (authToken){
      (async ()=>{
        const user = await getUser(authToken, setInfo);
        if (user){
          dispatch(setUser(user));
          dispatch(setToken(authToken));
        }
      })();
    }
    else{
      navigate("/signin");
    }
    console.log("APP LOADED!");
  }, [])


  useEffect(()=>{
    if (info)
      dispatch(addMessage(info));
  }, [info])


  return (
    <>
      <section className="fixed top-10 left-1/2 w-full md:w-3/5 lg:w-2/5 -translate-x-1/2">
        {
          messages.map((message, index) => (
            <div key={`${message.message}-${index}`} className={`bg-white w-full flex justify-between items-center gap-2 p-2 my-2 shadow-xl border-2 ${message.type === "success" ? "text-green-600 border-green-600" : "text-red-600 border-red-600"} rounded-md`}>
              <h2 className="text-base tracking-wider font-bold leading-none">{message.message}</h2>
              <IconButton iconName="close" hoverTextColor={message.type === "success" ? "hover:text-green-600" : "hover:text-red-600"} onClick={()=>dispatch(removeMessage(index))}/>
            </div>
          ))
        }
      </section>

      <Header />

      <main className="flex justify-center items-center px-2 py-8">
          <Outlet />
      </main>
    </>
  )
}

export default App
