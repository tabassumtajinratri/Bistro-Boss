import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";
import { app } from '../Firebase/firebase.config';

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading, setLoading]= useState(true)


    
const createUser = (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)

}

const signIn = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
}

    useEffect(()=>{
       const unsubscribed = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log('current User', currentUser)
            setLoading(false)

        })
        return ()=>{
            return unsubscribed()
        }

    },[])

    const authInfo = {

        user,
        loading,
        createUser,
        signIn,
        logOut
    }


    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;