/**
 * plugins/axios.ts
 *
 * Framework documentation: https://axios-http.com/docs/intro`
 */
import axios from 'axios'

// @ts-ignore
const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config: { headers: { [x: string]: string } }) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default apiClient
