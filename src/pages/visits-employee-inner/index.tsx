import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { theme, Space } from "antd";
import { VisitStatisticsEmployeeDataTypes } from "../../types";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";
import { RetrieveStatisticByUser } from "../../store/stistics";
import { VisitStatisticsEmployeeColumns } from "../../tableData/visitStatisticsInner";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import dayjs from "dayjs";

const VisitsEmployeeInner: React.FC = () => {
  const { t } = useTranslation();
  const {id} = useParams<{id: string}>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const employeeVisitsInner = useAppSelector((state) => state.statistics.statisticByUser);

  const [year] = useState("2025"); 

  useEffect(() => {
    dispatch(
      RetrieveStatisticByUser({
        id: id || "",
        startDate: `${year}-01-01`,
        endDate: `${year}-12-31`,
      })
    );
  }, [dispatch, year]);

const VisitsData = useMemo(() => {
  if (!employeeVisitsInner || !Array.isArray(employeeVisitsInner.foreignVisits)) return [];

  return employeeVisitsInner.foreignVisits.map((visit, index) => ({
    key: visit.id || String(index + 1),
    visitName: visit.name,
    comment: visit.comment ?? "",
    startDate: dayjs(visit.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(visit.endDate).format("YYYY-MM-DD"),
    eventType: visit.eventType,
  }));
}, [employeeVisitsInner]);


  return (
    <MainLayout>
      <MainHeading title={t("titles.visitsEmployees")} subtitle="Подзаголоок">
        <Space size="middle">
          {/* <Select
            options={[
              { label: t('navigation.topFrequentTravels'), value: "desc" },
              { label: t('navigation.topInfrequentTravelers'), value: "asc" },
            ]}
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
          /> */}
        </Space>
      </MainHeading>

      <div
        style={{ background: colorBgContainer }}
        className="layout-content-container"
      >
        <div className="page-inner">
          <div className="page-inner-title">
            <h1 className="title">
             {t('titles.employeeVisitStatistics')} {employeeVisitsInner?.firstName } {employeeVisitsInner?.lastName} 
            </h1>
          </div>
        </div>

        <ComponentTable<VisitStatisticsEmployeeDataTypes>
          columns={VisitStatisticsEmployeeColumns(t)}
          data={VisitsData}
        />
      </div>
    </MainLayout>
  );
};

export default VisitsEmployeeInner;