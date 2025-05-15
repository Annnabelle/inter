import { HexString } from "../dtos/main.dto"
import { Document } from "./documents"

export type OrganizationEmployees = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    position?: string,
    comment?: string,
    organizationId: HexString,
    documents: HexString[]
}

export type OrganizationEmployee = {
    id: HexString, // поэтому сказал везде использовать, чтобы потом урл вместо айдишки не пытаться отправить
    firstName: string,
    lastName: string,
    phone?: string,
    email?: string,
    position?: string,
    comment?: string,
    organizationId: HexString,
    documents?: HexString[]
}

export type OrganizationEmployeeWithDocs = {
    id: HexString,
    firstName: string, 
    lastName: string,
    phone?: string,
    email?: string,
    position?: string,
    comment?: string,
    organizationId: HexString,
    documents: Document[]
}