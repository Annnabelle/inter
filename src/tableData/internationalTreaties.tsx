import { TableProps } from "antd";
import { TFunction } from "i18next";
import { InternationalTreatiesTableDataType } from "../types/agreements";

export const InternationalTreatiesTableColumn = (t: TFunction): TableProps<InternationalTreatiesTableDataType>["columns"] => [
    {
      title: "№",
      dataIndex: "itemNumber",
      key: "itemNumber",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: t('tableTitles.nameOfDocument'),
      dataIndex: "name",
      key: "name",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title:  t('tableTitles.date'),
      dataIndex: "date",
      key: "date",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.place'),
      dataIndex: "place",
      key: "place",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title:  t('tableTitles.files'),
      dataIndex: "signLevel",
      key: "signLevel",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title:  t('tableTitles.level'),
      dataIndex: "comment",
      key: "comment",
      render: (text) => <p className="table-text">{text}</p>,
    },
  ];