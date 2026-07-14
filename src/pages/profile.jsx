import Nav from "../components/Nav";
import { useState } from "react";

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
                        <img src="C:\Users\dassr\OneDrive\Documents\me\resume1.jpg" alt="profile-pic" className="profile-img"/>
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
                    </div>
                </div>
            </main>
        </>
        
    )
}