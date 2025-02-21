export type RoleModulePermission = {
  roleId: number
  roleModules: {
    moduleId: number
    Permissions: {
      permissionId: number
    }[]
  }[]
}

export type PermissionsData = {
  [moduleId: number]: {
    [permissionId: number]: boolean
  }
}

export type createModulePermissionType = {
  roleId: number
  moduleId: number
  permissionId: number
  status: boolean
}

export type successResponse = {
  message: string
}
