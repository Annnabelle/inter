import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface ComponentTableProps<T> {
  onRowClick?: (record: T) => void;
  columns?: TableProps<T>["columns"]; 
  data?: T[]; 
}

const ComponentTable = <T extends object>({ onRowClick, columns, data }: ComponentTableProps<T>) => {
  return (
    <Table<T>
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

export default ComponentTable;
