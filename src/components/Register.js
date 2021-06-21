import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFirebase } from '../contexts/firebaseContext';

const Register = () => {
  const { user, register, logout } = useFirebase();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);

  const validateInput = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (validateInput(email, password, confirmPassword)) {
      try {
        await register(email, password);
        history.push('/');
      } catch (err) {
        console.log(err);
        setError(err);
      }
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
    <div className='main-container'>
      <div className='login-form-container'>
        <h2>Register </h2>
        <form action='' onSubmit={(e) => handleSubmit(e)}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input ref={emailRef} type='text' name='email' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input ref={passwordRef} type='password' name='password' />
          </div>
          <div className='input-field'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              ref={confirmPasswordRef}
              type='password'
              name='confirmPassword'
            />
          </div>
          <button className='btn' type='submit'>
            Register
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
