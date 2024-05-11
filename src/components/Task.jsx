import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "./Button";
import Loading from "./Loading";

import { addMessage } from "../reduxStore/messageSlice";
import { setToken } from "../reduxStore/authSlice";
import updateTask from "../serverRequests/updateTask";
import deleteTask from "../serverRequests/deleteTask";
import toggleTaskCompleted from "../serverRequests/toggleTaskCompleted";


export default function Task({task, setTasks}) {

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const textAreaReference = useRef(null);

    const [allowEdit, setAllowEdit] = useState(false);
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [info, setInfo] = useState(null);


    function handleUpdateTask(){
        if (textAreaReference.current.value){
            updateTask(token, task.id, {description: textAreaReference.current?.value}, setTasks, setIsProcessing, setInfo);
            setAllowEdit(false);
        }
    }

    function handleDeleteTask(){
        deleteTask(token, task.id, setTasks, setIsProcessing, setInfo);
    }

    function handleToggleTaskCompleted(){
        toggleTaskCompleted(token, task.id, {completed: !task.completed}, setTasks, setIsProcessing, setInfo);
    }


    useEffect(()=>{
        if (info){
            if (info.message === "Unauthenticated")
                dispatch(setToken(null));
            else
                dispatch(addMessage(info))
        }
    }, [info])


    
    return (
        <div className="py-4">
            {
                isProcessing ?
                    <Loading />
                :
                <>
                    {showActionButtons && <div className="flex items-center justify-end pb-2">
                        <div className="flex items-center gap-2">
                        {
                            allowEdit ?
                                <>
                                    <IconButton iconName="done" onClick={handleUpdateTask} />
                                    <IconButton iconName="close" onClick={()=>setAllowEdit(false)} />
                                </>
                            :
                                <>
                                    <IconButton iconName="edit" onClick={()=>setAllowEdit(true)} />
                                    <IconButton iconName="delete" onClick={handleDeleteTask} />
                                </>
                        }
                        </div>
                    </div>}

                    <div className="flex items-start gap-2">
                        <IconButton onClick={handleToggleTaskCompleted} iconName={task.completed ? "check_circle" : "circle"} textColor={task.completed ? "text-purple-600" : "text-zinc-500"}/>
                        {
                            allowEdit ?
                                <textarea ref={textAreaReference} autoFocus defaultValue={task.description} className="flex-1 bg-gray-200 h-16 max-h-32 p-1 text-base sm:text-lg tracking-wider rounded-md outline-none"></textarea>
                            :
                            <>
                                <h2 className="w-full text-base sm:text-lg tracking-wider">{task.description}</h2>
                                <IconButton iconName={showActionButtons ? "close" : "more_vert"} onClick={()=>setShowActionButtons(prev => !prev)} />
                            </>
                        }
                    </div>
                </>
            }
            
        </div>
    )
}