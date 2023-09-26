import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function PaymentScreen() {

    const navigate = useNavigate()
    const [paymentMethod , setPaymentMethod] = useState("cod")

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    const methodPayment = () => {
        navigate(`/checkout?paymentMethod=${paymentMethod}`);
      };

      console.log(paymentMethod);
    return (
        // <div className="container center">

        //         <h2 className="">Select Payment Method</h2>
        //     <div className="d-flex justify-content-center align-items-center ">
        //         <div className="row border border-success">
        //             <div className="col-6">
        //                 <div class="form-check">
        //                     <input class="form-check-input" type="radio" value="online" name="flexRadioDefault" id="Online" checked={paymentMethod === "online"} onChange={(e) =>{handlePaymentMethodChange(e)}}/>
        //                         <label class="form-check-label" for="Online">
        //                             Online
        //                         </label>
        //                 </div>

        //             </div>
        //             <div className="col-6">
        //             <div class="form-check">
        //                     <input class="form-check-input" type="radio" value= "cod" name="flexRadioDefault" id="CashOnDelivery" checked={paymentMethod === "cod" } onChange={(e) =>{handlePaymentMethodChange(e)}} />
        //                         <label class="form-check-label" for="CashOnDelivery">
        //                             Cash On Delivery
        //                         </label>
        //                 </div>
        //                 <div>

        //                 </div>



        //             </div>
        //             <button className="bg-warning  mt-5" onClick={getOrder} > Process </button>
        //         </div>
        //     </div>
        // </div>

        <div className="container pt-3">
                        <div className="d-flex justify-content-center align-items-center">

            <div className="col-12 col-md-6 shadow rounded p-3 ">

                <div className="row ">
                    <div className="paymentCont">
                        <div className="headingWrap">
                            <h3 className="headingTop text-center">Select Your Payment Method</h3>
                            <hr className="mb-3" />

                        </div>
                        <div className="paymentWrap">
                            <div className="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons">
                                <label className={paymentMethod === "online" ? "btn paymentMethod active" : "btn paymentMethod"}>
                                    <div className="method online fw-bold">Online</div>
                                    <input type="radio" value="online"  name="options" checked={paymentMethod === "online"} onChange={(e) =>{handlePaymentMethodChange(e)}} />
                                </label>
                                <label className={paymentMethod === "cod" ? "btn paymentMethod active" : "btn paymentMethod"}>
                                    <div className="method cod fw-bold">COD </div>
                                    <input type="radio"value="cod"  name="options" checked={paymentMethod === "cod"} onChange={(e) =>{handlePaymentMethodChange(e)}}/>
                                </label>


                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center ">
                            <button className="btn btn-warning  btn-fyi" onClick={methodPayment}>CHECKOUT<span className="glyphicon glyphicon-chevron-right"></span></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    )
}