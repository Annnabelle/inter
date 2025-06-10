import { TableProps } from "antd";
import {TFunction} from 'i18next'
import { StatisticsByOrganizers } from "../types/statistics";
import { useNavigate } from "react-router-dom";
export const StatByOrganizerColumns = (t: TFunction): TableProps<StatisticsByOrganizers>["columns"] => {
  const navigate = useNavigate();
  return [
    {
      title: t('tableTitles.type'),
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <p
          className="table-text table-link"
          onClick={() => navigate(`/event-type/${text}`)}
          style={{ cursor: 'pointer', color: '#1890ff' }}
        >
           {t(`eventTypes.${text}`)}
        </p>
      ),
    },
    {
      title: t('tableTitles.agency'),
      dataIndex: ["partial", "agency"],
      key: "agency",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.other'),
      dataIndex: ["partial", "other"],
      key: "other",
      render: (text) => <p className="table-text">{text}</p>,
    },
    {
      title: t('tableTitles.total'),
      dataIndex: "total",
      key: "total",
      render: (text) => <p className="table-text">{text}</p>,
    },
  ]
}
