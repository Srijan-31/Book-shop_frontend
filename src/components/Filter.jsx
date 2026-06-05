import useBookContext from "../context/bookContext";
 

export default function Filter(){

    const{categories,books, filterCategory,handleCategoryFilter, handleRatingFilter, filterRating, handlePriceSorting,clearFilter}=useBookContext()
    // console.log(filterRating)


    return(
        <>
        <div className="d-flex justify-content-between align-item-center">
            <h3>Filters</h3> 
            <button className="btn btn-primary w-50" onClick={clearFilter}>Clear</button>
        </div>
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
                        <input
                            type="radio"
                            value={4}
                            className="form-check-input"
                            style={{transform:"scale(1.5)"}}
                            name="rating"
                            onChange={(e)=>handleRatingFilter(Number(e.target.value))}
                        />
                        <label className="form-check-label fs-3">4 stars & above</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            value={3}
                            className="form-check-input"
                            style={{transform:"scale(1.5)"}}
                            name="rating"
                            onChange={(e)=>handleRatingFilter(Number(e.target.value))}
                        />
                        <label className="form-check-label fs-3">3 stars & above</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            value={2}
                            className="form-check-input"
                            style={{transform:"scale(1.5)"}}
                            name="rating"
                            onChange={(e)=>handleRatingFilter(Number(e.target.value))}
                        />
                        <label className="form-check-label fs-3">2 stars & above</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            value={1}
                            className="form-check-input"
                            style={{transform:"scale(1.5)"}}
                            name="rating"
                            onChange={(e)=>handleRatingFilter(Number(e.target.value))}
                        />
                        <label className="form-check-label fs-3">1 star & above</label>
                    </div>
                    <br/>
                <p className="fs-3 fw-bold">Sort by</p>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="price" value="LowToHigh" style={{transform:"scale(1.5)"}} onChange={(e)=>handlePriceSorting(e.target.value)} />
                    <label className="form-check-label fs-3">Price- Low to High</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="price" value="HighToLow" style={{transform:"scale(1.5)"}} onChange={(e)=>handlePriceSorting(e.target.value)} />
                    <label className="form-check-label fs-3">Price- high to low</label>
                </div>
        </>
    )
}