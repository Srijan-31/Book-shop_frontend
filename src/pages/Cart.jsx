import Nav from "../components/Nav";
import useBookContext from "../context/bookContext";
import { Link } from "react-router-dom";

export default function Cart(){
    
    const {books,cart,setCart,loading,error, increaseQuantity, decreaseQuantity}=useBookContext()

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured...</p>

    const removeItem=(item)=>{
        setCart(cart.filter(book=>(
            book._id!==item._id
        )))
    }
    const totalPrice=cart.reduce((sum, book)=> sum + book.price*book.quantity,0)

    return(
        <>
        <Nav/>
        <main className="p-5  bg-light container">
            
             <div className="row">
                {cart?.map(book=>(
                    <div className="col-md-4 my-3">
                        <div className="card h-100">
                            <Link to={`/products/${book?._id}`} >
                                <img src={book?.image} className="card-img-top img-fluid" style={{width:"100%",height:"350px",  objectFit:"contain",objectPosition: "center" }} />
                            </Link>
                            <div className="card-body d-flex flex-column">
                                <p className="card-text fs-2 fw-bold">{book?.title}</p>
                                <p className="card-text text-end fs-4">-{book?.author}</p>
                                <p className="card-text text-center fs-1 fw-bolder">₹{book?.price}</p>
                                <button className="btn btn-primary" onClick={()=>removeItem(book)}>Remove from cart</button>
                                <div className="d-flex justify-content-center gap-2 mt-2">
                                    <button className="btn btn-secondary" onClick={()=>increaseQuantity(book._id)}>+</button>
                                    <span className="fw-normal fs-5">{book.quantity}</span>
                                    <button className="btn btn-secondary" onClick={()=>decreaseQuantity(book._id)}>-</button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                
                
                {cart.length===0?
                    <p className="fs-4 text-center">The Cart is Empty</p>:
                    <div>
                    <p className="fs-3 fw-bold">Total amount: ₹{totalPrice}</p>
                    <button
                    onClick={() => {
                    localStorage.removeItem("cart")
                    window.location.reload()
                    
                    }}
                    className="btn btn-primary"
                    >
                        Clear Cart
                    </button>
                    </div>
                }
                    
                
             </div>
        </main>
        </>
    )
}