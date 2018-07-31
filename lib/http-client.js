import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import Router from 'next/router'
import {saveCurrentPageForPostloginRedirect} from '../pages/oauth-callback.html'
import {logout} from './auth'

axios.defaults.adapter = httpAdapter

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      saveCurrentPageForPostloginRedirect()
      logout()

      return Router.push('/')
    }

    return Promise.reject(error)
  }
)

export default axios
