import apiClient from '@/plugins/axios'
import type { InputUserProfile } from '@/types/InputUserProfile'
import type { User } from '@/types/User'
import type { AuthResponse } from '@/types/AuthResponse'

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

export async function sendDataToServer(userProfile: InputUserProfile): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('login/firebase', userProfile)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}