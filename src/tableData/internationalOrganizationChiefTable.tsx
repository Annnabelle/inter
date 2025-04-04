import { TableProps } from "antd";
import { InternationalOrganizationChiefDataType } from "../types";

export const InternationalOrganizationChiefColumns: TableProps<InternationalOrganizationChiefDataType>["columns"] = [
  {
    title: "Ф.И.О Главы",
    dataIndex: "fullName",
    key: "fullName",
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