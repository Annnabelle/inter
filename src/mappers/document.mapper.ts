import { CreateUploadDto } from "../dtos/documents";
import { Upload } from "../types/documents";

export function createExpertToCreateExpertDto(document: Upload): CreateUploadDto {
    return {
        entity: {
            project: document.entity?.Project,
            employee: document.entity?.Employee,
            expert: document.entity?.Expert,
            report: document.entity?.Report,
        },
        owner: document.owner
    }
}