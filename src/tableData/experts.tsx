import { TableProps } from "antd";
import { ExpertsTableDataTypes } from "../types";

export const ExpertsColumns: TableProps<ExpertsTableDataTypes>["columns"] = [
  {
    title: "Основные сферы",
    dataIndex: "mainAreas",
    key: "mainAreas",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Ф.И.О",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Мероприятие",
    dataIndex: "event",
    key: "event",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Файлы",
    dataIndex: "files",
    key: "files",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const ExpertsData: ExpertsTableDataTypes[] = [
  {
    key: "1",
    mainAreas: "Недвижимость",
    fullName: "Фамилия имя отчетво",
    event: "Фестиваль",
    date: "01.01.2025",
    files: "Просмотреть"
  },
  {
    key: "2",
    mainAreas: "Недвижимость",
    fullName: "Фамилия имя отчетво",
    event: "Фестиваль",
    date: "01.01.2025",
    files: "Просмотреть"
  },
  {
    key: "3",
    mainAreas: "Недвижимость",
    fullName: "Фамилия имя отчетво",
    event: "Фестиваль",
    date: "01.01.2025",
    files: "Просмотреть"
  },
];