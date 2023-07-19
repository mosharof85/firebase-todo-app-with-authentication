import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/FirebaseConfig";

//Create context

const AuthUserContext = createContext(null);

//create a function and include all variables and functions that you want to use throughout the application. and export it as default

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async function (user) {
      setIsLoading(true);

      if (!user) {
        setAuthUser(null);
        setIsLoading(false);
        return;
      }

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: user.displayName,
      });
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    setAuthUser,
    setIsLoading,
  };
}

//create provider and export

export const AuthUserProvider = ({ children }) => {
  const contextVariables = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={contextVariables}>
      {children}
    </AuthUserContext.Provider>
  );
};

//create a finction to make the context available using useContext. And export it

export const useAuthUserContext = () => useContext(AuthUserContext);

// now use the provider in app.js
