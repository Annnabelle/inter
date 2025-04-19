import { TableProps } from "antd";
import { InternationalDocumentsTableDataType } from "../types";
import { TFunction } from "i18next";

export const InternationalDocumentsTableColumn = (t: TFunction): TableProps<InternationalDocumentsTableDataType>["columns"] => [
    {
      title: "№",
      dataIndex: "item",
      key: "item",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: t('tableTitles.nameOfDocument'),
      dataIndex: "nameOfTheDocument",
      key: "nameOfTheContract",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.date'),
      dataIndex: "date",
      key: "date",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.place'),
      dataIndex: "place",
      key: "place",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.files'),
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