import { TableProps } from "antd";
import {VisitCountryStatisticsDataTypes } from "../types";

export const VisitCountryStatisticsColumns: TableProps<VisitCountryStatisticsDataTypes>["columns"] = [
    {
        title: "№",
        dataIndex: "number",
        key: "number",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title: 'Страна',
        dataIndex: 'country',
        key:'country',
        render: (text) => <h1 className="table-title">{text}</h1>
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

export const VisitCountryStatisticsData: VisitCountryStatisticsDataTypes[] = [
  {
    key: "1",
    country: 'Test coutry',
    number: '1',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
  {
    key: "2",
    country: 'Test coutry',
    number: '2',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
  {
    key: "3",
    country: 'Test coutry',
    number: '3',
    name: "Фамилия имя отчетво",
    visitsAmount: "10",
    agency: "Test name",
    otherOrganizer: 'test organizer'
  },
];