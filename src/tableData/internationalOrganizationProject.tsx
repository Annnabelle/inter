import { TableProps } from "antd";
import { InternationalOrganizationProjectDataType } from "../types";
import { TFunction } from "i18next";

export const InternationalOrganizationProjectColumns = (t: TFunction): TableProps<InternationalOrganizationProjectDataType>["columns"] => [
    {
      title: t('tableTitles.nameOfTheProject'),
      dataIndex: "projectName",
      key: "projectName",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: t('tableTitles.additionalInfo'),
      dataIndex: "additionalInformation",
      key: "additionalInformation",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title:  t('tableTitles.files'),
      dataIndex: "file",
      key: "file",
      render: (text) => <p className="table-text">{text}</p>,
    },
  ];
  
export const InternationalOrganizationProjectData: InternationalOrganizationProjectDataType[] = [
    {
        key: "1",
        projectName: "Название проекта",
        additionalInformation: "Дополнительная информация",
        file: "Файлы",
    },
    {
        key: "2",
        projectName: "Название проекта",
        additionalInformation: "Дополнительная информация",
        file: "Файлы",
    },
    {
        key: "3",
        projectName: "Название проекта",
        additionalInformation: "Дополнительная информация",
        file: "Файлы",
    },
];