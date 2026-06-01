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
    const[filterCategory, setFilterCategory]=useState([])
    const[filterRating,setRatingFilter]=useState(0)
    const[priceSort, setPriceSort]=useState("")
    const[search, setSearch]=useState("")

    
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

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    
    const handleCategoryFilter=(categoryId)=>{
        setFilterCategory(prev=>prev.includes(categoryId)?prev.filter(id=>id!==categoryId):[...prev,categoryId])
    }
    const handleRatingFilter=(rating)=>{
        setRatingFilter(rating)
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
        const searchBar=search==="" || 
        book?.title.toLowerCase().includes(search.toLowerCase())

        return category && rating && searchBar
    })?.sort((a,b)=>{
        if(priceSort==="LowToHigh"){
            return a.price-b.price
        }

        if(priceSort==="HighToLow"){
            return b.price-a.price
        }
        return 0
    })
    

    const addToCart=(item)=>{
        setCart((prevCart)=>[...prevCart,item])
    }

    return(
    <bookContext.Provider value={{books: filterBooks, categories, loading: booksLoading || categoryLoading, error: booksError||categoryError, addToCart, filterCategory, handleCategoryFilter, handleRatingFilter, handlePriceSorting , handleSearchBar ,search,cart,setCart, filterRating}}>
        {children}
    </bookContext.Provider>
    )
}




