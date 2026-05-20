import Nav from "../components/Nav";
import useBookContext from "../context/bookContext";


export default function Cart(){
    
    const {books,loading,error}=useBookContext()

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured...</p>

    return(
        <>
        <Nav/>
        <main className="p-5">
             <div className="row">
                <div className="col-md-3 p-4">
                    <Filter/>
                </div>
                
             </div>
        </main>
        </>
    )
}