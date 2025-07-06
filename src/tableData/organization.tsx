import { TableProps } from "antd";
import { TFunction } from "i18next";
import { Organizations } from "../types/organizations";
export const OrganizationsTableColumns = (
  t: TFunction,
  currentLang: string,
  handleEditOpen: (record: Organizations) => void,
  handleDeleteOpen: (record: Organizations) => void,
): TableProps<Organizations>["columns"] => [
  {
    title: t('tableTitles.name'),
    dataIndex: ['organizationName', currentLang],
    key: "organizationName",
    render: (text) => <h1 className="table-title">{text}</h1>,
  },
  {
    title: t('tableTitles.typeOfOrganization'),
    dataIndex: 'organizationType',
    key: 'organizationType',
    render: (text) => <p className="table-text">{t(`organization.${text}`)}</p>,
  }, 
  {
    title: t('tableTitles.actions'),
    key: "action",
    render: (_, record) => (
      <div className="table-actions">
        <p
          className="table-action-text"
          onClick={(e) => {
            e.stopPropagation(); 
            handleEditOpen(record);
          }}
        >
          {t('buttons.edit')}
        </p>
        <p className="table-action-danger"
          onClick={(e) => {
            e.stopPropagation(); 
            handleDeleteOpen(record);
          }}
        >
          {t('buttons.delete')}
        </p>
      </div>
    ),
  },
];

// export const OrganizationsTableData: OrganizationsDataType[] = [
//     {
//         key: "1",
//         organizationName: "Test name",
//         comment: 'comment',
//         organizationType: 'International Organizations',
//         action: "Просмотреть",
//     },
//     {
//         key: "2",
//         organizationName: "Test name",
//         organizationType: 'International Organizations',
//         comment: 'comment',
//         action: "20",
//     },
//     {
//         key: "3",
//         organizationName: "Test name",
//         organizationType: 'International Organizations',
//         comment: 'comment',
//         action: "20",
//     },
// ];