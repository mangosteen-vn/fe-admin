import apiClient from '@/plugins/axios'
export async function getCollections(perPage: number = 20) {
  try {
    const response = await apiClient.get(`admin/collection`, {
      params: {
        per_page: perPage
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch collections')
  }
}
