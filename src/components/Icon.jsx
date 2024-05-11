function Icon({iconName, iconSize="", extraCSS=""}) {
    return ( 
        <span className={`material-symbols-rounded ${extraCSS} ${iconSize} leading-none `}>{iconName}</span>
     );
}

export default Icon;