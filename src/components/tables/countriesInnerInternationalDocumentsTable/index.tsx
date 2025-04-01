import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { CountriesInnerInternationalDocumentsDataType } from "../../../types";
import { Link } from "react-router-dom";


interface CountriesInnerInternationalDocumentsTableProps {
  onRowClick?: (record: CountriesInnerInternationalDocumentsDataType) => void;
}

const columns: TableProps<CountriesInnerInternationalDocumentsDataType>["columns"] = [
    {
        title: "Название",
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: "Место подписания",
      dataIndex: "placeOfSigning",
      key: "placeOfSigning",
      render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Дата подписания",
        dataIndex: "dateOfSigning",
        key: "dateOfSigning",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Доп.Информация",
        dataIndex: "additionalInformation",
        key: "additionalInformation",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Файлы",
        dataIndex: "files",
        key: "files",
        render: (text) => <Link to='/' className="table-text">{text}</Link>
    },
];

const data: CountriesInnerInternationalDocumentsDataType[] = [
  {
    key: "1",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: "Посмотреть",
  },
  {
    key: "2",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: "Посмотреть",

  },
  {
    key: "3",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: "Посмотреть",
  },
];

const CountriesInnerInternationalDocumentsTable: React.FC<CountriesInnerInternationalDocumentsTableProps> = ({ onRowClick }) => {
  return (
    <Table<CountriesInnerInternationalDocumentsDataType>
      className="table"
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick && onRowClick(record),
      })}
      rowClassName="clickable-row"
    />
  );
};

export default CountriesInnerInternationalDocumentsTable;