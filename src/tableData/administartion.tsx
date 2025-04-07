import { TableProps, Tag } from "antd";
import { AdministrationDataType, CountriesInnerEventDataType } from "../types";

export const AdministrationTableColumns: TableProps<AdministrationDataType>["columns"] = [
    {
        title: "Имя",
        dataIndex: "name",
        key: "name",
        render: (text) => <h1 className="table-title">{text}</h1>,
    },
    {
        title: "Роль",
        dataIndex: "role",
        key: "role",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: "Статус",
        dataIndex: "status",
        key: "status",
        render: (text) => (
            <Tag className={`table-tag ${text ===  'Active' ? 'table-tag-active' : 'table-tag-not-active'}`} color={text === 'Active' ? 'green' : 'red'} style={{width: "100%", textAlign: "center"}}>
              {text}
            </Tag>
          )
    },
    {
        title: "Последний вход",
        dataIndex: "lastVisit",
        key: "lastVisit",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: "Действия",
        dataIndex: "action",
        key: "action",
        render: (text) => <div className="table-action"><p className="table-action-text">{text}</p></div>
    },
];

export const AdministrationTableData: AdministrationDataType[] = [
  {
    key: "1",
    name: "Test name",
    role: "Тест названия",
    status: "Active",
    lastVisit: "01/01/2025",
    action: "Редактировать",
  },
  {
    key: "2",
    name: "Test name",
    role: "Тест названия",
    status: "Active",
    lastVisit: "01/01/2025",
    action: "Редактировать",

  },
  {
    key: "3",
    name: "Test name",
    role: "Тест названия",
    status: "Not active",
    lastVisit: "01/01/2025",
    action: "Редактировать",
  },
];