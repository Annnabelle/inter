import { TableProps } from "antd";
import {VisitStatisticsEmployeesDataTypes } from "../types";
import { TFunction } from "i18next";

export const VisitStatisticsEmployeesColumns  = (t: TFunction): TableProps<VisitStatisticsEmployeesDataTypes>["columns"] => [
    {
        title: "№",
        dataIndex: "key",
        key: "key",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title:  t('tableTitles.fullName'),
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title:  t('tableTitles.numberOfVisits'),
        dataIndex: "foreignVisitsCount",
        key: "foreignVisitsCount",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('inputs.phone'),
        dataIndex: "phone",
        key: "phone",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('inputs.email'),
        dataIndex: "email",
        key: "email",
        render: (text) => <p className="table-text">{text}</p>,
    },
];
