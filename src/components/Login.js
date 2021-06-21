import React, { useRef, useState } from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
      <div className='main-container'>
        <div className='logout-container'>
          <p>You are already logged in</p>
          <p>Want to logout?</p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
  return (
    <div className='main-container'>
      <div className='login-form-container'>
        <h2>Sign in</h2>
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
          {error && <p>{error}</p>}
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
