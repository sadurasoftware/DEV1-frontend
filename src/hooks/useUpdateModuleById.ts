import { useMutation } from '@tanstack/react-query'
import { updateModule } from '@/apis/modulesApi'
import { modulesResponse } from '../types/moduleTypes'
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
