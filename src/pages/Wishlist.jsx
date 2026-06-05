import Nav from "../components/Nav";
import useBookContext from "../context/bookContext";
import { Link } from "react-router-dom";

export default function Wishlist(){
    const{books,wishlist, removeLikedItem,loading, error}=useBookContext()

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured...</p>

    console.log(wishlist)
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
                                    <button className="btn btn-primary" onClick={()=>removeLikedItem(book)}>Remove from wishlist</button>
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