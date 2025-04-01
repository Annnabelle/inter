import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType } from "../../../types";


interface InternationalNonGovernmentOrganizationsChronologyOfMeetingTableProps {
  onRowClick?: (record: InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType) => void;
}

const columns: TableProps<InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType>["columns"] = [
    {
        title: "№",
        dataIndex: "number",
        key: "number",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Дата",
        dataIndex: "data",
        key: "data",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title: "Место",
        dataIndex: "place",
        key: "place",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Формат",
        dataIndex: "format",
        key: "format",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Уровень",
        dataIndex: "level",
        key: "level",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Название встречи",
        dataIndex: "nameOfMeeting",
        key: "nameOfMeeting",
        render: (text) => <p className="table-text">{text}</p>
    }
];

const data: InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType[] = [
  {
    key: "1",
    number: "1",
    data: "01/01/2025",
    place: "Место проведения тест",
    format: "Онлайн",
    level: "тест уровень",
    nameOfMeeting: "Тест названия встречи",
  },
  {
    key: "2",
    number: "2",
    data: "01/01/2025",
    place: "Место проведения тест",
    format: "Офлайн",
    level: "тест уровень",
    nameOfMeeting: "Тест названия встречи",

  },
  {
    key: "3",
    number: "3",
    data: "01/01/2025",
    place: "Место проведения тест",
    format: "Онлайн",
    level: "тест уровень",
    nameOfMeeting: "Тест названия встречи"
  },
];

const InternationalNonGovernmentOrganizationsChronologyOfMeeting: React.FC<InternationalNonGovernmentOrganizationsChronologyOfMeetingTableProps> = ({ onRowClick }) => {
  return (
    <Table<InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType>
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

export default InternationalNonGovernmentOrganizationsChronologyOfMeeting;
