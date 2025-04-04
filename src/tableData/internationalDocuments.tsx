import { TableProps } from "antd";
import { InternationalDocumentsTableDataType } from "../types";

export const InternationalDocumentsTableColumn: TableProps<InternationalDocumentsTableDataType>["columns"] = [
    {
      title: "№",
      dataIndex: "item",
      key: "item",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Название документа",
      dataIndex: "nameOfTheDocument",
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
  ];
  
export const InternationalDocumentsTableData: InternationalDocumentsTableDataType[] = [
    {
      key: "1",
      item: '1',
      nameOfTheDocument: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
    },
    {
      key: "2",
      item: '2',
      nameOfTheDocument: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
    },
    {
      key: "3",
      item: '3',
      nameOfTheDocument: "Test name",
      date: "0101-2025",
      place: "Test Place",
      files: "file",
    },
  ];