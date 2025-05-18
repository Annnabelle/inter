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
  // {
  //   title: t('tableTitles.actions'),
  //   dataIndex: "actions",
  //   key: "actions",
  //   render: (actions: string[]) => (
  //       <div className="table-action">
  //         {actions.map((action: string, index: number) => (
  //           <p key={index} className="table-action-text">{action}</p>
  //         ))}
  //       </div>
  //     )
  // },
];

// export const ReportsData = (t: TFunction): ReportsTableDataType[] => [
//   {
//     key: "1",
//     nameOfReport: "Отчет за Февраль",
//     typeOfReport: "docx",
//     responsibleForReport: "Ким Эдуард",
//     dateOfCreation: "01.01.2025 ",
//     actions: [t('buttons.edit'), t('buttons.download')]
//   },
//   {
//     key: "2",
//     nameOfReport: "Отчет за Февраль",
//     typeOfReport: "docx",
//     responsibleForReport: "Ким Эдуард",
//     dateOfCreation: "01.01.2025 ",
//     actions: [t('buttons.edit'), t('buttons.download')]
//   },
//   {
//     key: "3",
//     nameOfReport: "Отчет за Февраль",
//     typeOfReport: "docx",
//     responsibleForReport: "Ким Эдуард",
//     dateOfCreation: "01.01.2025 ",
//     actions: [t('buttons.edit'), t('buttons.download')]
//   },
// ];