import React from 'react';
import PropTypes from 'prop-types';
import httpClient from '../lib/http-client';
const { REACT_APP_OAUTH_ME_URI: OAUTH_ME_URI } = process.env;

export const UserContext = React.createContext();

export function withUser(Component) {
  return props => (
    <UserContext.Consumer>
      {userProps => <Component {...props} {...userProps} />}
    </UserContext.Consumer>
  );
}

export class UserStore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.login();
  }

  login = () => {
    this.setState({ isLoading: true });
    const token = localStorage.getItem('token');
    if (!token) {
      return this.setState({ isLoading: false });
    }

    return httpClient
      .get(OAUTH_ME_URI)
      .then(response => {
        this.setState({ user: response.data, isLoading: false });

        return response.data;
      })
      .catch(error => {
        this.setState({ isLoading: false });

        throw error;
      });
  };

  logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // will empty user from state by reloading the entire app
  };

  render() {
    const { children } = this.props;
    const { user, isLoading } = this.state;

    return (
      <UserContext.Provider
        value={{ user, isLoading, login: this.login, logout: this.logout }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserStore.propTypes = {
  children: PropTypes.node,
};

UserStore.defaultProps = {
  children: null,
};
