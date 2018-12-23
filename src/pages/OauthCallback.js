import React from 'react';
import PropTypes from 'prop-types';

import { withUser } from '../components/UserContext';

export const saveCurrentPageForPostloginRedirect = () =>
  localStorage.setItem('returnUrl', window.location.pathname);

export class OauthLink extends React.Component {
  handleAuthoriseClick = event => {
    event.preventDefault();
    localStorage.setItem('returnUrl', window.location.pathname);

    window.location = this.props.href;
  };

  render() {
    const { children, className } = this.props;

    return (
      <a onClick={this.handleAuthoriseClick} className={className}>
        {children}
      </a>
    );
  }
}

OauthLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

class OauthCallback extends React.Component {
  componentDidMount() {
    const storedPath = localStorage.getItem('returnUrl') || '/';
    localStorage.removeItem('returnUrl');

    const token = new URL(window.location.href).searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      this.props.login();
    }

    const tokenFc = new URL(window.location.href).searchParams.get('token-fc');
    if (tokenFc) {
      localStorage.setItem('token-fc', tokenFc);
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
