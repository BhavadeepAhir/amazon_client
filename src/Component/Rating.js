export default function Rating(props) {

    const { rating } = props
    return (
        
            <div className="rating">
            {
               rating > 1 ? (
                <>
                <i classname="fa-solid fa-star-half-stroke'"></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ) : rating === 1 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ) :  rating > 2 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star-half-stroke'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ): rating === 2 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ):  rating > 3 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star-half-stroke'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ): rating === 3 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ):  rating > 4 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star-half-stroke'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ): rating === 3 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star'></i>
                </>
               ):rating > 5 ? (
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-regular fa-star-half-stroke'></i>
                </>
               ):(
                <>
                <i classname="fa-solid fa-star'"></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                </>
               )
               }
            
            </div>
        

    )
}