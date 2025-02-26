import { loggedout, logoutProps } from '@/types/loginType'
import axios, { AxiosResponse } from 'axios'

export const logout = async ({
  token,
  clearLoginInfo,
}: logoutProps): Promise<loggedout> => {
  clearLoginInfo()

  try {
    const res: AxiosResponse = await axios.post(
      'http://localhost:3000/api/auth/logout',
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
