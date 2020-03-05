import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withUser } from './UserContext';
import { hashToQueryParams } from '../lib';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

export const SaveCurrentPageAndRedirect = () => {
  // forward source page param to display a contextualised login page on api-auth
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('source');

  const returnUrl = window.location.pathname;
  const queryParam = hashToQueryParams({
    returnUrl,
    source,
  });

  window.location.href = `${BACK_HOST}/users/auth/api_gouv${queryParam}`;

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
