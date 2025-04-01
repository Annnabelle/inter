import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { TranslatorsTableDataTypes } from "../../../types";

interface TranslatorsTableProps {
  onRowClick?: (record: TranslatorsTableDataTypes) => void;
}

const columns: TableProps<TranslatorsTableDataTypes>["columns"] = [
  {
    title: "Ф.И.О",
    dataIndex: "name",
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Языки",
    dataIndex: "languages",
    key: "languages",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Рейтинг",
    dataIndex: "rating",
    key: "rating",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

const data: TranslatorsTableDataTypes[] = [
  {
    key: "1",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
  {
    key: "2",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
  {
    key: "3",
    name: "Фамилия имя отчетво",
    languages: "Анлийский",
    rating: "5.5 балов",
  },
];

const TranslatorsTable: React.FC<TranslatorsTableProps> = ({ onRowClick }) => {
  return (
    <Table<TranslatorsTableDataTypes>
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

export default TranslatorsTable;