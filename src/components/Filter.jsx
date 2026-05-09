import useBookContext from "../context/bookContext";
 

export default function Filter(){

    const{categories,filterCategory,handleCategoryFilter, handleRatingFilter, filterRating}=useBookContext()

    return(
        <>
            <h3>Filters</h3>
                <p className="fs-3 fw-bold">Price</p>
                <p className="fs-3 fw-bold">Category</p>
                    {categories?.map(category=>
                        <div className="form-check">
                            <input 
                            type="checkbox" 
                            className="form-check-input" 
                            value={category?.name}  
                            style={{
                                transform: "scale(1.5)",
                                cursor: "pointer"
                            }}
                            onChange={()=>handleCategoryFilter(category?._id)}
                            />
                            <label className="form-check-label fs-3">{category?.name}</label>
                        </div>
                    )}
                <br/>
                <p className="fs-3 fw-bold">Rating</p>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" style={{transform: "scale(1.5)"}} value={4} name="rating"
                        checked={filterRating===4} 
                        onChange={(e)=>handleRatingFilter(Number(e.target.value))} />
                        <label className="form-check-label fs-3">4 Stars & above</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" style={{transform: "scale(1.5)"}} value={3} name="rating"
                        checked={filterRating===3}
                        onChange={(e)=>handleRatingFilter(Number(e.target.value))} />
                        <label className="form-check-label fs-3">3 Stars & above</label>
                    </div>
                    <div className="form-check">                    
                        <input type="radio" className="form-check-input" style={{transform: "scale(1.5)"}} value={2} name="rating"
                        checked={filterRating===2}
                        onChange={(e)=>handleRatingFilter(Number(e.target.value))} />
                        <label className="form-check-label fs-3">2 Stars & above</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" style={{transform: "scale(1.5)"}} value={1} name="rating"
                        checked={filterRating===1}
                        onChange={(e)=>handleRatingFilter(Number(e.target.value))} />
                        <label className="form-check-label fs-3">1 Stars & above</label>
                    </div>
        </>
    )
}