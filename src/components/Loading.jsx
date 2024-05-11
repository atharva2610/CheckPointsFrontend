import Icon from "./Icon";

function Loading() {
    return ( 
        <div className="w-full my-4 text-center">
            <Icon iconName="progress_activity" extraCSS="animate-spin"/>
        </div>
     );
}

export default Loading;