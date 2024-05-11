import { useState } from "react"

export default function InputField({type="text", name, label, placeholder, value="", defaultDisable=false, autoFocus=false}){

    const [inputValue, setInputValue] = useState(value);

    return (
        <div className="bg-white relative mt-8">
            <input type={type} name={name} placeholder={placeholder} value={inputValue} onChange={e=>setInputValue(e.target.value)} disabled={defaultDisable} autoFocus={autoFocus} className="peer bg-transparent w-full p-2 text-lg tracking-wider border-2 border-gray-300 rounded-md focus:border-purple-600 outline-none"/>
            <span className="absolute top-0 left-4 -translate-y-1/2 bg-white px-4 text-zinc-500 text-xs tracking-widest peer-focus:text-purple-600">{label}</span>
        </div>
    )
}