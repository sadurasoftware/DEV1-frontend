export type moduleType = {
    id:number;
    name:string;
}

export type moduleName = {
    name:string;
}

export type modulesType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type modulesResponse = {
    message: string;
    module: modulesType[];
}

