import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { resetUserContext } from '../components/UserContext';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

axios.defaults.adapter = httpAdapter;

axios.interceptors.request.use(config => {
  if (new URL(config.url).origin === BACK_HOST) {
    config.withCredentials = true;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      new URL(error.config.url).origin === BACK_HOST
    ) {
      // This is bad. Find out why in this function doc !
      resetUserContext();
    }

    return Promise.reject(error);
  }
);

export default axios;
