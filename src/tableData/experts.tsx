import { TableProps } from "antd";
import { ExpertsTableDataTypes } from "../types";
import { TFunction } from "i18next";

export const ExpertsColumns = (t: TFunction): TableProps<ExpertsTableDataTypes>["columns"] => [
  {
    title:  t('tableTitles.mainAreas'),
    dataIndex: "mainAreas",
    key: "mainAreas",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.event'),
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('tableTitles.fullName'),
    dataIndex: "event",
    key: "event",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:  t('tableTitles.date'),
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:   t('tableTitles.files'),
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