import { Link, NavLink } from "react-router-dom";

import Icon from "./Icon";

import { useSelector } from "react-redux";

export default function Header() {

    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);

    return (
        <header className="bg-white flex items-center justify-between px-2 py-8 md:px-8">
            <Link to="" className="text-purple-600 text-base tracking-widest animate-bounce">CheckList</Link>
            <nav className="flex items-center gap-4">
                {
                    token ?
                    <>
                        <NavLink to="/account" className={({isActive})=>(isActive ? "bg-gray-200" : "") +" flex items-center gap-1 p-2 rounded-md md:hover:bg-gray-200"}><Icon iconName="person"/> {user.username}</NavLink>
                        <NavLink to="/signout" className={({isActive})=>(isActive ? "bg-gray-200" : "") +" flex items-center gap-1 p-2 rounded-md md:hover:bg-gray-200"}><Icon iconName="logout"/> Signout</NavLink>
                    </>
                    :
                    <>
                        <NavLink to="/signin" className={({isActive})=>(isActive ? "bg-gray-200" : "") +" flex items-center gap-1 p-2 rounded-md md:hover:bg-gray-200"}><Icon iconName="login"/> Signin</NavLink>
                        <NavLink to="/signup" className={({isActive})=>(isActive ? "bg-gray-200" : "") +" flex items-center gap-1 p-2 rounded-md md:hover:bg-gray-200"}><Icon iconName="person_add"/> Signup</NavLink>
                    </>
                }
            </nav>
        </header>
    )
}