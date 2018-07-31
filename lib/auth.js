import {OAUTH_ME_URI} from '@env'
import React from 'react'
import httpClient from './http-client'

export function login() {
  const token = localStorage.getItem('token')

  if (!token) {
    return Promise.resolve(null)
  }

  return httpClient.get(OAUTH_ME_URI, {
    headers: {Authorization: 'Bearer ' + token}
  }).then(response => {
    return response.data
  }).catch(error => {
    localStorage.removeItem('token')

    return error
  })
}

export function logout() {
  localStorage.removeItem('token')

  return null
}

export const UserContext = React.createContext()

export default {
  login,
  logout,
  UserContext
}
