import { TableProps } from "antd";
import { InternationalNonGovernmentOrganizationProjectDataType } from "../types";

export const InternationalNonGovernmentOrganizationProjectColumns: TableProps<InternationalNonGovernmentOrganizationProjectDataType>["columns"] = [
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

export const InternationalNonGovernmentOrganizationProjectData: InternationalNonGovernmentOrganizationProjectDataType[] = [
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