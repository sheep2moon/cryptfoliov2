import React, { useEffect, useRef, useState } from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, user, logout, error } = useFirebase();
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (error.login) {
      setErrorText(error.login);
      passwordRef.current.value = '';
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await login(email, password);
  };

  if (user) {
    return (
      <div className='main-container'>
        <div className='logout-container'>
          <h1>Want to logout?</h1>
          <button className='btn' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='main-container'>
      <div className='login-form-container'>
        <h2>Sign in</h2>
        {errorText && <ErrorMessage text={errorText} />}
        <form action='' onSubmit={(e) => handleSubmit(e)}>
          <div className='input-field'>
            <label htmlFor='email'>email</label>
            <input ref={emailRef} type='text' name='email' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>password</label>
            <input ref={passwordRef} type='password' name='password' />
          </div>
          <button className='btn' type='submit'>
            Login
          </button>
        </form>

        <div className='not-register'>
          <p>don't have an account?</p>
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
