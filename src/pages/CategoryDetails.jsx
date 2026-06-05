import useBookContext from "../context/bookContext";
import { useState } from "react";
import {Link} from 'react-router-dom'
import Filter from "../components/Filter";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { FaHeart } from "react-icons/fa";

export default function CategoryDetails(){
    const {books,cart,wishlist,addToWishList,removeLikedItem, loading, error, addToCart}=useBookContext()
    

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>

    const handleClick=(item)=>{
        addToCart(item)
    }
    const handleLike=(book)=>{
        wishlist.some(item=>item._id===book._id)? removeLikedItem(book): addToWishList(book)
    }

    const {category_Id}=useParams()
    // console.log(category_Id)

    const filteredCategories=books?.filter(book=>book?.categoryId==category_Id)
    console.log(filteredCategories)

    return(
        <>
        <Nav/>
            <main className="p-5">
                <div className="row">
                    <div className="col-md-3 p-4">
                        <Filter/>
                        
                    </div>
                    <div className="col-md-9 bg-light p-4">
                        <h4>Showing All Products (showing {filteredCategories?.length} products)</h4>
                        <div className="row">
                            {filteredCategories?.map(book=>(
                                <div className="col-md-4 my-3">
                                    <div className="card h-100">
                                        <div className="position-relative">
                                            <button className="position-absolute top-0 end-0 m-2 border-0 bg-transparent" onClick={()=>handleLike(book)}>
                                                <FaHeart size={30}
                                                     color={
                                                        wishlist.some(item=>item._id===book._id)?"red":"grey"
                                                    }
                                                />
                                            </button>
                                        </div>
                                        <Link to={`/products/${book?._id}`}>
                                        <img src={book?.image} className="card-img-top img-fluid" style={{width:"100%",height:"350px",  objectFit:"contain",objectPosition: "center" }} /></Link>
                                            <div className="card-body d-flex flex-column">
                                                <p className="card-text fs-2 fw-bold">{book?.title}</p>
                                                <p className="card-text text-end fs-4">-{book?.author}</p>
                                                <p className="card-text text-center fs-1 fw-bolder">₹{book?.price}</p>
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