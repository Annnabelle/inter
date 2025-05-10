import { TableProps, Tag } from "antd";
import {TFunction} from 'i18next'
import { AdministrationDataType } from "../types/user";
export const AdministrationTableColumns = (t: TFunction): TableProps<AdministrationDataType>["columns"] => [
    {
        title: t('inputs.name'),
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title:  t('inputs.role'),
        dataIndex: "role",
        key: "role",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: t('inputs.status'),
        dataIndex: "status",
        key: "status",
        render: (text) => (
            <Tag className={`table-tag ${text ===  'Active' ? 'table-tag-active' : 'table-tag-not-active'}`} color={text === 'Active' ? 'green' : 'red'} style={{width: "100%", textAlign: "center"}}>
              {text}
            </Tag>
          )
    },
    {
        title:  t('inputs.lastLogin'),
        dataIndex: "lastLoggedInAt",
        key: "lastLoggedInAt",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title:  t('buttons.actions'),
        dataIndex: "action",
        key: "action",
        render: (text) => <div className="table-action"><p className="table-action-text">{text}</p></div>
    },
];

// export const AdministrationTableData = (t: TFunction): AdministrationDataType[] => [
//   {
//     key: "1",
//     name: "Test name",
//     role: "Тест названия",
//     status: "Active", //t('buttons.active')
//     lastVisit: "01/01/2025",
//     action: t('buttons.edit'),
//   },
//   {
//     key: "2",
//     name: "Test name",
//     role: "Тест названия",
//     status: "Active",
//     lastVisit: "01/01/2025",
//     action: t('buttons.edit'),

//   },
//   {
//     key: "3",
//     name: "Test name",
//     role: "Тест названия",
//     status: "Active",
//     lastVisit: "01/01/2025",
//     action: t('buttons.edit'),
//   },
// ];