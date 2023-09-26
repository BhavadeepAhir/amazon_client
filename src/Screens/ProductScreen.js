import { Link, useNavigate, useParams } from "react-router-dom"
// import products from "../Commen/data"
import Rating from "../Component/Rating"
import apiHelper from "../Commen/ApiHelper"
import { useEffect, useState } from "react"
import Loader from "../Component/Loader";
import MessageBox from "../Component/Messagebox";

function ProductScreen(props) {
    const { cartItems, setcartItems } = props
    const navigate = useNavigate()

    const { id } = useParams();
    const [qty, setqty] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [Product, setProduct] = useState({});
    const [err, seterr] = useState("")


    // const Product = products.find((x) => x._id === id)


    const GetProduct = async () => {
        try {
            setIsLoading(true)
            const result = await apiHelper.fetchProductById(id)
            setIsLoading(false)
            console.log(result);
            if (result.status === 200) {
                return (
                    setProduct(result.data.products))
            }
        } catch (error) {
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.message) {

                return seterr(error.response.data.message)

            } else {
                seterr(error.message)
            }
        }
    }



    useEffect(() => {
        GetProduct()
        // eslint-disable-next-line
    }, []);


    const CartHandler = async () => {
        try {

            const findIndex = cartItems.findIndex((x) => x.Product === id)
            if (findIndex > -1) {
                cartItems[findIndex].qty = qty


            } else {
                cartItems.push({ Product: id, qty: qty })
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems))

            setcartItems(cartItems)
            navigate("/cart")


        } catch (error) {
            seterr(error.message)
            return
        }
    }





    return (<>


        {
            <div className="px-3">
                {
                    err && err.length > 0 ? (
                        <MessageBox message={err} />
                    ) : <>

                        <Link to={".."} className="link" style={{ fontWeight: "600" }} >Back to result</Link>
                        <Loader loading={isLoading} />
                        <div className="container pt-2">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2 mb-md-0">
                                    <img src={Product.image} width={"100%"} alt={Product.name} />

                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-2 mb-0 px-0-sm">
                                            <h4 className="fw-bold">
                                                {Product.name}
                                            </h4>
                                            <div className="d-flex align-items-center mb-1">
                                                <Rating rating={Product.rating} />
                                                <span>&nbsp; {Product.numReviews} reviews</span>
                                            </div>
                                            <p className="mb-1">Price : ${Product.price}</p>
                                            <p className="mb-1">Description:</p>
                                            <p>heigh quolity product</p>
                                        </div>
                                        <div className="col-12 col-lg-6 mb-2">
                                            <div className="card-body card">
                                                <div className="d-flex justify-content-between">
                                                    <h6>Price</h6>
                                                    <span>${Product.price}</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h6>Quantity</h6>
                                                    <select onChange={(e) => setqty(Number(e.target.value))} value={qty} disabled={Product.countInStock <= 0} className="rounded">
                                                        {
                                                            [...new Array(Product.countInStock).keys()].map((x) => {
                                                                return <option key={x} value={x + 1}>{x + 1}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h6>Status</h6>
                                                    <h6 className={Product.countInStock > 0 ? "text-success" : "text-danger"} >{Product.countInStock > 0 ? "In Stock" : "Out of Stock"}</h6>


                                                </div>
                                                <button disabled={Product.countInStock <= 0} className="btn border border-secondary btn-warning w-100" onClick={CartHandler}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                }

            </div>


        }
    </>
    )
}

export default ProductScreen