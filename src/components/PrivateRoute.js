import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withUser } from './UserContext';
import { saveCurrentPageForPostloginRedirect } from '../pages/OauthCallback';

const { REACT_APP_OAUTH_AUTHORIZE_URI: OAUTH_AUTHORIZE_URI } = process.env;

const SaveCurrentPageAndRedirect = () => {
  saveCurrentPageForPostloginRedirect();

  window.location.href = OAUTH_AUTHORIZE_URI;

  return null;
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
