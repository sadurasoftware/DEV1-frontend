export type departmentType = {
  id: number
  name: string
}

export type departmentName = {
  name: string
}

export type departmentsType = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type departmentsResponse = {
  message: string
  departments: departmentsType[]
}
