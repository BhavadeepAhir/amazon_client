import { useEffect, useState } from "react"
// import products from "../Commen/data"
import ProductCard from "../Component/ProductCard"
import apiHelper from "../Commen/ApiHelper"
import Loader from "../Component/Loader"


function HomeScreen (){

  const [ isLoading, setIsLoading] = useState(false)

const [products , setProduct] = useState([])

      const GetProducts = async () => {
        try {
          setIsLoading(true)
          const result = await apiHelper.fetchProduct()

         setIsLoading(false)
          if (result.status === 200){
            return (
            setProduct(result.data.products))
          }
        } catch (error) {
          setIsLoading(false)
         
        }
      }
      useEffect(()=>{
          
        GetProducts()
      },[])
    return (

      <>
      
        <div className="container">

          <Loader loading={isLoading} />
        <h4>Fetured Products</h4>
        <div className="d-flex pt-2 gap-2 flex-wrap justify-content-md-start  justify-content-start">
      
          {
            products && products.map((product)=> {
              return (
                <ProductCard key={product._id} product = {product}/>
                )
            })
          }
         
        </div>
      </div>
      </>

    )
    
}

export default HomeScreen