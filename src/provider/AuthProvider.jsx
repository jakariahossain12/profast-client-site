import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/Context';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // new user create account
    const newUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    // sign in google account
    const signInGoogle = () => {
        setLoading(true);
      return signInWithPopup(auth,provider);
    };
    // sign out user
    const signOutUser = () => {
      return signOut(auth);
    };
    // auth Manage user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    },[])
    const userInfo = {
        loading,
        user,
        newUser,
        signInUser,
        signInGoogle,
        signOutUser,
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;