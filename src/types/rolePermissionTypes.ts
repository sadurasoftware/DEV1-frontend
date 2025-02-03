export type roleType = {
    id:number;
    name:string;
}

export type roleName = {
    name:string;
}

export type rolesType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type rolesResponse = {
    message: string;
    roles: rolesType[];
}

export type permissionsType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type permissionsResponse = {
    message: string;
    permission: permissionsType[];
}

