import {createContext, useState, useEffect} from 'react'
import SHOP_DATA from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null
})

export const ProductsProvider = ({children}) => {
    useEffect(() => {
        setProducts(SHOP_DATA)
    }, [])
    
    const [products, setProducts] = useState([])
    const value = {products, setProducts}
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}