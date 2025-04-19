import { TableProps } from "antd";
import { InternationalOrganizationChiefDataType } from "../types";
import { TFunction } from "i18next";

export const InternationalOrganizationChiefColumns = (t: TFunction) : TableProps<InternationalOrganizationChiefDataType>["columns"] => [
  {
    title: t('tableTitles.fullNameOfLeader'),
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.additionalInfo'),
    dataIndex: "additionalInformation",
    key: "additionalInformation",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('tableTitles.files'),
    dataIndex: "file",
    key: "file",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const InternationalOrganizationChiefData: InternationalOrganizationChiefDataType[] = [
  {
    key: "1",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "2",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "3",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
];