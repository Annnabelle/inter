    import { TableProps } from "antd";
    import { TFunction } from "i18next";
    import { CountriesInnerEventDataType } from "../types/events";

    export const CountriesEventTableColumns= (t: TFunction): TableProps<CountriesInnerEventDataType>["columns"] => [
        {
            title: t('tableTitles.date'),
            dataIndex: "key",
            key: "key",
            render: (text) => <h1 className="table-title">{text}</h1>,
        },
        {
            title: t('tableTitles.name'),
            dataIndex: "name",
            key: "name",
            render: (text) => <p className="table-text">{text}</p>
        },
        {
            title: t('inputs.startDate'),
            dataIndex: "start",
            key: "place",
            render: (text) => <p className="table-text">{text}</p>,
        },
        {
            title: t('inputs.endDate'),
            dataIndex: "end",
            key: "format",
            render: (text) => <p className="table-text">{text}</p>,
        },
        {
            title: t('tableTitles.eventType'),
            dataIndex: "eventType",
            key: "eventType",
            render: (text) => <p className="table-text">{t(`eventTypes.${text}`)}</p>
        },
    ];
