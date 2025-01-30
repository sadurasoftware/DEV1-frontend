export type PermissionTemplateAdmin = {
    name: string;
    description: string;
    applicableOn: string;
    permissions: {
      create: boolean;
      view: boolean;
      update: boolean;
      delete: boolean;
      export: boolean;
    };
  }
  