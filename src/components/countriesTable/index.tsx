import React from 'react';
import {Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import './styles.sass'

interface DataType {
  key: string;
  countries: string;
  meeting: number | string;
  visits: number | string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Страна',
    dataIndex: 'countries',
    key: 'countries',
    render: (text) => <h1 className='countries-table-title'>{text}</h1>,
  },
  {
    title: 'Встречи',
    dataIndex: 'meeting',
    key: 'meeting',
    render: (text) => <p className='countries-table-text'>{text}</p>,
  },
  {
    title: 'Визиты',
    dataIndex: 'visits',
    key: 'visits',
    render: (text) => <p className='countries-table-text'>{text}</p>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    countries: 'Узбекистан',
    meeting: 3 + " " + "встречи",
    visits: 4 + " " + "визиты",
  },
  {
    key: '2',
    countries: 'Узбекистан',
    meeting: 3 + " " + "встречи",
    visits: 4 + " " + "визиты",
  },
  {
    key: '3',
    countries: 'Узбекистан',
    meeting: 3 + " " + "встречи",
    visits: 4 + " " + "визиты",
  },
];

const CountriesTable: React.FC = () => <Table<DataType> className="countries-table" columns={columns} dataSource={data} />;

export default CountriesTable;