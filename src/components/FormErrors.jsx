export default function FormErrors({errors=null, margin="mb-10"}){
    
    return (
        errors ?
            <ul className={margin}>
                {
                    errors.map(error => <li key={error} className="text-base text-red-600 my-2">{error}</li>)
                }
            </ul>
        :
            <></>

    )
}