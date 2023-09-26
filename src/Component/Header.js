import { Link, useNavigate } from "react-router-dom"

function Header({ cartItems }) {


  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logOutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const navigateToLogin = () => {

    navigate("/login")

  }
  return (
    <header style={{ zIndex: "100", position: "relative" }} className="w-100 bg-dark py-2 d-flex align-items-center justify-content-between">
      <div className="logo ">

        <Link to={"/"} className="text-light" >
          <h5 className="fw-bold">AMAZON</h5></Link>
      </div>
      <div className="icons d-flex align-itmes-center gap-4">
        <Link className="link_hover text-light " to={"/cart"}>

          <span className="position-relative ">

            <i className="fa-brands link text-light fa-opencart fs-4"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill " style={{ background: "orange" }}></span>
            {
                cartItems.length
            }
          </span>

        </Link>


        <div className="signin">
          <button className="btn btn-warning fw-bold " onClick={token ? logOutHandler : navigateToLogin}> {token ? "SignOut" : "SignIn"} </button>
        </div>

      </div>

    </header>
  )
}

export default Header