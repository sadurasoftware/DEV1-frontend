import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { departmentName, departmentsResponse } from '@/types/departmentTypes'
import axios, { AxiosResponse } from 'axios'
import api from '@/lib/api'

export const fetchDepartments = async (): Promise<departmentsResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.get('/api/department/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const addDepartment = async (
  role: departmentName
): Promise<departmentsResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<departmentsResponse> = await axios.post(
    'http://localhost:3000/api/department/create',
    {
      name: role.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}

export const deleteDepartmentById = async (
  departmentId: number
): Promise<departmentsResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<departmentsResponse> = await axios.delete(
    `http://localhost:3000/api/department/delete/${departmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (res.status !== 200) {
    throw new Error('Error deleting role')
  }
  return res.data
}

export const updateDepartment = async (
  id: number,
  name: string
): Promise<departmentsResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.put(
    `http://localhost:3000/api/department/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
