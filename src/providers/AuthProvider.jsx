import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)










   


    //createUserWithEmailAndPassword---> এর ব্যবহার করা হয় নতুন User এর  Sign Up/Register বা করার জন্য

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

 //signInWithEmailAndPassword---> এর ব্যবহার করা হয় নতুন User এর  Sign in/login করার জন্য

 const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}

 //signOut---> এর ব্যবহার করা হয়, signIn করা নতুন User কে logOut করার জন্য

 const logOut = () => {
    setLoading(true);
    return signOut(auth);
}



    //onAuthStateChanged--> এর ব্যবহার করা হয় লগিন করার পরে User কে সেভ করে রাখার জন্য।

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("Current/Present User After Login:", currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }

    })




    const authInfo = {
        user,
        loading,
        signIn,
        createUser,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;