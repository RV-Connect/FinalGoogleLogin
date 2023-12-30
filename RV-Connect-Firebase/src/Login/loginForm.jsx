import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import pushUidToMainDB from '../config/Functions/pushUidToMainDB';
import getUserFromEmail from '../config/Functions/getUserFromEmail';

const LoginForm = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log(user);

            // Check if the user already exists
            const existingUser = await getUserFromEmail(user.email);
            console.log(existingUser);
            console.log('Existing User:', existingUser);

            if (existingUser === "AAz7ytCq1Y2CFow9FaQDTwaDmkeNAE85") {
                await signOut(auth);
                console.log('User not found. Redirecting to SignUpForm.');
                navigate('/SignUpForm');
            } else {
                console.log('User already exists in the database.');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };


    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/logOutPage');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="login-container">
            {user ? (
                // User is logged in, display user details and log out button
                <>
                    <div>
                        <img src={user.photoURL} alt="User Profile" />
                        <p>{user.displayName}</p>
                    </div>
                    <button onClick={logOut}>Log Out</button>
                </>
            ) : (
                // User is not logged in, display sign in with Google button
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            )}
        </div>
    );
};

export default LoginForm;
