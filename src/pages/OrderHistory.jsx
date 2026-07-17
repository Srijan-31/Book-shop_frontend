import useBookContext from "../context/bookContext";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

export default function OrderHistory(){

    

    const{orderHistory, handleOrderHistory, loading, error, removeOrderHistory}=useBookContext()
    console.log(orderHistory)

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>

    return(
        <>
        <Nav/>
            <main className="container py-3">
                <h3 className="fs-2">Previous Orders-</h3>
                {
                    orderHistory.length===0?<p className="fs-3 fw-bold text-center py-5">No previous History</p>:
                    <div>
                        <ul className="list-group">
                            {orderHistory?.map(orders=>(
                                <li className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <Link to={`/products/${orders?._id}`}><img src={orders?.image} className="img-fluid" style={{
                                            width: "200px",
                                            height: "240px",
                                            objectFit: "cover",
                                        }} /></Link>
                                        <div className="ms-3">
                                            <h2 className="fw-bold">{orders?.title}</h2>
                                            <p className="fw-bold">{orders?.author}</p>
                                            <p className="fw-bold">₹{orders?.price}</p>
                                        </div>
                                        <button onClick={()=>removeOrderHistory(orders?._id)} className="btn btn-outline-danger ms-5">Remove from order history</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                
            </main>
        </>
    )
}