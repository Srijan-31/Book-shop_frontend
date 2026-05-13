import useBookContext from '../context/bookContext'
import {Link} from 'react-router-dom'
export default function Home(){

    const {categories, loading, error}=useBookContext()
    // console.log(categories)

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>
    return(
        <main className='container'>
            <div className='py-4'>
                <div className='row'>
                {categories?.map(category=>(
                        <div className='col-md-2  px-3'>
                            <div className='position-relative overflow-hidden'>
                                <Link to={`/category/${category?._id}`}>
                                    <img src="https://www.priceselfstorage.com/blog/wp-content/uploads/2018/04/heart-bookshelf.jpg" style={{width:"170px", height:"150px"}} className='img-fluid' />
                                </Link>
                                <div className='position-absolute start-0 top-50 w-100 text-center  bg-white' key={category._id}>
                                    <span>{category?.name}</span>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
            </div>

            <div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <Link to="/products"><img 
                        src="https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg" alt="Book wallpaper" /></Link>
                    </div>
                </div>
            </div>
        </main>
    )
}