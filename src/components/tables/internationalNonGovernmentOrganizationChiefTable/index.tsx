import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { InternationalOrganizationNonGovernmentChiefDataType } from "../../../types";


interface InternationalOrganizationNonGovernmentChiefTableProps {
  onRowClick?: (record: InternationalOrganizationNonGovernmentChiefDataType) => void;
}

const columns: TableProps<InternationalOrganizationNonGovernmentChiefDataType>["columns"] = [
  {
    title: "Ф.И.О Главы",
    dataIndex: "fullName",
    key: "fullName",
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

const data: InternationalOrganizationNonGovernmentChiefDataType[] = [
  {
    key: "1",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "2",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
  {
    key: "3",
    fullName: "Reza Javad",
    additionalInformation: "Дополнительная информация",
    file: "Файлы",
  },
];

const InternationalOrganizationNonGovernmentChiefTable: React.FC<InternationalOrganizationNonGovernmentChiefTableProps> = ({ onRowClick }) => {
  return (
    <Table<InternationalOrganizationNonGovernmentChiefDataType>
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

export default InternationalOrganizationNonGovernmentChiefTable;