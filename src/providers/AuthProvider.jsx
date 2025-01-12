import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();



    // new GoogleAuthProvider, signInWithPopup---> এর ব্যবহার করা হয় নতুন User কে সরাসরি  google দিয়ে Sign in করার জন্য

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    //createUserWithEmailAndPassword---> এর ব্যবহার করা হয় নতুন User এর  Sign Up/Register করার জন্য
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //updateProfile---> এর ব্যবহার করা হয় নতুন User এর  Sign Up/Register করার সময় User এর name ও photoURL যুক্ত করা এবং পরবর্তিতে আপডেট করার জন্য  

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    //signInWithEmailAndPassword---> এর ব্যবহার করা হয় পুরাতন User এর email, password দিয়ে Sign in/login করার জন্য
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
            //console.log("Current/Present User After Login:", currentUser);
            //setLoading(false);

            if (currentUser?.email) {
                const userInfo = { email: currentUser.email }

                //-----------> jwt token create documentation-->

                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        //console.log('Login Create Token', res.data);
                        if (res.data.token) {
                            localStorage.setItem('Access-Token', res.data.token);
                        }
                        //setLoading(false);
                    })
            }

            else {

                //---Token কে cookies এ না রেখে localStorage এ রাখা হয়েছে-->
                //Logout করলে token remove হয়ে যাবে।
                localStorage.removeItem('Access-Token')
            }

            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }

    }, [axiosPublic])




    const authInfo = {
        user,
        loading,
        googleSignIn,
        signIn,
        createUser,
        updateUserProfile,
        logOut,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;