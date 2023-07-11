import apiClient from '@/plugins/axios'
export async function getTags(perPage: number = 20, type: string) {
  try {
    const response = await apiClient.get(`admin/tag`, {
      params: {
        per_page: perPage,
        type: type
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch tags')
  }
}
