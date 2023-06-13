import apiClient from '@/plugins/axios'
import type { User } from '@/types/User'
import type { ResponseWithToken } from '@/types/ResponseWithToken'

export async function fetchUserProfile(): Promise<User | {}> {
  try {
    const response = await apiClient.post('profile')
    return response.data
  } catch (error) {
    handleCommonErrors(error)
    return {}
  }
}

export async function sendDataToServer(userCredential: any): Promise<ResponseWithToken> {
  try {
    const response = await apiClient.post('login/firebase', userCredential)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function checkRole(): Promise<any> {
  try {
    const response = await apiClient.post('check-admin-role')
    return response.data.userRole
  } catch (error) {
    handleCommonErrors(error)
  }
}

function removeAccessTokenFromLocalStorage(): void {
  localStorage.removeItem('accessToken')
  console.log('Token removed from localStorage successfully')
}

function handleCommonErrors(error: any): void {
  if (error.response) {
    const { status } = error.response
    if (status === 404 || status === 401) {
      removeAccessTokenFromLocalStorage()
      console.log('Network Error or login token has expired')
    }
  }
  throw error
}
