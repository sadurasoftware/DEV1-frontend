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
  })

  return {
    deleteModule,
    isModuleError,
    moduleError,
    deleteModulePending,
  }
}
