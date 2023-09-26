import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Component/Loader";
import MessageBox from "../Component/Messagebox";

export default function CartScreen({ cartItems, setcartItems }) {

    const [Cart, setCart] = useState([]);
    const navigate = useNavigate()
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
    //     setcartItems(JSON.parse(localStorage.getItem("cartItems")))
    //     // eslint-disable-next-line
    // }, [])

    const getCart = async () => {
        try {
            setloading(true)
            const products = cartItems.map((x) => x.Product)
            const result = await apiHelper.fetchCart(products)
            const inStockItems = result.data?.cart

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


    const ProcessToCheckout = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login?redirect=shipping")
        } else {
            navigate("/shipping")
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
                            <Link className="link mx-2 d-block" to="..">Back to result</Link>
                            <div className="container py-3 px-4">
                                <div className="row">
                                    <div className="col-12 col-md-8 mb-2">
                                        <div className=" d-flex justify-content-between">
                                            <h5 className="fw-bold">Shopping Card</h5>
                                            <span className="text-secondary">Price</span>
                                        </div>
                                        <hr className="my-2 mb-4 d-md-block" />
                                        {
                                            Cart && Cart.map((x, index) => {


                                                return (
                                                    <div key={x._id} className="row shadow py-3 mb-4">
                                                        <div className="col-3 col-md-2">
                                                            <img src={x.image} alt={x.name} width={"100%"} style={{ maxWidth: "150px" }} />
                                                        </div>
                                                        <div className="col-9 col-md-10 d-flex justify-content-between">
                                                            <div className="w-100">
                                                                <h6 className="fw-bold">{x.name}</h6>

                                                                <p className="mb-1">Brand: {x.brand}</p>
                                                                <p className="mb-1">Category: {x.category}</p>
                                                                <div className="d-flex gap-2 align-items-center">
                                                                    <span>Quantity:</span>
                                                                    <select disabled={x.countInStock <= 0} value={x.qty} className="bg-gradient bg-light rounded" style={{ minWidth: "70px" }} onChange={(e) => {
                                                                        Cart[index].qty = Number(e.target.value)

                                                                        setCart([...Cart])
                                                                        let tmp = Cart.map((x) => {
                                                                            return {
                                                                                product: x._id,
                                                                                qty: x.qty
                                                                            }

                                                                        })
                                                                        localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                                    }}>

                                                                        {
                                                                            [...new Array(x.countInStock).keys()].map((n) => (
                                                                                <option value={n + 1} key={n + 1}>{n + 1}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <p className={x.countInStock > 0 ? "text-success mt-1" : "text-danger mt-1"}>{x.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
                                                            </div>
                                                            <div>
                                                                <span className="fw-bold d-block text-end">${x.price}</span>
                                                                <button className="btn mt-2  btn-warning bg-gradient border-secondary" onClick={() => {
                                                                    let filter = cartItems.filter((item) => item.Product !== x._id)
                                                                    localStorage.setItem("cartItems", JSON.stringify(filter))
                                                                    setcartItems(filter)

                                                                }} >Delete</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="card-header border-secondary border border-bottom-0">
                                            <h5 className="fw-bold">Summary</h5>
                                        </div>
                                        <div className="card-body border-secondary border">
                                            <div className="d-flex justify-content-between">
                                                <h6>Total Products:</h6>
                                                <span>{SummaryDetails.totalProducts}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h6>Total Items:</h6>
                                                <span>{SummaryDetails.totalItems}</span>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <h6>Total Amount:</h6>
                                                <span>${SummaryDetails.totalAmount}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h6 className="fw-bold">Subtotal:</h6>
                                                <span className="fw-bold">${SummaryDetails.totalAmount}</span>
                                            </div>
                                            <center>
                                                <button onClick={ProcessToCheckout} className="w-100 btn btn-warning border-secondary bg-gradient">Proccess to Chackout</button>
                                            </center>
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