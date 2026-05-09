import {createContext, useContext, useState} from 'react'
import useFetch from '../useFetch'

const bookContext=createContext()

const useBookContext=()=>useContext(bookContext)

export  default useBookContext


export function BookProvider({children}){
    const[cart,setCart]=useState([])
    const[filterCategory, setFilterCategory]=useState([])
    const[filterRating,setRatingFilter]=useState(0)

    
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
    const filterBooks=books?.filter(book=>{
        const category=filterCategory.length===0 || filterCategory.includes(book?.categoryId)
        const rating=book?.rating>=filterRating

        return category && rating
    }
    )




    const addToCart=(item)=>{
        setCart((prevCart)=>[...prevCart,item])
    }

    return(
    <bookContext.Provider value={{books: filterBooks, categories, loading: booksLoading || categoryLoading, error: booksError||categoryError, addToCart, filterCategory, handleCategoryFilter, handleRatingFilter, filterRating}}>
        {children}
    </bookContext.Provider>
    )
}




