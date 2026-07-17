import Nav from "../components/Nav";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile(){
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  const addAddress = () => {
    if (address.trim() === "") return;

    setAddresses([...addresses, address]);
    setAddress("");
  };
  const deleteAddress=(item)=>{
    const updatedAddress=addresses.filter(address=>address!==item)
    setAddresses(updatedAddress)
  }

    return (
        <>
            <Nav/>
            <main className="container p-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRM4AYB4vrbGWV-Rp2xSgGZSq2OrSBgNt0TSlcUoXFUnhTf-FN3tGsC30-&s=10" alt="profile-pic" className="profile-img img-fluid rounded-circle"/>
                    </div>
                    <div className="col-md-8 fs-3">
                        <p className="fw-bold">Srijan Das</p>
                        <hr/>
                        <p className="fw-bold">Email:</p>
                        <p>srijan@gmail.com</p>
                        <hr/>
                        <p className="fw-bold">Address:</p>
                        {addresses.map(address=>(
                            <div>
                            <span>{address}  </span>
                            <button className="btn btn-primary" onClick={()=>deleteAddress(address)}>Delete address</button>
                            <br/>
                            <br/>
                            </div>
                        ))}
                        <input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} />
                        <button className="btn btn-primary" onClick={addAddress}>Add new Address</button>
                        <br/><br/>
                        <Link className="btn btn-outline-primary" to="/order">Order History</Link>
                        
                    </div>
                </div>
            </main>
        </>
        
    )
}