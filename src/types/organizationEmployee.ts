export type organizationEmployees = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position?: string,
    comment?: string,
    organizationId: string,
}

export type organizationEmployee = {
    id: string,
    firstName: string,
    lastName: string,
    phone?: string,
    email?: string,
    position?: string,
    comment?: string,
    organizationId: string,
}

export type organizationEmployeesWithDocs = {
    id: string,
    firstName: string, 
    lastName: string,
    phone?: string,
    email?: string,
    position?: string,
    comment?: string,
    organizationId: string,
    documents: string[]
}