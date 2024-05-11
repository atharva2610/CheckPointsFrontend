import Icon from "./Icon";

function Button({children, type, css, onClick}){
    return (
        <button type={type} onClick={onClick} className={`${css} leading-none `}>{children}</button>
    )
}

export function PrimaryButton({children, type="button", iconName=null, onClick, bgColor="bg-purple-600", width="", padding="p-2", textColor="text-white", borderColor="border-purple-600", borderRadius="rounded-md", hover="", extraCSS="", processing=false}){
    return <Button type={type} onClick={onClick} css={`${bgColor} ${width} flex items-center justify-center gap-2 ${padding} ${textColor} text-base leading-none border-2 ${borderColor} ${borderRadius} ${hover} ${extraCSS}`}>
        {
            processing ?
                <Icon iconName="progress_activity" extraCSS="animate-spin"/>
            :
            <>
                {iconName && <Icon iconName={iconName}/>} {children}
            </>
        }
        
    </Button>
}

export function IconButton({iconName, type="button", onClick=null, iconSize="", bgColor="bg-transparent", textColor="text-zinc-500", borderRadius="rounded-md", hoverTextColor="hover:text-purple-600",  hover="hover:bg-gray-200", extraCSS=""}){
    return (
        <Button type={type} onClick={onClick} css={`${bgColor} ${textColor} p-1 ${borderRadius} ${hoverTextColor} ${hover} ${extraCSS}`} >
            <Icon iconName={iconName} iconSize={iconSize}/>
        </Button>
    )
}