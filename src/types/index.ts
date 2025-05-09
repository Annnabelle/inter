import { JSX } from '@emotion/react/jsx-runtime'
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

export type SubDropdownItem = {
    to: string;
    text: string;
  };
  
export type DropdownItem = {
    to: string;
    text: string;
    icon?: React.ReactNode;
    subDropdown?: SubDropdownItem[];
    className?: string
  };
  
export type NavItem = {
    to?: string;
    icon: React.ReactNode;
    text: string;
    dropdown?: DropdownItem[];
  };
  

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

export interface InternationalOrganizationChronologyOfMeetingDataType{
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

export interface InternationalTreatiesTableDataType{
    key: string,
    item: string,
    nameOfTheContract: string,
    date: string,
    place: string,
    files: string,
    level: string
}

export interface InternationalDocumentsTableDataType{
    key: string,
    item: string,
    nameOfTheDocument: string,
    date: string,
    place: string,
    files: string,
}

export interface CountriesTableDataType { 
    key: string,
    countries: string,
    meeting: string,
    visits: string
}

export interface ReportsTableDataType {
    key: string,
    nameOfReport: string,
    typeOfReport: string,
    responsibleForReport: string,
    dateOfCreation: string,
    actions: [string, string]
}

export interface AdministrationDataType {
    key: string,
    name: string, 
    role: string, 
    status: string,
    lastVisit: string,
    action: string
}

export interface EventSeminarDataType {
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface EventForumDataType{ 
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface EventMeetingDataType{
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface EventPartnersDataType{
    key: string,
    type: string;
    countryOrOrg: JSX.Element;
    seminarCount: number;
    visitCount: number;
}

export interface ForeignVisitsDataType {
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface ReceptionOfTheDelegationDataType {
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface DiplomaticReceptionsDataType{
    key: string,
    name: string,
    totalAmount: string,
    agent: string,
    otherOrganizer: string
}

export interface VisitStatisticsEmployeesDataTypes {
    key: string,
    number: string,
    name: string,
    visitsAmount: string,
    agency: string,
    otherOrganizer: string
}

export interface VisitCountryStatisticsDataTypes {
    key: string,
    number: string,
    name: string,
    visitsAmount: string,
    agency: string,
    otherOrganizer: string,
    country: string
}