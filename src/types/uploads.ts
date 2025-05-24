import { HexString } from "../dtos/main.dto"

export type UploadOwnerEntity = {
    Project: 'project',
    Employee: 'employee',
    Expert: 'expert',
    Report: 'report',
};

export type Upload = {
    entity?: UploadOwnerEntity
    owner?: HexString  
}

export type Document = {
    id: string
    extension: string
    mimeType: string
    originalName: string
    url: string
}
