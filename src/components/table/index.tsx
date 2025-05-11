
import { Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";

interface ComponentTableProps<T> {
  onRowClick?: (record: T) => void;
  columns?: TableProps<T>["columns"]; 
  data?: T[]; 
  loading?: boolean
  pagination?: TablePaginationConfig  
}

const ComponentTable = <T extends object>({ onRowClick, columns, data, loading, pagination }: ComponentTableProps<T>) => {
  return (
    <Table<T>
      className="table"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onRow={(record) => ({
        onClick: () => onRowClick && onRowClick(record),
      })}
      rowClassName="clickable-row"
    />
  );
};

export default ComponentTable;
