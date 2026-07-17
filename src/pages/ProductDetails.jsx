import { useParams } from "react-router-dom";
import useBookContext from "../context/bookContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
export default function ProductDetails(){

    const{books,cart, categories, loading, error, addToCart, handleOrderHistory}=useBookContext()
    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured</p>

    const {productId}=useParams() 
    const product=books?.find(book=>book._id==productId)
    
    const otherProducts=books?.filter(book=>book?.categoryId===product?.categoryId && book?.title!==product?.title)
    
    const category=categories?.find(category=>category?._id===product?.categoryId)
   
    const handleClick=(product)=>{
        addToCart(product)
        
    }

    return (
        <>
        <Nav/>
        <main className="bg-light">
            <div className="bg-white container py-3">
                <div className="row">
                    <div className="col-md-3">
                        <img src={product?.image} className="img-fluid py-3" />
                        <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>handleOrderHistory(product)} >Buy Now</button>
                        {cart.some(item=>item._id===productId)
                            ?(
                            <Link to="/cart" className="btn btn-secondary mt-3" style={{width:"100%"}}>
                                Go to cart
                            </Link>
                            ):(
                                <button className="btn btn-primary mt-3" onClick={()=>handleClick(product)} style={{width:"100%"}}>Add to Cart</button>
                            )
                        }
                    </div>
                    <div className="col-md-9 py-3">
                        <p className="fs-2">{product?.title}</p>
                        <p className="fs-4">- {product?.author}</p>
                        <p className="fs-5">{product?.rating}</p>
                        <span className="fs-2 fw-bold">₹{product?.price}  </span><span className="text-muted fs-5 text-decoration-line-through">₹{product?.oldPrice}</span><br/>
                        <p className="fs-5 fw-bold text-body-secondary">{product?.discount}% Off</p>
                        <p className="fs-5">{product?.stock} items left</p>
                        <br/>
                        <br/>
                        <hr/>
                        <hr/>
                        <p className="fs-5 fw-bold">{product?.description}</p>
                    </div>
                </div>
                <hr/>
                <div>
                    <p className="fs-4 fw-bold">More items you may like in {category?.name}</p>
                    <div className="row">
                        {otherProducts?.map(book=>(
                            <div className="col-md-3 mx-3 bg-light py-3">
                                <Link to={`/products/${book?._id}`}><img src={book?.image} className="img-fluid" /></Link>
                                <p className="fs-5 fw-bold">{book?.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        </>
    )

}