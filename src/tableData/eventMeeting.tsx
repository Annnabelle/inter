import { TableProps } from "antd";
import { EventMeetingDataType } from "../types";

export const EventMeetingTableColumns: TableProps<EventMeetingDataType>["columns"] = [
  {
    title: "Назание",
    dataIndex: "name",
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: "Общее количесто",
    dataIndex: "totalAmount",
    key: "totalAmount",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Организатор Агенство",
    dataIndex: "agent",
    key: "agent",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: "Другой организатор",
    dataIndex: "otherOrganizer",
    key: "otherOrganizer",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const EventMeetingTableData: EventMeetingDataType[] = [
    {
      key: "1",
      name: "Test name",
      totalAmount: "20",
      agent: "10",
      otherOrganizer: "10"
    },
    {
      key: "2",
      name: "Test name",
      totalAmount: "20",
      agent: "10",
      otherOrganizer: "10"
    },
    {
      key: "3",
      name: "Test name",
      totalAmount: "20",
      agent: "10",
      otherOrganizer: "10"
    },
];