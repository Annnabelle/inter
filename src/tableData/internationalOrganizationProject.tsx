import { TableProps } from "antd";
import { InternationalOrganizationProjectDataType } from "../types";

export const InternationalOrganizationProjectColumns: TableProps<InternationalOrganizationProjectDataType>["columns"] = [
    {
      title: "Название проекта",
      dataIndex: "projectName",
      key: "projectName",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Доп.Информация",
      dataIndex: "additionalInformation",
      key: "additionalInformation",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: "Файлы",
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