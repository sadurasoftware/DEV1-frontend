export type roleType = {
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