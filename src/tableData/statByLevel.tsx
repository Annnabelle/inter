import { TableProps } from "antd";
import {TFunction} from 'i18next'
import { StatisticsByLevel } from "../types/statistics";

export const StatByLevelColumns = (t: TFunction): TableProps<StatisticsByLevel>["columns"] => [
    {
        title: t('tableTitles.type'),
        dataIndex: "type",
        key: "type",
        render: (text) => <p className="table-text"> {t(`eventTypes.${text}`)}</p>,
    },
    {
        title: t('titles.roles.deputy'),
        dataIndex: ["partial", "deputy"],
        key: "deputy",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('tableTitles.other'),
        dataIndex: ["partial", "expert"],
        key: "expert",
        render: (text) => <p className="table-text">{text}</p>,
    },
    {
        title: t('tableTitles.total'),
        dataIndex: "total",
        key: "total",
        render: (text) => <p className="table-text">{text}</p>
    },
];
