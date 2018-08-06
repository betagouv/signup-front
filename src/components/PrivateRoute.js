import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withUser } from './UserContext';
import { saveCurrentPageForPostloginRedirect } from '../OauthCallback';

const SaveCurrentPageAndRedirect = ({ location }) => {
  saveCurrentPageForPostloginRedirect();

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

// We do not use isLoading, login, logout but we do not want these properties to be forwarded downward as there are added ia the withUser HOC
const PrivateRoute = ({
  component: Component,
  user,
  isLoading,
  login,
  logout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <SaveCurrentPageAndRedirect {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  user: PropTypes.object,
};

PrivateRoute.defaultProps = {
  user: null,
};

export default withUser(PrivateRoute);
