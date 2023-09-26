export default function Input(props){
    const { type , onChange, placeholder, value, isError, hintText} = props

    return(
        <>

        {
            value ? <input type={type} value={value || ""} placeholder={placeholder} onChange={onChange} /> : <input type={type} placeholder={placeholder} onChange={onChange} />
        }

        
        {
            isError ? <span className="text-danger ">{hintText}</span> : ""
        }
        
        </>
    )
}