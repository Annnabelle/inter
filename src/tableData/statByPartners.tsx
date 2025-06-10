import { TableProps } from "antd";
import {TFunction} from 'i18next'
import { StatisticByPartners } from "../types/statistics";

export const StatByPartnersColumns = (t: TFunction): TableProps<StatisticByPartners>["columns"] => [
    {
        title: t('tableTitles.eventType'),
        dataIndex: 'eventType',
        key: "eventType",
        render: (text) => <p className="table-text"> {t(`eventTypes.${text}`)}</p>,
    },
    {
        title: t('tableTitles.name'),
        dataIndex: "name",
        key: "name",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('tableTitles.endDate'),
        dataIndex: "endDate",
        key: "endDate",
        render: (text) => <p className="table-text">{text}</p>
    },
    {
        title: t('tableTitles.comment'),
        dataIndex: 'comment',
        key: "comment",
        render: (text) => <p className="table-text">{text}</p>,
    },
];