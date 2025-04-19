import { TableProps } from "antd";
import { CountriesInnerInternationalDocumentsDataType } from "../types";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";

export const CountriesInnerInternationalDocumentsColumns=  (t: TFunction): TableProps<CountriesInnerInternationalDocumentsDataType>["columns"] => [
    {
        title: t('tableTitles.name'),
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
      title:  t('tableTitles.placeOfSigning'),
      dataIndex: "placeOfSigning",
      key: "placeOfSigning",
      render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: t('tableTitles.dateOfSigning'),
        dataIndex: "dateOfSigning",
        key: "dateOfSigning",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('tableTitles.additionalInfo'),
        dataIndex: "additionalInformation",
        key: "additionalInformation",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('tableTitles.files'),
        dataIndex: "files",
        key: "files",
        render: (text) => <Link to='/' className="table-text">{text}</Link>
    },
];

export const CountriesInnerInternationalDocumentsData=  (t: TFunction): CountriesInnerInternationalDocumentsDataType[] => [
  {
    key: "1",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: t('buttons.retrieve'),
  },
  {
    key: "2",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: t('buttons.retrieve'),

  },
  {
    key: "3",
    name: "Тест название",
    placeOfSigning: "Узбекистан",
    dateOfSigning: "21/01/2025",
    additionalInformation: "Тест доп.информации",
    files: t('buttons.retrieve'),
  },
];