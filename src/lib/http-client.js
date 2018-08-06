import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';

  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.reload() // will generate new state from scratch, hence emptying user in UserContext
    }

    return Promise.reject(error)
  }
)

export default axios
