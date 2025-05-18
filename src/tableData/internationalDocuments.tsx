import { TableProps } from "antd";
import { TFunction } from "i18next";
import { InternationalDocumentsTableDataType } from "../types/internationalDocuments";

export const InternationalDocumentsTableColumn = (t: TFunction): TableProps<InternationalDocumentsTableDataType>["columns"] => [
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
      title: t('tableTitles.date'),
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
      title: t('inputs.levelOfSigning'),
      dataIndex: "approval",
      key: "approval",
      render: (text) => <p className="table-text">{text}</p>,
    },

    // {
    //   title: t('tableTitles.files'),
    //   dataIndex: "comment",
    //   key: "comment",
    //   render: (text) => <p className="table-text">{text}</p>,
    // },
];