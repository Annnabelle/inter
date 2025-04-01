import {ReactNode} from 'react'
export interface ModalProps {
    closeModal?: ()=> void,
    openModal?: boolean,
    children?: ReactNode,
    title?: string,
    handleAction?: () => void
    handleDelete?: () => void,
    handleEdit?: () => void
    handleCancel?: () => void
    className?: string
}

export interface InternationalOrganizationChiefDataType {
    key: string;
    fullName: string;
    additionalInformation?: string;
    file?: string;
}

export interface InternationalOrganizationNonGovernmentChiefDataType {
    key: string;
    fullName: string;
    additionalInformation?: string;
    file?: string;
}

export interface InternationalOrganizationProjectDataType{
    key: string;
    projectName: string;
    additionalInformation?: string;
    file?: string;
}

export interface InternationalNonGovernmentOrganizationProjectDataType{
    key: string;
    projectName: string;
    additionalInformation: string;
    file?: string
}

export interface InternationalOrganizationsChronologyOfMeetingDataType{
    key: string;
    number: string;
    data: string;
    place?: string;
    format?: string;
    level: string;
    nameOfMeeting: string
}

export interface InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType{
    key: string;
    number: string;
    data: string;
    place?: string;
    format?: string;
    level: string;
    nameOfMeeting: string
}

export interface CountriesInnerEventDataType {
    key: string;
    data: string;
    nameOfMeeting: string
    place?: string;
    format?: string;
    level: string;
}

export interface CountriesInnerVisitsDataType {
    key: string;
    period: string;
    level: string
    donor?: string;
    organizer?: string;
    administrationСonsent: string;
}

export interface CountriesInnerInternationalDocumentsDataType {
    key: string;
    name: string;
    placeOfSigning: string
    dateOfSigning?: string;
    additionalInformation?: string;
    files: string;
}

export interface ExpertsTableDataTypes{
    key: string,
    mainAreas: string,
    fullName: string,
    event: string,
    date: string,
    files: string
}

export interface TranslatorsTableDataTypes {
    key: string,
    name: string,
    languages: string,
    rating: string
}