export type RoleModulePermission = {
  roleId: number
  modulePermissions: [
    {
      moduleId: number
      permissions: [
        {
          permissionId: number
        },
      ]
    },
  ]
}
