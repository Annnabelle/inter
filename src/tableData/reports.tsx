import { TableProps } from "antd";
import { ReportsTableDataType } from "../types";

export const ReportsColumns: TableProps<ReportsTableDataType>["columns"] = [
  {
    title: "Название",
    dataIndex: "nameOfReport",
    key: "nameOfReport",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Тип",
    dataIndex: "typeOfReport",
    key: "typeOfReport",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Ответственный",
    dataIndex: "responsibleForReport",
    key: "responsibleForReport",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Дата создания",
    dataIndex: "dateOfCreation",
    key: "dateOfCreation",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Действия",
    dataIndex: "actions",
    key: "actions",
    render: (actions: string[]) => (
        <div className="table-action">
          {actions.map((action: string, index: number) => (
            <p key={index} className="table-action-text">{action}</p>
          ))}
        </div>
      )
  },
];

export const ReportsData: ReportsTableDataType[] = [
  {
    key: "1",
    nameOfReport: "Отчет за Февраль",
    typeOfReport: "docx",
    responsibleForReport: "Ким Эдуард",
    dateOfCreation: "01.01.2025 ",
    actions: ["Редактировать", "Скачать"]
  },
  {
    key: "2",
    nameOfReport: "Отчет за Февраль",
    typeOfReport: "docx",
    responsibleForReport: "Ким Эдуард",
    dateOfCreation: "01.01.2025 ",
    actions: ["Редактировать", "Скачать"]
  },
  {
    key: "3",
    nameOfReport: "Отчет за Февраль",
    typeOfReport: "docx",
    responsibleForReport: "Ким Эдуард",
    dateOfCreation: "01.01.2025 ",
    actions: ["Редактировать", "Скачать"]
  },
];