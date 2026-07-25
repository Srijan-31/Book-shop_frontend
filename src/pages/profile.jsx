import Nav from "../components/Nav";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Profile(){
    
    
    const [address, setAddress] = useState({lineOne: "", city:"", state:"", pin:""});
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex]=useState(null)

  const addAddress = () => {
    if(
        address.lineOne.trim()==="" ||
        address.city.trim()==="" ||
        address.state.trim()==="" ||
        address.pin.trim() ===""
    ){
        return
    }

    setAddresses([...addresses, address]);
    setAddress({
        lineOne: "",
        city: "",
        state: "",
        pin:""
    });
  };
  const deleteAddress=(index)=>{
    const Address=addresses.filter((_,i)=>i!==index)
    setAddresses(Address)
  }
  const editAddress=(item, index)=>{
    setAddress(item)
    setEditingIndex(index)
  }

  const updateAddress=()=>{
    const updatedAddress= [...addresses]
    updatedAddress[editingIndex]=address
    setAddresses(updatedAddress)
    setEditingIndex(null)
    setAddress({
        lineOne:"",
        city:"",
        state:"",
        pin:"",
    })
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
                        {addresses.map((address,index)=>(
                            <div key={index} className="border rounded p-3 mb-3">
                                <p>{address.lineOne}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.pin}</p>
                                <button onClick={()=>editAddress(address,index)} className="btn btn-warning me-2">Edit</button>
                                <button onClick={()=>deleteAddress(index)} className="btn btn-danger">Delete</button>
                            </div>
                        ))}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address Line"
                            value={address.lineOne}
                            onChange={(e)=>setAddress({...address,lineOne: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="City"
                            value={address.city}
                            onChange={(e)=>setAddress({...address, city: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="State"
                            value={address.state}
                            onChange={(e)=>setAddress({...address,state: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Pin Code"
                            value={address.pin}
                            onChange={(e)=>setAddress({...address,pin: e.target.value})}
                        />
                        <button
                            onClick={editingIndex===null? addAddress: updateAddress} className="btn btn-primary"
                        >{editingIndex=== null?"Add New Address":"Update Address"}</button>
                        <br/><br/>
                        <Link className="btn btn-outline-primary" to="/order">Order History</Link>
                        
                    </div>
                </div>
            </main>
        </>
        
    )
}