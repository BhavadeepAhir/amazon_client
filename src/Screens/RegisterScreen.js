import { useEffect, useState } from "react"

import apiHelper from "../Commen/ApiHelper"
import { useNavigate } from "react-router-dom"
import Validator from "../Commen/Validator"
import Input from "../Commen/Input"

export default function RegisterScreen() {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [validationError, setValidationError] = useState([])

    const [isSubmited, setIsSubmited] = useState(false)

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    useEffect(() => {

        if (token && token.length > 0) {

            navigate("/")
            
        }
        // eslint-disable-next-line
    }, [])
   




    const RegisterHandler = async () => {

        try {
            setIsSubmited(true)
            const ValidationResult = Validator(user, 'register')

            console.log(ValidationResult);

            if (ValidationResult.length > 0) {
                setValidationError(ValidationResult)
            }
            const result = await apiHelper.userRegister(user)
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", result.data.user.token)
            navigate("/")
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error validation " && error.response.data.message === " Auth Error") {
                    setValidationError(error.response.data.errors)
                }
            }
            console.log(error);
        }


    }
    return <>
        <div className="container py-2">

            <h1>Register</h1>

            <div className="row py-2">
                <div className="col-12 py-2">
                    <Input type="text" placeholder="FirstName" onChange={(e) => {
                        setUser({ ...user, firstName: e.target.value })

                        if (isSubmited) {

                            const ValidationResult = Validator({ ...user, firstName: e.target.value }, "register")
                            setValidationError(ValidationResult)
                        }


                    }

                    }

                        isError={validationError.find((x) => x.key === "firstName")}
                        hintText={validationError.find((x) => x.key === "firstName")?.message}
                    />

                </div>
                <div className="col-12 py-2">
                    <Input type="text" placeholder="lastName" onChange={(e) => {
                        setUser({ ...user, lastName: e.target.value })
                        if (isSubmited) {

                            const ValidationResult = Validator({ ...user, lastName: e.target.value }, "register")
                            setValidationError(ValidationResult)

                        }

                    }
                    }
                        isError={validationError.find((x) => x.key === "lastName")}
                        hintText={validationError.find((x) => x.key === "lastName")?.message} />
                </div>
                <div className="col-12 py-2">
                    <Input type="email" placeholder="Email" onChange={(e) => {
                        setUser({ ...user, email: e.target.value })

                        if (isSubmited) {

                            const ValidationResult = Validator({ ...user, email: e.target.value }, "register")
                            setValidationError(ValidationResult)
                        }

                    }
                    }
                        isError={validationError.find((x) => x.key === "email")}
                        hintText={validationError.find((x) => x.key === "email")?.message}
                    />
                </div>


                <div className="col-12 py-2">
                    <Input type="password" placeholder="Password" onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                        if (isSubmited) {

                            const ValidationResult = Validator({ ...user, password: e.target.value }, "register")
                            setValidationError(ValidationResult)
                        }

                    }
                    }
                        isError={validationError.find((x) => x.key === "password")}
                        hintText={validationError.find((x) => x.key === "password")?.message}
                    />
                </div>

                <div className="col-12 py-2">
                    <Input type="confirmpassword" placeholder="confirmPassword" onChange={(e) => {
                        setUser({ ...user, confirmpassword: e.target.value })
                        if (isSubmited) {

                            const ValidationResult = Validator({ ...user, confirmpassword: e.target.value }, "register")
                            setValidationError(ValidationResult)
                        }

                    }
                    }
                        isError={validationError.find((x) => x.key === "confirmpassword")}
                        hintText={validationError.find((x) => x.key === "confirmpassword")?.message}
                    />
                </div>


                <div className="col-12">
                    <button onClick={RegisterHandler} className="btn btn-warning ">Register</button>
                </div>
            </div>
        </div>

    </>
}