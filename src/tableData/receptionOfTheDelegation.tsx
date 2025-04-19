import { TableProps } from "antd";
import { ReceptionOfTheDelegationDataType } from "../types";
import { TFunction } from "i18next";

export const ReceptionOfTheDelegationTableColumns = (t: TFunction) : TableProps<ReceptionOfTheDelegationDataType>["columns"] => [
  {
    title: t('tableTitles.name'),
    dataIndex: "name",
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.totalNumber'),
    dataIndex: "totalAmount",
    key: "totalAmount",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('tableTitles.organizerAgency'),
    dataIndex: "agent",
    key: "agent",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('tableTitles.otherOrganizer'),
    dataIndex: "otherOrganizer",
    key: "otherOrganizer",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

export const ReceptionOfTheDelegationTableData: ReceptionOfTheDelegationDataType[] = [
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