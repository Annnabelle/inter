import { useMemo } from "react";
import { EventPartnersDataType } from "../types";
import type { ColumnsType } from 'antd/es/table';
import { Select } from "antd";
import { Option } from "antd/es/mentions";

export const EventPartnerColumns: ColumnsType<EventPartnersDataType> = [
        {
          title: 'Общее количество',
          dataIndex: 'countryOrOrg',
          key: 'countryOrOrg',
        },
        {
          title: 'Семинар/тренинг/конференция/форум',
          dataIndex: 'seminarCount',
          key: 'seminarCount',
          align: 'center',
          render: (count: number) => <strong>{count}</strong>,
        },
        {
          title: 'Визиты',
          dataIndex: 'visitCount',
          key: 'visitCount',
          align: 'center',
          render: (count: number) => <strong>{count}</strong>,
        }
  ];

export const EventPartnersData: EventPartnersDataType[] = [
    {
      key: '1',
      type: 'country',
      countryOrOrg: (
        <>
          <div style={{ fontWeight: 600 }}>Страна</div>
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
          <div style={{ fontWeight: 600 }}>Международная организация</div>
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