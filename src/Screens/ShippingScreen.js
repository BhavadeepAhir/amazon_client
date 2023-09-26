import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Validator from "../Commen/Validator"

export default function Shipping() {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("userInfo"))
    const [isSubmited, setIsSubmited] = useState(false)
    const [validationError, setValidationError] = useState([])


    const [ShippingDetails, setShippingDetails] = useState(user.ShippingDetails  || {
        FullName: "",
        Phone: "",
        City: "",
        State: "",
        Pincode: "",
        Address: "",


    })



    // const ShippingHandler = async () => {
    //     user.ShippingDetails = ShippingDetails
    //     localStorage.setItem("userInfo", JSON.stringify(user))
    //     navigate("/paymentMethod")

    // }

    const ShippingHandler = async () => {
        try {
            setIsSubmited(true)
            const ValidationResult = Validator(ShippingDetails, 'ship')
            console.log(ValidationResult);
            if (ValidationResult.length > 0) {
                setValidationError(ValidationResult)
            } else {
                user.ShippingDetails = ShippingDetails
                localStorage.setItem("userInfo", JSON.stringify(user))
                navigate("/paymentMethod")
            }


        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error validation " && error.response.data.message === " Auth Error") {
                    setValidationError(error.response.data.errors)
                }
            }
            console.log(error);

        }

    }


    return (


        // <div className="container ">
        //     <h1>Shipping Info</h1>

        //     <div className="d-flex justify-content-center align-items-center">

        //         <div className="row">
        //             <div className="col-12 ">
        //                 <label htmlFor="FullName">Fullname</label>
        //                 <input type="text" placeholder="Fullname" onChange={(e) => {
        //                     setShippingDetails({ ...ShippingDetails, Fullname: e.target.value })
        //                 }} />
        //             </div>
        //             <div className="col-12">
        //                 <label htmlFor="Phone">Phone</label>
        //                 <input type="text" placeholder="phone " onChange={(e) => {
        //                     setShippingDetails({ ...ShippingDetails, Phone: e.target.value })
        //                 }} />
        //                 <div className="col-12">
        //                     <label htmlFor="City">City</label>
        //                     <input type="text" placeholder="City" onChange={(e) => {
        //                         setShippingDetails({ ...ShippingDetails, City: e.target.value })
        //                     }} />
        //                 </div>
        //                 <div className="col-12">
        //                     <label htmlFor="State">State</label>
        //                     <input type="text" placeholder="State" onChange={(e) => {
        //                         setShippingDetails({ ...ShippingDetails, State: e.target.value })
        //                     }} />
        //                 </div>

        //                 <div className="col-12">
        //                     <label htmlFor="Pincode">Pincode</label>
        //                     <input type="text" placeholder="Pincode" onChange={(e) => {
        //                         setShippingDetails({ ...ShippingDetails, Pincode: e.target.value })
        //                     }} />
        //                 </div>

        //                 <div className="col-12">
        //                     <label htmlFor="Address">Address</label>
        //                     <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} onChange={(e) => {
        //                         setShippingDetails({ ...ShippingDetails, Address: e.target.value })
        //                     }}></textarea>
        //                 </div>
        //                 <div>
        //                     <button className="bg-warning " onClick={ShippingHandler}> Submit</button>
        //                 </div>

        //             </div>

        //         </div>


        //     </div>
        // </div>

        <div className="container pt-2 pb-3  ">

            <div><h1 className="fw-bold text-center" style={{ textDecoration: "underline", textDecorationColor: "#ffc107" }}>Shipping Info</h1></div>
            <div className="d-flex justify-content-center align-items-center">

                <div className="col-12 col-md-6 shadow rounded p-3 ">
                    <div className="d-flex p-2">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-2">
                                <label htmlFor="FullName" className="">Fullname</label>
                                <input type="text"value={ShippingDetails.FullName} placeholder="Fullname" className="input rounded"


                                    onChange={(e) => {
                                        setShippingDetails({ ...ShippingDetails, FullName: e.target.value })

                                        if (isSubmited) {

                                            const ValidationResult = Validator({ ...ShippingDetails, FullName: e.target.value }, "ship")
                                            setValidationError(ValidationResult)
                                        }
                                    }}

                                />
                                {
                                    validationError.find((x) => x.key === "FullName") ? <span className="text-danger">{validationError.find((x) => x.key === "FullName").message}</span> : ""
                                }


                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <label htmlFor="Phone">Phone</label>
                                <input value={ShippingDetails.Phone} type="phone" placeholder="Phone no" className="input rounded" 
                                
                                onChange={(e) => {
                                    setShippingDetails({ ...ShippingDetails, Phone: e.target.value })
                                    if (isSubmited) {

                                        const ValidationResult = Validator({ ...ShippingDetails, Phone: e.target.value }, "ship")
                                        setValidationError(ValidationResult)
                                    }


                                }} />
                                {
                                    validationError.find((x) => x.key === "Phone") ? <span className="text-danger">{validationError.find((x) => x.key === "Phone").message}</span> : ""
                                }

                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <label htmlFor="City">City</label>
                                <input type="text" placeholder="City" className="input rounded"
                                value={ShippingDetails.City} 
                                onChange={(e) => {
                                    setShippingDetails({ ...ShippingDetails, City: e.target.value })
                                    if (isSubmited) {

                                        const ValidationResult = Validator({ ...ShippingDetails, City: e.target.value }, "ship")
                                        setValidationError(ValidationResult)
                                    }
                                }} />
                                {
                                    validationError.find((x) => x.key === "City") ? <span className="text-danger">{validationError.find((x) => x.key === "City").message}</span> : ""
                                }

                            </div>
                            <div className="col-12 col-md-6 mb-2">
                                <label htmlFor="State">State</label>
                                <input type="text" placeholder="State" className="input rounded" 
                                value={ShippingDetails.State}
                                onChange={(e) => {
                                    setShippingDetails({ ...ShippingDetails, State: e.target.value })
                                    if (isSubmited) {

                                        const ValidationResult = Validator({ ...ShippingDetails, State: e.target.value }, "ship")
                                        setValidationError(ValidationResult)
                                    }
                                }} />
                                {
                                    validationError.find((x) => x.key === "State") ? <span className="text-danger">{validationError.find((x) => x.key === "State").message}</span> : ""
                                }

                            </div>

                            <div className="col-12 mb-2">
                                <label htmlFor="Pincode">Pincode</label>
                                <input type="text" placeholder="Pincode" className="input rounded"
                                value={ShippingDetails.Pincode}
                                 onChange={(e) => {
                                    setShippingDetails({ ...ShippingDetails, Pincode: e.target.value })
                                    if (isSubmited) {

                                        const ValidationResult = Validator({ ...ShippingDetails, Pincode: e.target.value }, "ship")
                                        setValidationError(ValidationResult)
                                    }
                                }} />
                                {
                                    validationError.find((x) => x.key === "Pincode") ? <span className="text-danger">{validationError.find((x) => x.key === "Pincode").message}</span> : ""
                                }

                            </div>

                            <div className="col-12 mb-2">
                                <label htmlFor="Address">Address</label>
                                <textarea class="form-control" placeholder="Write Your Address Here" id="floatingTextarea2"
                                    value={ShippingDetails.Address}
                                    onChange={(e) => {
                                        setShippingDetails({ ...ShippingDetails, Address: e.target.value })
                                        if (isSubmited) {

                                            const ValidationResult = Validator({ ...ShippingDetails, Address: e.target.value }, "ship")
                                            setValidationError(ValidationResult)
                                        }
                                    }} ></textarea>
                                {
                                    validationError.find((x) => x.key === "Address") ? <span className="text-danger">{validationError.find((x) => x.key === "Address").message}</span> : ""
                                }
                            </div>

                            <div >

                                <button className="col-12 bg-warning w-100 border border-secondary btn btn-light mb-2" onClick={ShippingHandler}>Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>


    )
}