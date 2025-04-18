import { loggedout, logoutProps } from '@/types/loginType'
import { AxiosResponse } from 'axios'
import api from '@/lib/api'

export const logout = async ({
  token,
  clearLoginInfo,
}: logoutProps): Promise<loggedout> => {
  clearLoginInfo()

  try {
    const res: AxiosResponse = await api.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res) {
      throw new Error('Error fetching API')
    }

    return res.data
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}
