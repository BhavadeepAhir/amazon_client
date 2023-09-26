import { Children } from "react";

export default function MessageBox (){
    return(
        <>
        <div className="w-100" style={{background:"pink", color:"#f15500 ",borderRadius:"10px", padding:"1rem" } }> network issue</div>
        <div dangerouslySetInnerHTML={{__html:Children} } className="mb-0"></div>
        </>
    )
}