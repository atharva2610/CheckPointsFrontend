import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import { IconButton } from "../components/Button";
import Icon from "../components/Icon";

import { addMessage } from "../reduxStore/messageSlice";
import { setToken } from "../reduxStore/authSlice";
import getAllCheckLists from "../serverRequests/getAllChecklists";
import createCheckList from "../serverRequests/createCheckList";

export default function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addCheckListReference = useRef(null);
    const token = useSelector(state => state.auth.token);

    const [checkLists, setCheckLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(null);


    function handleAddCheckList(){
        if (addCheckListReference.current.value){
            createCheckList(token, {project_name: addCheckListReference.current.value}, setCheckLists, setIsLoading, setInfo);
            addCheckListReference.current.value = "";
        }
    }


    useEffect(()=>{
        if (info){
            if (info.message === "Unauthenticated")
                dispatch(setToken(null));
            else
                dispatch(addMessage(info))
        }
    }, [info])


    useEffect(()=>{
        if (token)
            getAllCheckLists(token, setCheckLists, setIsLoading, setInfo);
        else
            navigate("/signin");
    }, [token])


    return ( 
        <>
            <div className="w-full max-w-screen-md">

                {/* ADD NEW LIST */}
                <div className="card">
                    <div className="flex items-center gap-2 py-4">
                        <input ref={addCheckListReference} type="text" placeholder="Create New CheckList" className="flex-1 text-lg tracking-wider outline-none" />
                        <IconButton iconName="add" onClick={handleAddCheckList} />
                    </div>
                </div>


                {/* PROJECTS */}
                <div className="card my-8">
                    {
                        isLoading ?
                            <Loading />
                        :
                            checkLists.length ?
                                checkLists.map(checkList => (
                                    <div key={checkList.id} className="py-4">
                                        <Link to={`checkList/${checkList.id}`} className="flex items-center gap-2 text-lg sm:text-xl hover:text-purple-600"><Icon iconName="arrow_forward_ios" iconSize="text-base"/>{checkList.project_name}</Link>
                                    </div>
                                    )
                                )
                            :
                                <h2 className="py-4 text-center text-lg">Nothing to show!</h2>
                    }
                </div>

            </div>
        </>
     );
}