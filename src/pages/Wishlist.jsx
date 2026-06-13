import Nav from "../components/Nav";
import useBookContext from "../context/bookContext";
import { Link } from "react-router-dom";

export default function Wishlist(){
    const{books, cart, wishlist, addToCart, removeLikedItem,loading,increaseQuantity, error}=useBookContext()

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured...</p>
    
    const handleClick=(item)=>{
        addToCart(item)
    }
    const handleButtonClick=(id)=>{
        increaseQuantity(id)
        alert("Item quantity increased.")
    }
    
    return (
        <>
            <Nav/>
            <main className="p-5 bg-light container">
                <div className="row">
                    {wishlist?.map(book=>(
                        <div className="col-md-4 my-3">
                            <div className="card h-100">
                                <Link to={`/products/${book?._id}`} >
                                    <img src={book?.image} className="card-img-top img-fluid" style={{width:"100%",height:"350px",  objectFit:"contain",objectPosition: "center" }} />
                                </Link>
                                <div className="card-body d-flex flex-column">
                                    <p className="card-text fs-2 fw-bold">{book?.title}</p>
                                    <p className="card-text text-end fs-4">-{book?.author}</p>
                                    <p className="card-text text-center fs-1 fw-bolder">₹{book?.price}</p>
                                    {cart.some(item=>item._id===book._id)
                                            ?(
                                                <button className="btn btn-primary" onClick={()=>handleButtonClick(book._id)}>Add to Cart</button>
                                            ):(
                                                <button className="btn btn-primary" onClick={()=>handleClick(book)}>Add to Cart</button>
                                            )
                                    }
                                    
                                    <button className="btn btn-primary mt-3" onClick={()=>removeLikedItem(book)}>Remove from wishlist</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {wishlist.length===0? <p className="fs-4 text-center">No item in Wishlist</p>:
                    <button
                    onClick={() => {
                    localStorage.removeItem("wishlist")
                    window.location.reload()
                    
                    }}
                    className="btn btn-primary w-100"
                    >
                        Clear Wishlist
                    </button>
                }
                
            </main>
        </>
    )
}