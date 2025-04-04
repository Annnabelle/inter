import { TableProps } from "antd";
import { TranslatorsTableDataTypes } from "../types";

export const TranslatorsColumns: TableProps<TranslatorsTableDataTypes>["columns"] = [
  {
    title: "Ф.И.О",
    dataIndex: "name",
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Языки",
    dataIndex: "languages",
    key: "languages",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Рейтинг",
    dataIndex: "rating",
    key: "rating",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const TranslatorsData: TranslatorsTableDataTypes[] = [
  {
    key: "1",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
  {
    key: "2",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
  {
    key: "3",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
];