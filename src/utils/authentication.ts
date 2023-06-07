import apiClient from '@/plugins/axios'
import type { User } from '@/types/User'
import type { ResponseWithToken } from '@/types/ResponseWithToken'
import type { AxiosResponse } from 'axios'

export async function fetchUserProfile(): Promise<User | null> {
  try {
    const response = await apiClient.post('profile')
    return response.data
  } catch (e) {
    // @ts-ignore
    if (e.message == 'Network Error') {
      localStorage.removeItem('accessToken')
    }
    // @ts-ignore
    if (e.response && e.response.status === 401) {
      localStorage.removeItem('accessToken')
      console.log('Login token has expired, removed token from localStorage successfully')
    }
    throw e
  }
}
export async function sendDataToServer(userCredential: any): Promise<ResponseWithToken> {
  try {
    const response: AxiosResponse = await apiClient.post('login/firebase', userCredential)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function checkRole() {
  try {
    const response: AxiosResponse = await apiClient.post('check-admin')
    return response.data
  } catch (e) {
    // @ts-ignore
    if (e.message == 'Network Error') {
      localStorage.removeItem('accessToken')
    }
    // @ts-ignore
    if (e.response && e.response.status === 401) {
      localStorage.removeItem('accessToken')
      console.log('Login token has expired, removed token from localStorage successfully')
    }
    throw e
  }
}
