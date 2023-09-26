import { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router-dom"
import apiHelper from "../Commen/ApiHelper";
import MessageBox from "../Component/Messagebox";
import Loader from "../Component/Loader";
import handlePayment from "../Commen/LoadRazorPay";


export default function Checkout({ cartItems, setcartItems }) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const location = useLocation()
    const navigate = useNavigate()

    const paymentMethod = location.search.split("paymentMethod=")[1]

    const [Cart, setCart] = useState([]);
    const [loading, setloading] = useState(false);

    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    });
    const [err, seterr] = useState("")

    // useEffect(() => {
    //     if (!userInfo.Address) {
    //         navigate("/shipping?redirect=checkout")

    //     }
    //     // eslint-disable-next-line
    // }, [])


    const getCart = async () => {
        try {
            setloading(true)
            const products = cartItems.map((x) => x.Product)
            console.log(products);
            const result = await apiHelper.fetchCart(products)
            const inStockItems = result.data?.cart?.filter((x) => x.countInStock > 0)

            for (let i in inStockItems) {
                for (let j in cartItems) {
                    if (cartItems[j].Product === inStockItems[i]._id) {

                        inStockItems[i].qty = cartItems[j].qty
                    }
                }
            }


            setCart(inStockItems)
            setloading(false)



        } catch (error) {
            setloading(false)
            seterr(error.message)
            return

        }

    }

    useEffect(() => {
        if (cartItems.length > 0) {
            getCart()
        }
        // eslint-disable-next-line
    }, [cartItems])

    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0
        while (i < Cart.length) {
            totalItems += Cart[i].qty
            totalPrice += (Cart[i].qty * Number(Cart[i].price))
            totalProducts++
            i++
        }

        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
        // eslint-disable-next-line
    }, [Cart]);



    useEffect(() => {
        if (cartItems.length <= 0) {
            seterr("<div class='justify-content-between d-flex px-2'><span>Cart is Empty</span><a href='/' class='text-link'> Go to Shopping</a></div>")
        }
    }, [cartItems]);


    const PlaceOrder = async () => {
        try {
            const products = Cart.map((x) => {
                return {
                    _id: x._id,
                    qty: x.qty,
                    price: x.price
                }
            })

            const OrderDetails = {
                products: products,
                paymentMethod: paymentMethod,
                ShippingDetails: userInfo.ShippingDetails,
                totalPrice: SummaryDetails.totalAmount

            }

            const result = await apiHelper.createOrder(OrderDetails)
            localStorage.removeItem("cartItems")
            setcartItems([])
            setloading(false)
            console.log(result.data);
            if (!result.data.order.razorPayDetails) {
                return navigate(`/order/${result.data.order._id}`)
            } else {
                const paymentOptions = {
                    name: result.data.order.ShippingDetails.FullName,
                    phone: result.data.order.ShippingDetails.Phone,
                    email: result.data.order.user.email,
                    Address: result.data.order.ShippingDetails.Address,
                    apikey: result.data.order.razorPayDetails.apikey,
                    amount: result.data.order.razorPayDetails.amount,
                    currency: result.data.order.razorPayDetails.currency,
                    razorpayOrderId: result.data.order.razorPayDetails.id,
                    orderId: result.data.order._id,
                    showError: seterr,
                    navigate: navigate
                }
                handlePayment(paymentOptions)
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {


                err && err.length > 0 ? (

                    <MessageBox message={err} />
                ) :


                    (

                        <>
                            <Loader loading={loading} />

                            <div className="container">
                                <div><h3>Review Your Order</h3></div>
                                <hr />
                                <div className="main  ">
                                    <div className="row ">

                                        <div className="col-md-8  shadow rounded p-3  mb-md-5">

                                            <div className="SI pull-left col-md-4  col-12">
                                                <div className="name">
                                                    <h5 className="fw-bold">Shipping Information</h5>
                                                </div>
                                                <hr />

                                                <div>
                                                    {userInfo.ShippingDetails.FullName}
                                                </div>
                                                <div>{userInfo.ShippingDetails.Address}</div>
                                                <div><span>{userInfo.ShippingDetails.City}</span>,<span>{userInfo.ShippingDetails.State}</span>,<span>{userInfo.ShippingDetails.Pincode}</span></div>

                                                <div>{userInfo.ShippingDetails.Phone}</div>

                                            </div>
                                            <div className="PI pull-left col-md-4 offset-md-4 col-12 ">
                                                <div className="name2">
                                                    <h5 className="fw-bold">Payment Information</h5>
                                                </div>
                                                <hr />
                                                <div>Payment Method : {paymentMethod}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12 border border-primary mb-md-5 ">
                                            <div>
                                                <div><h5 className="fw-bold">Order Summary</h5></div>
                                                <hr />
                                                <div>items : ${SummaryDetails.totalAmount}.00</div>
                                                <div>Delivery : ${SummaryDetails.delivery}.00</div>
                                                <div>Total : ${SummaryDetails.totalAmount}.00</div>


                                            </div>
                                            <hr />
                                            <div className="fw-bold mb-2">Order Total : ${SummaryDetails.totalAmount}.00 </div>
                                            <center>
                                                <button className="btn btn-warning text-dark fw-bold mb-2" onClick={PlaceOrder}>Place Order</button>
                                            </center>
                                        </div>


                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-8 col-12 mb-md-5 shadow rounded p-3">
                                            <h5>Order Information</h5>
                                            <hr />
                                            {
                                                Cart && Cart.map((x) => {
                                                    return (
                                                        <div className="OI d-flex">
                                                            <div className="mx-2"><img src={x.image} alt="" width={"100%"} style={{ maxWidth: "150px" }} /></div>
                                                            <div>
                                                                <div>{x.name}</div>
                                                                <div>{x.category}</div>
                                                                <div>{x.qty}</div>
                                                                <div>${x.price}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </>

                    )
            }
        </>

    )
}