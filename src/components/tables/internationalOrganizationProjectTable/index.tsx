import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { InternationalOrganizationProjectDataType } from "../../../types";


interface InternationalOrganizationProjectTableProps {
  onRowClick?: (record: InternationalOrganizationProjectDataType) => void;
}

const columns: TableProps<InternationalOrganizationProjectDataType>["columns"] = [
  {
    title: "Название проекта",
    dataIndex: "projectName",
    key: "projectName",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Доп.Информация",
    dataIndex: "additionalInformation",
    key: "additionalInformation",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Файлы",
    dataIndex: "file",
    key: "file",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

const data: InternationalOrganizationProjectDataType[] = [
  {
    key: "1",
    projectName: "Название проекта",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "2",
    projectName: "Название проекта",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "3",
    projectName: "Название проекта",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
];

const InternationalOrganizationProjectTable: React.FC<InternationalOrganizationProjectTableProps> = ({ onRowClick }) => {
  return (
    <Table<InternationalOrganizationProjectDataType>
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

export default InternationalOrganizationProjectTable;
