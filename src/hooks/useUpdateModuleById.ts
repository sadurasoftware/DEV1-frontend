import { useMutation } from '@tanstack/react-query'
import { updateModule } from '@/apis/modulesApi'
import { modulesResponse } from '../types/moduleTypes'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/loginType'

export const useUpdateModuleById = () => {
  const {
    mutate,
    isPending: updateModulePending,
    isError: isModuleUpdateError,
    error: updateModuleError,
    isSuccess: updateModuleSuccess,
  } = useMutation<modulesResponse, ErrorResponse, { id: number; name: string }>(
    {
      mutationFn: async ({ id, name }) => {
        return await updateModule(id, name)
      },
      onSuccess: data => {
        console.log('Module data updated:', data)
      },
      onError: (error: ErrorResponse) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError
          console.error(axiosError.message || 'An unexpected error occurred')
        } else {
          console.error('An unexpected error occurred.', error)
        }
      },
    }
  )

  return {
    mutate,
    updateModulePending,
    isModuleUpdateError,
    updateModuleError,
    updateModuleSuccess,
  }
}
