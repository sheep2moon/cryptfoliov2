import React, { useRef } from 'react';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  };

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
      </form>
    </div>
  );
};

export default Login;
