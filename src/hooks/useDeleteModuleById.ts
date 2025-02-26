import { deleteModuleById } from '@/apis/modulesApi'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import { modulesResponse } from '../types/moduleTypes'

export const useDeleteModuleById = () => {
  const {
    mutate: deleteModule,
    isError: isModuleError,
    error: moduleError,
    isPending: deleteModulePending,
  } = useMutation<modulesResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deleteModuleById(id),
    onSuccess: () => {
      console.log('Module deleted successfully')
    },
    onError: (error: ErrorResponse) => {
      console.error('Error deleting role:', error)
    },
  })

  return {
    deleteModule,
    isModuleError,
    moduleError,
    deleteModulePending,
  }
}
