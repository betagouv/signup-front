import React from 'react';
import PropTypes from 'prop-types';

import { withUser } from '../components/UserContext';

export const saveCurrentPageForPostloginRedirect = () =>
  localStorage.setItem('returnUrl', window.location.pathname);

class OauthCallback extends React.Component {
  componentDidMount() {
    const storedPath = localStorage.getItem('returnUrl') || '/';
    localStorage.removeItem('returnUrl');

    const token = new URL(window.location.href).searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      this.props.login();
    }

    this.props.history.push(storedPath);
  }

  render() {
    return (
      <div className="redirect">
        Vous allez être redirigé dans un instant...
      </div>
    );
  }
}

OauthCallback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  login: PropTypes.func.isRequired,
};

export default withUser(OauthCallback);
