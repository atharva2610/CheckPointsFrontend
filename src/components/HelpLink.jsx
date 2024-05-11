import { Link } from "react-router-dom";

export default function HelpLink({helpText="", targetLink, targetLinkText}){
    return (
        <p className="w-full my-8 text-base text-center leading-none">{helpText} <Link to={targetLink} className="text-purple-600">{targetLinkText}</Link></p>
    )
}