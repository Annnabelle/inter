import { TableProps } from "antd";
import { CountriesTableDataType } from "../types";
import { TFunction } from "i18next";

export const CountriesTableColumns =  (t: TFunction): TableProps<CountriesTableDataType>["columns"] => [
  {
    title: t('tableTitles.countries'),
    dataIndex: "countries",
    key: "countries",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.meetings'),
    dataIndex: "meeting",
    key: "meeting",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('tableTitles.visits'),
    dataIndex: "visits",
    key: "visits",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const CountriesTableData: CountriesTableDataType[] = [
    {
      key: "1",
      countries: "Узбекистан",
      meeting: "3 встречи",
      visits: "4 визиты",
    },
    {
      key: "2",
      countries: "Казахстан",
      meeting: "5 встреч",
      visits: "2 визита",
    },
    {
      key: "3",
      countries: "Россия",
      meeting: "7 встреч",
      visits: "6 визитов",
    },
];