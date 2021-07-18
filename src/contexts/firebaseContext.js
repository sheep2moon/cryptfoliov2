import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const FirebaseContext = React.createContext();

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  const register = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setError({ ...error, login: err.message });
    });
  };
  const logout = () => auth.signOut();
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const updateEmail = (email) =>
    user.updateEmail(email).catch((err) => {
      setError({ ...error, email: err.message });
    });
  const updatePassword = (password) => {
    let success = true;
    user.updatePassword(password).catch((err) => {
      success = false;
      setError({ ...error, password: err.message });
    });
    if (success) {
      console.log('success');
      setError({ ...error, password: '' });
      return true;
    }
  };

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
    error,
    setError,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!isLoading && children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
