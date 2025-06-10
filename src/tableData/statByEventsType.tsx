import { TableProps } from "antd";
import {TFunction} from 'i18next'
import {EventTableRow } from "../types/events";

export const StatByEventsType = (t: TFunction): TableProps<EventTableRow>["columns"] => [
    {
        title: t('tableTitles.type'),
        dataIndex: "eventType",
        key: "eventType",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('inputs.title'),
        dataIndex: 'name',
        key: "name",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('inputs.startDate'),
        dataIndex: 'startDate',
        key: "startDate",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('inputs.endDate'),
        dataIndex: "endDate",
        key: "endDate",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: t('tableTitles.comment'),
        dataIndex: "comment",
        key: "comment",
        render: (text) => <p className="table-text">{text}</p>
    },
];