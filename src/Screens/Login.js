import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import MessageBox from "../Component/Messagebox";
import Validator from "../Commen/Validator";
import Loader from "../Component/Loader";

export default function LoginScreen() {

    const navigate = useNavigate()
    
    const location = useLocation()



    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userInfo")
    useEffect(() => {
        if (token && user) {
            navigate("/")
            return
        }
    }, [token, navigate, user]);

    const [LoginErrors, setLoginErrors] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isSubmited, setisSubmited] = useState(false);
    const [userInfo, setuserInfo] = useState({
        email: "",
        password: "",
    })
    const [err, seterr] = useState("");

    const ChangeHandler = (e) => {
        const tmp = { ...userInfo }
        tmp[e.target.id] = e.target.value
        setuserInfo({ ...tmp })
        if (isSubmited) {
            const validationResult = Validator(tmp, "login")
            setLoginErrors(validationResult)
        }
        return
    }



    const LoginHandler = async () => {
        try {
            setisSubmited(true)
            const validationResult = Validator(userInfo, "login")
            if (validationResult.length > 0) {
                return setLoginErrors(validationResult)
            }
            setisLoading(true)
            const result = await apiHelper.userLogin(userInfo)
            const user = result.data.user
            const token = user.token
            localStorage.setItem("userInfo", JSON.stringify(user))
            localStorage.setItem("token", token)
            
            setisLoading(false)

            if (location.search) {
                const path = "/" + location.search.split("?redirect=")[1]
                navigate(path)
            } else {
                navigate("/")
            }
            return

        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.status === 400 && error.response.data) {
                if (error.response.data.errors) {
                    setLoginErrors(error.response.data.errors)
                    return
                } else {
                    seterr(error.response.data.message)
                    return
                }
            } else {
                seterr(error.message)
            }
        }
    }

    // const [user, setUser] = useState({
    //     email: "",
    //     password: ""
    // })

    // const token = localStorage.getItem("token")

    // const navigate = useNavigate()


    // const LoginHandler = async () => {
    //     try {
    //         const result = await apiHelper.userLogin(user)
    //         localStorage.setItem("userInfo", JSON.stringify(result.data.user))
    //         localStorage.setItem("token", result.data.user.token)
    //         navigate("/")

    //     } catch (error) {

    //     }
    // }

    // useEffect(() => {

    //     if (token && token.length > 0 && user) {

    //         navigate("/")
    //         return
    //     }
    //     // eslint-disable-next-line
    // }, [token, navigate, user])


    return (
        <>

            {
                err && err.length > 0 ? (

                    <MessageBox message={err} />
                ) : (
                    <div className="container pt-2 pb-3">
                        <Loader loading={isLoading} />
                        <h3 className="fw-bold text-center" style={{ textDecoration: "underline", textDecorationColor: "#ffc107" }}>amazona</h3>
                        <hr className="mb-3" />
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-6">
                                <div className="shadow rounded p-3">
                                    <h5 className="fs-2 fw-normal mb-4">Sign In</h5>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={ChangeHandler} type="text" id="email" className="input rounded" />
                                            {
                                                LoginErrors.find((x) => x.key === "email") ? <span className="text-danger">{LoginErrors.find((x) => x.key === "email").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="password">Password</label>
                                            <input onChange={ChangeHandler} type="password" id="password" className="input rounded" />
                                            {
                                                LoginErrors.find((x) => x.key === "password") ? <span className="text-danger">{LoginErrors.find((x) => x.key === "password").message}</span> : ""
                                            }
                                        </div>
                                        <div className="col-12 mb-3">
                                            <button onClick={LoginHandler} className="bg-gradient w-100 border border-secondary btn btn-warning">
                                                Sign In
                                            </button>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="d-flex gap-1 justify-content-center align-items-center">
                                                <hr className="d-block" style={{ width: "2rem" }} />
                                                <i className="fw-normal" style={{ fontSize: "0.9rem" }}>
                                                    No have an Account
                                                </i>
                                                <hr className="d-block" style={{ width: "2rem" }} />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <button onClick={() => {
                                                if (location.search) {
                                                    navigate(`/signup${location.search}`)
                                                } else {
                                                    navigate("/signup")
                                                }
                                            }} className="bg-gradient w-100 border border-secondary btn btn-light">
                                                Create an Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )




}