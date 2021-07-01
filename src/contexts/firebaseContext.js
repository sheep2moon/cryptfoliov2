import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const FirebaseContext = React.createContext();

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState();

  const register = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setLoginError(err.message);
    });
  };
  const logout = () => auth.signOut();
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const updateEmail = (email) => user.updateEmail(email);
  const updatePassword = (password) => user.updatePassword(password);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsub;
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginError,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!isLoading && children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
