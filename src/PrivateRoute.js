import React from 'react';
import { useFirebase } from './contexts/firebaseContext';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useFirebase();
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
