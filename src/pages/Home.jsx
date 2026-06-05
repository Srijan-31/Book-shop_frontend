import useBookContext from '../context/bookContext'
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'
export default function Home(){

    const {categories, loading, error}=useBookContext()
    // console.log(categories)

    if(loading) return <p>Loading...</p>
    if(error) return <p>An error occured.</p>
    return(
        <>
        <Nav/>
        <main className='container'>
            <div className='py-4'>
                <div className='row'>
                {categories?.map(category=>(
                        <div className='col-md-2  px-3'>
                            <div className='position-relative overflow-hidden'>
                                <Link to={`/category/${category?._id}`}>
                                    <img src="https://www.wallpapergap.com/wp-content/uploads/2024/10/book-stack-wallpapers.jpg" style={{width:"170px", height:"150px"}} className='img-fluid' />
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
                    <div className='col-md-12 text-center mt-4'>
                        <Link to="/products"><img 
                        src="https://c1.wallpaperflare.com/preview/127/366/443/library-book-bookshelf-read.jpg" alt="Book wallpaper" style={{width:"100%"}} /></Link>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}