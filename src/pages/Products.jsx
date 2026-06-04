import useBookContext from "../context/bookContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import { FcLike } from "react-icons/fc";

export default function Product(){
    
    const {books,categories,cart,wishlist, loading, error, addToCart }=useBookContext()
    // console.log(books)
    // const[isAdded,setIsAdded]=useState(false)

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>

    const handleClick=(item)=>{
        addToCart(item)
        

    }
    //console.log(cart)

    

    return(
        <>
        <Nav/>
        <main className="p-5">
            <div className="row">
                <div className="col-md-3 p-4">
                    <Filter/>
                    
                </div>
                <div className="col-md-9 bg-light p-4">
                    <h4>Showing All Products (showing {books?.length} products)</h4>
                    <div className="row">
                        {books?.map(book=>(
                            <div className="col-md-4 my-3">
                                <div className="card h-100">
                                    <div className="position-relative">
                                        <button className="position-absolute top-0 end-0 m-2 border-0 bg-transparent">
                                            <FcLike size={30}
                                                color={
                                                    wishlist.some(item=>item._id===book._id)?"red":"grey"
                                                }
                                            />
                                        </button>
                                    </div>
                                    
                                    <Link to={`/products/${book?._id}`} >
                                        <img src={book?.image} className="card-img-top img-fluid" style={{width:"100%",height:"350px",  objectFit:"contain",objectPosition: "center" }} />
                                    </Link>
                                        <div className="card-body d-flex flex-column">
                                            <p className="card-text fs-2 fw-bold">{book?.title}</p>
                                            <p className="card-text text-end fs-4">-{book?.author}</p>
                                            <p className="card-text text-center fs-1 fw-bolder">₹{book?.price}</p>
                                            {/* {isAdded?<Link to="/cart" className="btn btn-secondary">Go to cart</Link>:<button className="btn btn-primary" onClick={()=>handleClick(book)}>Add to cart</button>} */}
                                            {cart.some(item=>item._id===book._id)
                                            ?(
                                                <Link to="/cart" className="btn btn-secondary">
                                                    Go to cart
                                                </Link>
                                            ):(
                                                <button className="btn btn-primary" onClick={()=>handleClick(book)}>Add to Cart</button>
                                            )
                                            }
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}