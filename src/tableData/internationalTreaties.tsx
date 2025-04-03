import { TableProps } from "antd";
import { InternationalTreatiesTableDataType } from "../types";

export const InternationalTreatiesTableColumn: TableProps<InternationalTreatiesTableDataType>["columns"] = [
    {
      title: "№",
      dataIndex: "item",
      key: "item",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Название договора",
      dataIndex: "nameOfTheContract",
      key: "nameOfTheContract",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: "Место",
      dataIndex: "place",
      key: "place",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: "Файлы",
      dataIndex: "files",
      key: "files",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: "Уровень",
      dataIndex: "level",
      key: "level",
      render: (text) => <p className="table-text">{text}</p>,
    },
  ];
  
export const InternationalTreatiesTableData: InternationalTreatiesTableDataType[] = [
    {
      key: "1",
      item: '1',
      nameOfTheContract: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
      level: "Upper"
    },
    {
      key: "2",
      item: '2',
      nameOfTheContract: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
      level: "Upper"
    },
    {
      key: "3",
      item: '3',
      nameOfTheContract: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
      level: "Upper"
    },
  ];