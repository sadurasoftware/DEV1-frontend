import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { categoriesResponse, categoryName } from '@/types/categoryTypes'
import axios, { AxiosResponse } from 'axios'

export const fetchCategories = async (): Promise<any> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.get('http://localhost:3000/api/category/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const addCategory = async (
  category: categoryName
): Promise<categoriesResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<categoriesResponse> = await axios.post(
    'http://localhost:3000/api/category/create',
    {
      name: category.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res || !res.data) {
    throw new Error('Error fetching API')
  }

  return res.data
}

export const deleteCategoryById = async (
  id: number
): Promise<categoriesResponse> => {
  const token = useLoginInfoStore.getState().token
  console.log(`Category Id:${id}\tToken:${token}`)
  const res: AxiosResponse<categoriesResponse> = await axios.delete(
    `http://localhost:3000/api/category/delete/${id}`,
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

export const updateCategory = async (
  id: number,
  name: string
): Promise<categoriesResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.put(
    `http://localhost:3000/api/category/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
