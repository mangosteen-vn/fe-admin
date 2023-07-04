import apiClient from '@/plugins/axios'
export async function getProductByUuid(uuid: String) {
  try {
    const response = await apiClient.get(`admin/product/` + uuid)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch product')
  }
}
