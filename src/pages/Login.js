import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withUser } from '../components/UserContext';

const {
  REACT_APP_OAUTH_CLIENT_ID: OAUTH_CLIENT_ID,
  REACT_APP_OAUTH_AUTHORIZE_URI: OAUTH_AUTHORIZE_URI,
  REACT_APP_OAUTH_REDIRECT_URI: OAUTH_REDIRECT_URI,
} = process.env;

const Login = ({ user }) => {
  const authorizeUri = `${OAUTH_AUTHORIZE_URI}?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    OAUTH_REDIRECT_URI
  )}&scope=&response_type=token&state=`;

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="section-grey">
      <div className="container text-center">
        <h2>Vous devez vous connecter avant de continuer</h2>
        <a href={authorizeUri} className="button large">
          Se connecter
        </a>
      </div>
    </section>
  );
};

Login.propTypes = {
  user: PropTypes.object,
};

Login.defaultProps = {
  user: null,
};

export default withUser(Login);
