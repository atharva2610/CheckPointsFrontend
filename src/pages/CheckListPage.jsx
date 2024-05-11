import { useState, useEffect, useRef } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/Loading";
import { IconButton, PrimaryButton } from "../components/Button";
import Task from "../components/Task";

import { addMessage } from "../reduxStore/messageSlice";
import { setToken } from "../reduxStore/authSlice";
import createTask from "../serverRequests/createTask";
import getAllTasks from "../serverRequests/getAllTasks";
import updateCheckList from "../serverRequests/updateCheckList";
import deleteCheckList from "../serverRequests/deleteCheckList";

export default function CheckListPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const updateCheckListReference = useRef(null);
    const addTaskReference = useRef(null);
    const {checkListId} = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(null);

    const [checkList, setCheckList] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [filterTasks, setFilterTasks] = useState([]);

    const [editCheckList, setEditCheckList] = useState(false);
    const [processingCheckList, setProcessingCheckList] = useState(false);
    const [filter, setFilter] = useState("all");



    function handleUpdateCheckList(){
        if (updateCheckListReference.current.value){
            updateCheckList(token, checkListId, {project_name: updateCheckListReference.current.value}, setCheckList, setProcessingCheckList, setInfo);
            setEditCheckList(false);
        }
    }

    function handleDeleteCheckList(){
        if (checkList)
            deleteCheckList(token, checkListId, setCheckList, setTasks, setIsLoading, setInfo);
    }

    function handleAddTask(){
        if (addTaskReference.current.value){
            createTask(token, checkListId, {description:addTaskReference.current.value}, setTasks, setIsLoading, setInfo);
            addTaskReference.current.value = "";
        }
    }

    function handleFilterTaks(toFilter){
        if (toFilter === "completed")
            setFilterTasks(tasks.filter(task => task.completed))
        else if (toFilter === "uncompleted")
            setFilterTasks(tasks.filter(task => !task.completed))
        else
            setFilterTasks(tasks);

        setFilter(toFilter);
    }


    useEffect(()=>{
        if (token){
            setCheckList(checkListId);
            getAllTasks(token, checkListId, setCheckList, setTasks, setFilterTasks, setIsLoading, setInfo);
        }
        else
            navigate("/signin");
    }, [token])


    useEffect(()=>{
        if (info){
            if (info.message === "Unauthenticated")
                dispatch(setToken(null));
            else
                dispatch(addMessage(info))
        }
    }, [info])


    useEffect(()=>{
        handleFilterTaks(filter);
    }, [tasks])


    return ( 
        
        <div className="w-full max-w-screen-md">
            {
                checkList ?
                <>
                    <div className="card">
                        {/* CHECKLIST WITH UPDATE, DELETE BUTTONS */}
                        <div className="flex items-start gap-2 py-4">
                            {
                                editCheckList ?
                                    <input ref={updateCheckListReference} type="text" disabled={!editCheckList} placeholder="CheckList Name" className="bg-gray-200 w-full p-2 test-lg sm:text-xl rounded-md outline-none" defaultValue={checkList.project_name} autoFocus/>
                                :
                                    <h1 className="w-full text-xl sm:text-2xl">{checkList.project_name}</h1>
                            }
                            {
                                processingCheckList ?
                                    <Loading />
                                :

                                    <div className="flex items-center justify-end gap-2">
                                    {
                                        editCheckList ?
                                        <>
                                            <IconButton iconName="done" onClick={handleUpdateCheckList}/>
                                            <IconButton iconName="close" onClick={()=>setEditCheckList(false)}/>
                                        </>
                                        :
                                        <>
                                            <IconButton iconName="edit" onClick={()=>setEditCheckList(true)}/>
                                            <IconButton iconName="delete" onClick={handleDeleteCheckList}/>
                                        </>
                                    }
                                    </div>
                            }
                        </div>

                        {/* ADD TASK FORM */}
                        <div className="flex items-start gap-2 py-4">
                            <textarea ref={addTaskReference} name="description" placeholder="Create New Task" className="flex-1 border-2 border-gray-300 min-h-10 max-h-32 p-2 text-lg tracking-wider rounded-md focus:outline-purple-600"></textarea>
                            <IconButton iconName="add" onClick={handleAddTask}/>
                        </div>
                    </div>

                    
                    <div className="card my-8">
                        {/* SHOW TASK EDIT, DELETE BUTTONS */}
                        <div className="flex items-center gap-2 py-4">
                            <span className="flex-1 text-base">Tasks: {filterTasks.length}</span>
                        </div>

                        {/* FILTER BUTTONS */}
                        <div className="grid grid-cols-3 py-4">
                            <PrimaryButton bgColor={filter === "all" ? "bg-gray-200" : "bg-transparent"} textColor="text-black" borderColor="border-transparent" hover="bg-gray-200" onClick={()=>handleFilterTaks("all")}>All</PrimaryButton>
                            <PrimaryButton bgColor={filter === "completed" ? "bg-gray-200" : "bg-transparent"} textColor="text-black" borderColor="border-transparent" hover="bg-gray-200" onClick={()=>handleFilterTaks("completed")}>Completed</PrimaryButton>
                            <PrimaryButton bgColor={filter === "uncompleted" ? "bg-gray-200" : "bg-transparent"} textColor="text-black" borderColor="border-transparent" hover="bg-gray-200" onClick={()=>handleFilterTaks("uncompleted")}>Uncompleted</PrimaryButton>
                        </div>
                        </div>

                        {/* TASKS */}
                        <div className="card">
                        {
                            isLoading ?
                            <Loading />
                            :
                            filterTasks.length ?
                            filterTasks.map(task => <Task key={task.id} task={task} setTasks={setTasks}/>)
                            :
                            <h2 className="py-4 text-base text-center">No Tasks!</h2>
                        }
                        </div>

            
                </>
                :
                    <h1 className="my-4 text-base text-center">CheckList not found!</h1>
            }
        </div>
     );
}