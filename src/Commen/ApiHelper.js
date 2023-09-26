import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseUrl = "http://localhost:5000"
    }

    fetchProduct() {
        return axios.get(this.baseUrl + "/product")
    }

    fetchProductById(id) {
        return axios.get(`${this.baseUrl}/product/${id}`)
    }

    userLogin(data) {
        return axios.post(`${this.baseUrl}/user/login`, data)
    }

    userRegister(data) {
        return axios.post(`${this.baseUrl}/user/signup`, data)
    }

    fetchCart(products) {
        return axios.post(`${this.baseUrl}/cart`, { products: products })
    }

    createOrder(orderDetails) {
        return axios.post(`${this.baseUrl}/order`, orderDetails, { headers: { "token": localStorage.getItem("token") } })
    }

    paymentVerify(details) {
        return axios.post(`${this.baseUrl}/payment/verify`, details, { headers: { "token": localStorage.getItem("token") } })
    }
}

const apiHelper = new ApiHelper()

export default apiHelper