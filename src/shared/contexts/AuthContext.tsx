import { User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Loader } from "../components"
import { authConfig } from '../environment/firebase-config'

type TAuthContext = {
  user: User | null
}

const AuthContext = createContext({} as TAuthContext)

export const useAuthContext = () => useContext(AuthContext)

export const PrivateRoute: React.FC = () => {
  const { user } = useAuthContext()

  return !!user ? <Outlet /> : <Navigate to="/login" />
}

export const AuthProvider: React.FC = ({ children }) => {
  const [ user, setUser ] = useState<User | null>(null)
  const [ loader, setLoader ] = useState(true)

  useEffect(() => {
    authConfig.onAuthStateChanged(user => {
      setUser(user)
      setLoader(false)
    })
  }, [])

  return !loader ?
    <AuthContext.Provider value={{ user }}>
     {children}
    </AuthContext.Provider> :
    <Loader />
}