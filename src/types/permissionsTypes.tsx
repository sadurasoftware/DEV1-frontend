export type permissionType = {
  id: number
  name: string
}

export type permissionName = {
  name: string
}

export type permissionsType = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type permissionsResponse = {
  message: string
  permission: permissionsType[]
}
