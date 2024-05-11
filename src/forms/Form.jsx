import FormErrors from "../components/FormErrors";

export default function Form({ children, submitHandler, formTitle, fieldErrors }) {

    return (<form onSubmit={submitHandler} className="w-full max-w-md">
            <h1 className="mb-12 text-2xl leading-none text-center">{formTitle}</h1>

            {fieldErrors?.error && <span className="text-base text-red-600 my-2">{fieldErrors.error}</span>}
            <FormErrors errors={fieldErrors?.non_field_errors}/>

            {children}
    </form>)
}