import React from 'react';
import { useFirebase } from '../contexts/firebaseContext';
import { useHistory } from 'react-router';

const Profile = () => {
  const { user, logout } = useFirebase();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };
  return (
    <div className='main-container'>
      <p>hello {user.email}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Profile;
