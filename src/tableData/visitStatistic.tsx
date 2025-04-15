import { TableProps } from "antd";
import {VisitStatisticsEmployeesDataTypes } from "../types";

export const VisitStatisticsEmployeesColumns: TableProps<VisitStatisticsEmployeesDataTypes>["columns"] = [
    {
        title: "№",
        dataIndex: "number",
        key: "number",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title: "Ф.И.О",
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title: "Количество визитов",
        dataIndex: "visitsAmount",
        key: "visitsAmount",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Агентство",
        dataIndex: "agency",
        key: "agency",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Другой организатор",
        dataIndex: "otherOrganizer",
        key: "otherOrganizer",
        render: (text) => <p className="table-text">{text}</p>,
    },
];

export const VisitStatisticsEmployeesData: VisitStatisticsEmployeesDataTypes[] = [
  {
    key: "1",
    number: '1',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
  {
    key: "2",
    number: '2',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
  {
    key: "3",
    number: '3',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
];