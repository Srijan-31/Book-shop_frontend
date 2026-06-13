import {createContext, useContext, useEffect, useState} from 'react'
import useFetch from '../useFetch'


const bookContext=createContext()

const useBookContext=()=>useContext(bookContext)

export  default useBookContext


export function BookProvider({children}){
    const[cart,setCart]=useState(()=>{
        const savedCart=localStorage.getItem("cart")
        return savedCart?JSON.parse(savedCart):[]
    })
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

    const[wishlist, setWishlist]=useState(()=>{
        const savedWishlist=localStorage.getItem("wishlist")
        return savedWishlist?JSON.parse(savedWishlist):[]
    })

    useEffect(()=>{
        localStorage.setItem("wishlist",JSON.stringify(wishlist))
    },[wishlist])

    const[filterPrice, setFilterPrice]=useState(1000)
    const[filterCategory, setFilterCategory]=useState([])
    const[filterRating,setRatingFilter]=useState(0)
    const[priceSort, setPriceSort]=useState("")
    const[search, setSearch]=useState("")

    const clearFilter=()=>{
        setFilterCategory([])
        setRatingFilter(0)
        setPriceSort("")
        setFilterPrice(1000)
    }
    
    const {
        data: books,
        loading: booksLoading,
        error: booksError
    } =useFetch("https://book-shop-backend-iota.vercel.app/books")
    
    const{
        data: categories,
        loading: categoryLoading,
        error: categoryError
    }= useFetch("https://book-shop-backend-iota.vercel.app/categories")

    
    
    const handleCategoryFilter=(categoryId)=>{
        setFilterCategory(prev=>prev.includes(categoryId)?prev.filter(id=>id!==categoryId):[...prev,categoryId])
    }
    const handleRatingFilter=(rating)=>{
        setRatingFilter(rating)
    }
    const handlePriceFilter=(price)=>{
        setFilterPrice(Number(price))
    }
    const handlePriceSorting=(price)=>{
        setPriceSort(price)
    }
    const handleSearchBar=(value)=>{
        setSearch(value)
    }
    
    const filterBooks=books?.filter(book=>{
        const category= filterCategory.length===0 || filterCategory.includes(book?.categoryId)
        const rating= book?.rating>=filterRating
        const price=book?.price<=filterPrice
        const searchBar=search==="" || 
        book?.title.toLowerCase().includes(search.toLowerCase())

        return category && rating && price && searchBar
    })?.sort((a,b)=>{
        if(priceSort==="LowToHigh"){
            return a.price-b.price
        }

        if(priceSort==="HighToLow"){
            return b.price-a.price
        }
        return 0
    })

    /*
    
    */
    

    const addToCart=(book)=>{
        setCart((prevCart)=>[...prevCart,{...book, quantity:1}])
    }
    const increaseQuantity=(id)=>{
        setCart(cart=>cart.map(book=>book._id===id?{...book, quantity: book.quantity+1}:book))
    }
    const decreaseQuantity=(id)=>{
        setCart(cart=>cart.map(book=>book._id===id?{...book, quantity: book.quantity-1}:book))
    }
    const addToWishList=(book)=>{
        setWishlist((prevList)=>[...prevList,book])
    }
    const removeLikedItem=(item)=>{
        setWishlist(wishlist.filter(book=>(
            book._id!==item._id
        )))
    }

    return(
    <bookContext.Provider value={{books: filterBooks, categories, loading: booksLoading || categoryLoading, error: booksError||categoryError, addToCart,addToWishList, filterCategory, handleCategoryFilter, handleRatingFilter, handlePriceFilter,filterPrice, handlePriceSorting , handleSearchBar ,search,cart,setCart,wishlist, removeLikedItem,clearFilter, filterRating, priceSort, increaseQuantity, decreaseQuantity}}>
        {children}
    </bookContext.Provider>
    )
}




