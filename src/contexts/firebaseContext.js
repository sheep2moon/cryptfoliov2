import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const FirebaseContext = React.createContext();

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const [status, setStatus] = useState({});

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
    let succes = true;
    user.updatePassword(password).catch((err) => {
      succes = false;
      setError({ ...error, password: err.message });
    });
    if (succes) {
      setError({ ...error, password: '' });
      setStatus({ ...status, password: 'Password changed successfully' });
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
    status,
    setStatus,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!isLoading && children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
