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
