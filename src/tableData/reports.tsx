import { TableProps } from "antd";
import { ReportsTableDataType } from "../types";
import {TFunction} from 'i18next'

export const ReportsColumns = (t: TFunction): TableProps<ReportsTableDataType>["columns"] => [
  {
    title: t('tableTitles.name'),
    dataIndex: "name",
    key: "name",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title:  t('tableTitles.type'),
    dataIndex: "type",
    key: "type",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:  t('tableTitles.responsiblePerson'),
    dataIndex: "responsible",
    key: "responsible",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:  t('tableTitles.creationDate'),
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => <p className="table-text">{text}</p>,
  },
]