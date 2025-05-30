import { addDepartment } from '@/apis/departementAPI'
import { departmentName } from '@/types/departmentTypes'
import { useMutation } from '@tanstack/react-query'

export const useCreateDepartment = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (department: departmentName) => addDepartment(department),
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
