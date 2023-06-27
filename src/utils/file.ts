import apiClient from '@/plugins/axios'

export async function uploadImage(formData: any): Promise<string | {}> {
  try {
    const response = await apiClient.post('upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.webp_path
  } catch (error) {
    return {}
  }
}
