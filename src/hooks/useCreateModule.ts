import { useMutation } from '@tanstack/react-query'
import { addModule } from '@/apis/modulesApi'
import { moduleName } from '@/types/moduleTypes'

export const useCreateModule = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (module: moduleName) => addModule(module),
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
