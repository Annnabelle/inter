import { CreateUploadDto } from "../dtos/uploads";
import { Upload } from "../types/uploads";

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

// export function deleteUploadToDeleteUploadDto(uploads: Upload): DeleteUploadQueryDto {
//     return {
//         entity: {
//             project: uploads.entity?.Project ?? '',
//             employee: uploads.entity?.Employee ?? '',
//             expert: uploads.entity?.Expert ?? '',
//             report: uploads.entity?.Report ?? '',
//         },
//         owner: uploads.owner!
//     };
// }
