import { TableProps } from "antd";
import { TranslatorsTableDataTypes } from "../types";
import { TFunction } from "i18next";

export const TranslatorsColumns = (t: TFunction): TableProps<TranslatorsTableDataTypes>["columns"] => [
  {
    title:  t('tableTitles.fullName'),
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.languages') + "-" +  t('tableTitles.rating'),
    dataIndex: "languages",
    key: "languages",
    render: (languages: { language: string; rating: number }[]) => (
      <div className="languages-content">
        {languages.map((lang, index) => (
          <p key={index} className="table-text">
            {`${lang.language} - ${lang.rating}`}
          </p>
        ))}
      </div>
    )
  },
  {
    title: t('inputs.phone'),
    dataIndex: "phone",
    key: "phone",
    render: (text) => <p className="table-text">{text}</p>,
  },
  {
    title: t('inputs.email'),
    dataIndex: "email",
    key: "email",
    render: (text) => <p className="table-text">{text}</p>,
  },
];

// export const TranslatorsData: TranslatorsTableDataTypes[] = [
//   {
//     key: "1",
//     name: "Фамилия имя отчетво",
//     languages: "Анлийский",
//     rating: "5.5 балов",
//   },
//   {
//     key: "2",
//     name: "Фамилия имя отчетво",
//     languages: "Анлийский",
//     rating: "5.5 балов",
//   },
//   {
//     key: "3",
//     name: "Фамилия имя отчетво",
//     languages: "Анлийский",
//     rating: "5.5 балов",
//   },
// ];