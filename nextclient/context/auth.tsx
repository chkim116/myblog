import React, { createContext } from "react"

export const AppContext = createContext({})

const AuthContext = ({ children }: { children: React.ReactChild }) => {
    const user = {
        id: 1,
        username: "chkim116",
    }
    return <AppContext.Provider value={user}>{children}</AppContext.Provider>
}

export default AuthContext
