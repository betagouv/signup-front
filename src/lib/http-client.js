import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const {
  REACT_APP_BACK_HOST: BACK_HOST,
  REACT_APP_OAUTH_HOST: OAUTH_HOST,
} = process.env;

axios.defaults.adapter = httpAdapter;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if ([OAUTH_HOST, BACK_HOST].includes(new URL(config.url).origin)) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      [OAUTH_HOST, BACK_HOST].includes(new URL(error.config.url).origin)
    ) {
      localStorage.removeItem('token');
      window.location.reload(); // will generate new state from scratch, hence emptying user in UserContext
    }

    return Promise.reject(error);
  }
);

export default axios;
