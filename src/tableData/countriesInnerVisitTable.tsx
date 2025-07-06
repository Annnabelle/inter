import { TableProps } from "antd";
import { TFunction } from "i18next";
import { CountriesInnerEventDataType } from "../types/events";

export const CountriesInnerVisitsColumns = (t: TFunction): TableProps<CountriesInnerEventDataType>["columns"] => [
    {
        title:  t('tableTitles.period'),
        dataIndex: "period",
        key: "period",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title:  t('tableTitles.level'),
      dataIndex: "level",
      key: "level",
      render: (text) => <p className="table-text">{text}</p>
    },
    {
        title:  t('tableTitles.donor'),
        dataIndex: "donor",
        key: "donor",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('tableTitles.organizer'),
        dataIndex: "organizer",
        key: "organizer",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('tableTitles.administrationsConsent'),
        dataIndex: "administrationСonsent",
        key: "administrationСonsent",
        render: (text) => <p className="table-text">{text}</p>
    },
];
