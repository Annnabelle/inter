import { TableProps } from "antd";
import { CountriesInnerVisitsDataType } from "../types";

export const CountriesInnerVisitsColumns: TableProps<CountriesInnerVisitsDataType>["columns"] = [
    {
        title: "Период",
        dataIndex: "period",
        key: "period",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Уровень",
      dataIndex: "level",
      key: "level",
      render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Донор",
        dataIndex: "donor",
        key: "donor",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Организатор",
        dataIndex: "organizer",
        key: "organizer",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Согласие администрации",
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