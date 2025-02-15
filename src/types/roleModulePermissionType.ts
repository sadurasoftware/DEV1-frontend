export type RoleModulePermission = {
  roleId: number
  modulePermissions: {
    moduleId: number
    permissions: {
      permissionId: number
    }[]
  }[]
}

export type PermissionsData = {
  [moduleId: number]: {
    [permissionId: number]: boolean
  }
}
