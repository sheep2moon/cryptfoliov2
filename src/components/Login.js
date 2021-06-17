import React, { useRef, useState } from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, user, logout } = useFirebase();
  const history = useHistory();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await login(email, password);
      history.push('/');
    } catch {
      setError('wrong credentials');
    }
  };

  if (user) {
    return (
      <div className='logout-container'>
        <p>You are already logged in</p>
        <p>Want to logout?</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  return (
    <div className='login-form-container'>
      <p>Sign in</p>
      <form action='' onSubmit={(e) => handleSubmit(e)}>
        <div className='input-field'>
          <label htmlFor='email'>email</label>
          <input ref={emailRef} type='text' name='email' />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>password</label>
          <input ref={passwordRef} type='text' name='password' />
        </div>
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
