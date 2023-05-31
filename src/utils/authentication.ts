import apiClient from '@/plugins/axios'
import type { User } from '@/types/User'
import type { ResponseWithToken } from '@/types/ResponseWithToken'
import type { AxiosResponse } from 'axios'

export async function fetchUserProfile(): Promise<User | null> {
  try {
    const response = await apiClient.post('profile')
    return response.data
  } catch (error) {
    console.log(error)
    // @ts-ignore
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken')
      console.log('Login token has expired, removed token from localStorage successfully')
    }
    return null
  }
}

export async function sendDataToServer(userCredential: any): Promise<ResponseWithToken> {
  try {
    const response: AxiosResponse = await apiClient.post('login/firebase', userCredential)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
