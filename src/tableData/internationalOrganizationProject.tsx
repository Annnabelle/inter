import { TableProps } from "antd";
import { InternationalOrganizationProjectDataType } from "../types";
import { TFunction } from "i18next";

export const InternationalOrganizationProjectColumns = (t: TFunction): TableProps<InternationalOrganizationProjectDataType>["columns"] => [
    {
      title: t('tableTitles.nameOfTheProject'),
      dataIndex: "name",
      key: "name",
      render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title: t('tableTitles.comment'),
      dataIndex: "comment",
      key: "comment",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title:  t('tableTitles.files'),
      dataIndex: "document",
      key: "document",
      render: (text) => <p className="table-text">{t('buttons.retrieve')}</p>,
    },
  ];