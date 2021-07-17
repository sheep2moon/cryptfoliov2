import React, { useEffect, useRef, useState } from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { useHistory } from 'react-router';
import '../styles/profile.scss';
import ErrorMessage from './ErrorMessage';

const Profile = () => {
  const {
    user,
    logout,
    updatePassword,
    updateEmail,
    error,
    status,
    setStatus,
  } = useFirebase();
  const history = useHistory();
  const newPass = useRef();
  const confirmNewPass = useRef();
  const [errorText, setErrorText] = useState('');
  const newEmail = useRef();

  useEffect(() => {
    if (error.password) {
      setErrorText(error.password);
      newPass.current.value = '';
      confirmNewPass.current.value = '';
    } else {
      setErrorText(status.password);
      newPass.current.value = '';
      confirmNewPass.current.value = '';
    }
    if (error.email) {
      setErrorText(error.email);
    }
    return () => {
      setErrorText('');
      setStatus({});
    };
  }, [error]);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleChangePassword = async () => {
    const pass = newPass.current.value;
    const confPass = confirmNewPass.current.value;
    if (pass !== confPass) {
      return setErrorText('passwords musts be the same');
    }
    await updatePassword(pass);
  };

  const handleChangeEmail = async () => {
    const email = newEmail.current.value;
    await updateEmail(email);
  };

  return (
    <div className='main-container'>
      <div className='profile-container'>
        <div className='head'>
          <h1>{user.email}</h1>{' '}
          <button className='btn' onClick={handleLogout}>
            logout
          </button>
        </div>
        {errorText && <ErrorMessage text={errorText} />}

        <div className='option'>
          <p>Change Password</p>
          <div className='input-field'>
            <label htmlFor='newPassword'>new password</label>
            <input ref={newPass} type='password' name='newPassword' />
          </div>
          <div className='input-field'>
            <label htmlFor='newPassword'>confirm new password</label>
            <input ref={confirmNewPass} type='password' name='newPassword' />
          </div>
          <button className='btn' onClick={handleChangePassword}>
            Confirm
          </button>
        </div>
        <div className='option'>
          <p>Change Email</p>
          <div className='input-field'>
            <label htmlFor='newEmail'>new email</label>
            <input ref={newEmail} type='text' name='newEmail' />
          </div>
          <button className='btn' onClick={handleChangeEmail}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
