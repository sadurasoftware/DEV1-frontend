import { AxiosResponse } from 'axios'
import { LoginUser, LoggedInUser } from '@/types/loginType'
import api from '@/lib/api'

export const loginUser = async (user: LoginUser): Promise<LoggedInUser> => {
  const res: AxiosResponse = await api.post(
    `/api/auth/login`,
    {
      email: user.email,
      password: user.password,
    }
  )

  if (!res) {
    throw new Error('Error fetching API')
  }
  return res.data
}
