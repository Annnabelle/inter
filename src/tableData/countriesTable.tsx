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
    title: t('tableTitles.meetings'),
    dataIndex: "comment",
    key: "comment",
    render: (text) => <p className="table-text">{text}</p>,
  },
  // {
  //   title: t('tableTitles.visits'),
  //   dataIndex: "visits",
  //   key: "visits",
  //   render: (text) => <p className="table-text">{text}</p>,
  // },
];
