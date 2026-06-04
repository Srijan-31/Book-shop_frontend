import { NavLink } from "react-router-dom";
import useBookContext from "../context/bookContext";
import { BsCartPlus } from "react-icons/bs";

export default function Nav(){

    const{books, loading,cart, error , handleSearchBar, search}=useBookContext()

    return(
        <nav className="container d-flex justify-content-between align-item-center py-3">
            <h3 className="fw-bold text-body-secondary">MyShoppingSite</h3>

            <input type="text" value={search} onChange={(e)=>handleSearchBar(e.target.value)} className="form-control w-50" />
            <NavLink to="/cart" className="fs-3 text-dark position-relative">
                <BsCartPlus/>
                {cart.length>0 && 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                        {cart.length}
                    </span>
                }
            </NavLink>
        </nav>
    )
}