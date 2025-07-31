import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, theme, Space } from "antd";
import { VisitStatisticsEmployeesDataTypes } from "../../types";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { VisitStatisticsEmployeesColumns } from "../../tableData/visitStatistic";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";
import { RetrieveStatisticByUsers } from "../../store/stistics";

const EventVisitsEmployee: React.FC = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeVisits = useAppSelector((state) => state.statistics.statisticByUsers);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 
  const [year, setYear] = useState("2025");

  useEffect(() => {
    dispatch(
      RetrieveStatisticByUsers({
        startDate: `${year}-01-01`,
        endDate: `${year}-12-31`,
        sortOrder: sortOrder,
      })
    );
  }, [dispatch, sortOrder, year]);

  const VisitsData = useMemo(() => {
    return employeeVisits.map((event, index) => ({
      key: String(index + 1),
      id: event.id,
      name: event.firstName + " " + event.lastName,
      email: event.email,
      phone: event.phone,
      foreignVisitsCount: event.foreignVisitsCount,
    }));
  }, [employeeVisits]);

  const handleRowClick = (record: VisitStatisticsEmployeesDataTypes) => {
    if (record.id) {
      navigate(`/visits-employee/${record.id}`);
    }
  };


  const yearOptions = Array.from({ length: 6 }, (_, i) => {
    const y = 2020 + i;
    return { value: y.toString(), label: y.toString() };
  });

  return (
    <MainLayout>
      <MainHeading title={t("titles.visitsEmployees")} subtitle="Подзаголоок">
        <Space size="middle">
          <Select
            options={[
              { label: t('titles.traveledMoreFrequently'), value: "desc" },
              { label: t('titles.traveledLessFrequently'), value: "asc" },
            ]}
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
            size="large"
            className="select"
            style={{ width: 200 }}
          />
          <Select
            options={yearOptions}
            value={year}
            onChange={(value) => setYear(value)}
            size="large"
            className="select"
            style={{ width: 140 }}
            placeholder={t('buttons.selectYear')}
          />
        </Space>
      </MainHeading>

      <div
        style={{ background: colorBgContainer }}
        className="layout-content-container"
      >
        <div className="page-inner">
          <div className="page-inner-title">
            <h1 className="title">
              {t("tablesName.staffVisitStatistics")}, {t("tablesName.for")} {year} {t("tablesName.year")}
            </h1>
          </div>
        </div>

        <ComponentTable<VisitStatisticsEmployeesDataTypes>
          onRowClick={handleRowClick}
          columns={VisitStatisticsEmployeesColumns(t)}
          data={VisitsData}
        />
      </div>
    </MainLayout>
  );
};

export default EventVisitsEmployee;

