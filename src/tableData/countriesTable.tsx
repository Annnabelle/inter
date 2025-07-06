import { TableProps } from "antd";
import { CountriesTableDataType } from "../types";
import { TFunction } from "i18next";

export const CountriesTableColumns =  (t: TFunction, currentLang: string): TableProps<CountriesTableDataType>["columns"] => [
  {
    title: t('tableTitles.countries'),
    dataIndex: ['name', currentLang],
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.actions'),
    dataIndex: "action",
    key: "action",
    render: (text) => <div className="table-action"><p className="table-action-text">{text}</p></div>
  },
];
