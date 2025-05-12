export type projects = {
    id: string,
    name: string,
    organizationId: string,
    comment?: string,
    documents?: string[]
}

export type project = {
    id: string, 
    name: string,
    organizationId: string,
    comment?: string,
}

export type projectUpdate = {
    name?: string;
    comment?: string;
    documents?: string[];
}