import {createContext, useState, useEffect} from 'react'
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {
    useEffect(() => {
        return onAuthStateChangedListener(async (user) => {
            if(user) {
                await createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
    }, [])
    
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}