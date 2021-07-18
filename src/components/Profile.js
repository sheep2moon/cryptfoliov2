import React, { useEffect, useRef, useState } from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { useHistory } from 'react-router';
import '../styles/profile.scss';
import ErrorMessage from './ErrorMessage';
import Alert from './Alert';

const Profile = () => {
  const { user, logout, updatePassword, updateEmail, error } = useFirebase();
  const history = useHistory();
  const newPass = useRef();
  const confirmNewPass = useRef();
  const [errorText, setErrorText] = useState('');
  const [alertText, setAlertText] = useState('');
  const newEmail = useRef();

  useEffect(() => {
    if (error.password) {
      setErrorText(error.password);
      newPass.current.value = '';
      confirmNewPass.current.value = '';
    }
    if (error.email) {
      setErrorText(error.email);
    }
    return () => {
      setErrorText('');
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
    const succes = await updatePassword(pass);
    if (succes) {
      newPass.current.value = '';
      confirmNewPass.current.value = '';
      setAlertText('Password changed successfully');
      setTimeout(() => {
        setAlertText('');
      }, 3000);
    }
  };

  const handleChangeEmail = async () => {
    const email = newEmail.current.value;
    await updateEmail(email);
  };

  return (
    <div className='main-container'>
      <div className='profile-container'>
        <Alert text={alertText} />
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
