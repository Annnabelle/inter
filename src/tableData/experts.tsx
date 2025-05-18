import { TableProps } from "antd";
import { ExpertsTableDataTypes } from "../types";
import { TFunction } from "i18next";

export const ExpertsColumns = (t: TFunction): TableProps<ExpertsTableDataTypes>["columns"] => [
  {
    title:  t('tableTitles.mainAreas'),
    dataIndex: "spheres",
    key: "spheres",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.fullName'),
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('inputs.phone'),
    dataIndex: "phone",
    key: "phone",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:  t('inputs.email'),
    dataIndex: "email",
    key: "email",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title:   t('tableTitles.comment'),
    dataIndex: "comment",
    key: "comment",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

// t('tableTitles.event') 
