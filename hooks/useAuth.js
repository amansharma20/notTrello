import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from '@firebase/auth';
import { auth, androidClientId } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
                setIsLoadingInitial(false);
            });
        }, [])

    const config = {
        androidClientId: androidClientId,
        scopes: ["profile", "email"],
        permissions: ["public_profile", "email", "gender", "location"]
    }

    const signInWithGoogle = async () => {
        setIsLoading(true);
        await Google.logInAsync(config)
            .then(async (logInResult) => {
                if (logInResult.type === "success") {
                    const { idToken, accessToken } = logInResult;
                    const credential = GoogleAuthProvider.credential(idToken, accessToken);
                    await signInWithCredential(auth, credential);
                }
                return Promise.reject();
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    };

    const logout = () => {
        console.log('here')
        setIsLoading(false);
        console.log('here')
        signOut(auth)
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    };

    const memoedValue = useMemo(
        () => ({
            user,
            isLoading,
            error,
            signInWithGoogle,
            logout,
        }), [user, isLoading, error]);


    return (
        <AuthContext.Provider value={memoedValue}>
            {!isLoadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
};
