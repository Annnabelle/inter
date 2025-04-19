
import { EventPartnersDataType } from "../types";
import type { ColumnsType } from 'antd/es/table';
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { TFunction } from "i18next";

export const EventPartnerColumns = (t: TFunction): ColumnsType<EventPartnersDataType> => [
        {
          title: t('tableTitles.totalNumber'),
          dataIndex: 'countryOrOrg',
          key: 'countryOrOrg',
        },
        {
          title: t('tableTitles.totalEvents'),
          dataIndex: 'seminarCount',
          key: 'seminarCount',
          align: 'center',
          render: (count: number) => <strong>{count}</strong>,
        },
        {
          title: t('tableTitles.visits'),
          dataIndex: 'visitCount',
          key: 'visitCount',
          align: 'center',
          render: (count: number) => <strong>{count}</strong>,
        }
  ];

export const EventPartnersData = (t: TFunction): EventPartnersDataType[] => [
    {
      key: '1',
      type: 'country',
      countryOrOrg: (
        <>
          <div style={{ fontWeight: 600 }}>{t('tableTitles.countries')}</div>
          <Select defaultValue="Казахстан" style={{ width: '100%' }}>
            <Option value="Казахстан">Казахстан</Option>
            <Option value="Узбекистан">Узбекистан</Option>
          </Select>
        </>
      ),
      seminarCount: 20,
      visitCount: 20,
    },
    {
      key: '2',
      type: 'organization',
      countryOrOrg: (
        <>
          <div style={{ fontWeight: 600 }}>{t('tableTitles.internationalOrganization')}</div>
          <Select defaultValue="Тест организация" style={{ width: '100%' }}>
            <Option value="Тест организация">Тест организация</Option>
            <Option value="ЮНЕСКО">ЮНЕСКО</Option>
          </Select>
        </>
      ),
      seminarCount: 20,
      visitCount: 20,
    },
  ]