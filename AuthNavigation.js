import React, { useEffect, useState, createContext } from 'react'
import TabNavigator from './components/TabNavigator'
import LoginStack from './components/LoginStack'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'

const LoginContex = createContext()

const AuthNavigation = ({Children}) => {
    // const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(null)

  const useHandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null)
  
    useEffect(() => 
    onAuthStateChanged(auth, user => useHandler(user)),
  
  [])
    return currentUser ? <TabNavigator/> : <LoginStack/>

    // <LoginContex.Provider value={{loggedIn, setLoggedIn}}>
    //     {Children}
    // </LoginContex.Provider>
    
    
}

export default AuthNavigation;