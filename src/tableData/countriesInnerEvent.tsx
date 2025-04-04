import { TableProps } from "antd";
import { CountriesInnerEventDataType } from "../types";

export const CountriesEventTableColumns: TableProps<CountriesInnerEventDataType>["columns"] = [
    {
        title: "Дата",
        dataIndex: "data",
        key: "data",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Название",
      dataIndex: "nameOfMeeting",
      key: "nameOfMeeting",
      render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Место",
        dataIndex: "place",
        key: "place",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Формат",
        dataIndex: "format",
        key: "format",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Уровень",
        dataIndex: "level",
        key: "level",
        render: (text) => <p className="table-text">{text}</p>
    },
];

export const CountriesEventTableData: CountriesInnerEventDataType[] = [
  {
    key: "1",
    data: "01/01/2025",
    nameOfMeeting: "Тест названия",
    place: "Место проведения тест",
    format: "Онлайн",
    level: "Тест уровень",
  },
  {
    key: "2",
    data: "01/01/2025",
    nameOfMeeting: "Тест названия",
    place: "Место проведения тест",
    format: "Онлайн",
    level: "Тест уровень",

  },
  {
    key: "3",
    data: "01/01/2025",
    nameOfMeeting: "Тест названия",
    place: "Место проведения тест",
    format: "Онлайн",
    level: "Тест уровень",
  },
];