import { TableProps } from "antd";
import { CountriesInnerVisitsDataType } from "../types";
import { TFunction } from "i18next";

export const CountriesInnerVisitsColumns = (t: TFunction): TableProps<CountriesInnerVisitsDataType>["columns"] => [
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

export const CountriesInnerVisitsData: CountriesInnerVisitsDataType[] = [
  {
    key: "1",
    period: "01/01/2025 - 01/01/2026",
    level: "Тест уровень",
    donor: "Тест донора",
    organizer: "Тест организатор",
    administrationСonsent: "05.08.2024 №01-55/78463дсп",
  },
  {
    key: "2",
    period: "01/01/2025 - 01/01/2026",
    level: "Тест уровень",
    donor: "Тест донора",
    organizer: "Тест организатор",
    administrationСonsent: "05.08.2024 №01-55/78463дсп",

  },
  {
    key: "3",
    period: "01/01/2025 - 01/01/2026",
    level: "Тест уровень",
    donor: "Тест донора",
    organizer: "Тест организатор",
    administrationСonsent: "05.08.2024 №01-55/78463дсп",
  },
];