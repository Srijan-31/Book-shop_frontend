import useBookContext from "../context/bookContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

export default function Product(){
    
    const {books,categories, loading, error, addToCart }=useBookContext()
    // console.log(books)
    const[isAdded,setIsAdded]=useState(false)

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>

    const handleClick=(item)=>{
        addToCart(item)
        setIsAdded(true)

    }
    console.log(books)

    return(
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
                                    <img src={book?.image} className="card-img-top img-fluid" style={{width:"100%",height:"350px",  objectFit:"contain",objectPosition: "center" }} />
                                        <div className="card-body d-flex flex-column">
                                            <p className="card-text fs-2 fw-bold">{book?.title}</p>
                                            <p className="card-text text-end fs-4">-{book?.author}</p>
                                            <p className="card-text text-center fs-1 fw-bolder">₹{book?.price}</p>
                                            {isAdded?<Link to="/cart" className="btn btn-secondary">Go to cart</Link>:<button className="btn btn-primary" onClick={()=>handleClick(book)}>Add to cart</button>}
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}