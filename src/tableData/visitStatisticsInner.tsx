import { TableProps } from "antd";
import {VisitStatisticsEmployeeDataTypes } from "../types";
import { TFunction } from "i18next";

export const VisitStatisticsEmployeeColumns  = (t: TFunction): TableProps<VisitStatisticsEmployeeDataTypes>["columns"] => [
    {
    title: t("inputs.title"),
    dataIndex: "visitName",
    key: "visitName",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t("tableTitles.comment"),
    dataIndex: "comment",
    key: "comment",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t("inputs.startDate"),
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t("inputs.endDate"),
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t("tableTitles.eventType"),
    dataIndex: "eventType",
    key: "eventType",
    render: (text) => <p className="table-text">  {t(`eventTypes.${text}`)}</p>,
  },
];