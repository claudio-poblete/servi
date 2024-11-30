/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react'
import { mockData } from '../data/mockData'

const AuthContext =  createContext()

const AuthProvider = ( { children } ) => {
  const [user, setUser] = useState(null)
  const login = (email, password) => {
    const foundUser = mockData.usuarios.find( (u) => u.email === email && u.contraseña === password)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error ('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

const AuthContextModule = {
  AuthProvider,
  useAuth,
}

export default AuthContextModule
