import React, {useState, useEffect} from "react"
import GetCatImage from "./GetCatImage"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])
    const headers = {
        method: "GET",
        api_key: "live_yjyE6pmJQmgnMr1UkLebWzFSZyBnuXs1BKLxkSj1Kl3XSjxoEwjVfgdU5Kv8MVNv"
    }
    const url = "https://api.thecatapi.com/v1/images/search?limit=22"
    useEffect(() => {
        fetch(url,{headers})
            .then(res => res.json())
            .then(data =>  setAllPhotos(data))
    }, [])
    
    function toggleFavorite(id) {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        
        setAllPhotos(updatedArr)
    }
    
    function addToCart(newItem) {
        setCartItems(prevItems => [...prevItems, newItem])
    }
    
    function removeFromCart(id) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }
    
    function emptyCart() {
        setCartItems([])
    }
    
    return (
        <Context.Provider value={{
            allPhotos, 
            toggleFavorite, 
            cartItems, 
            addToCart, 
            removeFromCart, 
            emptyCart
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}