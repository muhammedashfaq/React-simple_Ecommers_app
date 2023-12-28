import { createContext, useContext, useEffect, useState } from 'react'
const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null)
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload) {
                setUserName(payload.name)
            }
        } else {
            console.log('error here')
        }
    }, [])
   return (
        <UserContext.Provider value={{ userName }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
