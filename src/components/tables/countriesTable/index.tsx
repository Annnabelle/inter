import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  countries: string;
  meeting: number | string;
  visits: number | string;
}

interface CountriesTableProps {
  onRowClick?: (record: DataType) => void;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Страна",
    dataIndex: "countries",
    key: "countries",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Встречи",
    dataIndex: "meeting",
    key: "meeting",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Визиты",
    dataIndex: "visits",
    key: "visits",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

const data: DataType[] = [
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

const CountriesTable: React.FC<CountriesTableProps> = ({ onRowClick }) => {
  return (
    <Table<DataType>
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

export default CountriesTable;

