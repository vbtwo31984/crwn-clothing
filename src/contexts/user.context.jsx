import {createContext, useState, useEffect} from 'react'
import {onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {
    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            console.log(user)
            setCurrentUser(user)
        })
    }, [])
    
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}