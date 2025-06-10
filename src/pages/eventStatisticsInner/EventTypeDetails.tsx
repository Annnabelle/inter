// import { Select, theme } from "antd";
// import { useTranslation } from "react-i18next";
// import { useAppDispatch, useAppSelector } from "../../store";
// import {  StatisticsByOrganizers } from "../../types/statistics";
// import { StatByOrganizerColumns } from "../../tableData/statByOrganizaers";
// import { useEffect, useMemo } from "react";
// import MainLayout from "../../components/layout";
// import MainHeading from "../../components/mainHeading";
// import ComponentTable from "../../components/table";
// import { RetrieveEvents } from "../../store/events";

// const StatByEventType: React.FC = () => {
//     const { t } = useTranslation();
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();

//     const dispatch = useAppDispatch();
//     const eventsStat = useAppSelector((state) => state.events.events);

//      useEffect(() => {
//         if (eventsStat.length < 0 ) {
//             dispatch(RetrieveEvents(page: '', eventType: ''));
//         }
//     }, [eventsStat, dispatch]);

//     const statByOrganizerData = useMemo(() => {
//         return statByOrganizersData.map((params) => ({
//             type: params.type,
//             total: params.total,
//             partial: {
//                 agency: params.partial.agency,
//                 other: params.partial.other,
//             },
//         }));
//     }, [statByOrganizersData, t]);

//     return (
//         <MainLayout>
//             <MainHeading title={`${t("titles.eventStatistics")}`} subtitle="Подзаголоок">
//                 <div className="main-heading-dropdown main-heading-dropdown-single-btn">
//                     <Select
//                         options={filterOptions}
//                         size="large"
//                         className="select"
//                         placeholder={`${t("buttons.sort.sortBy")}`}
//                         defaultValue="2025"
//                         onChange={(value) => setSelectedYear(value)}
//                     />
//                 </div>
//             </MainHeading>
//             <div
//                 style={{
//                     background: colorBgContainer,
//                 }}
//                 className="layout-content-container"
//             >
//                 <div className="page-inner">
//                     <div className="page-inner-title">
//                         <h1 className="title">{t("titles.eventStatistics")}, за {selectedYear} год</h1>
//                     </div>
//                 </div>
//                 <ComponentTable<StatisticsByOrganizers>
//                     data={statByOrganizerData}
//                     columns={StatByOrganizerColumns(t)}
//                 />
//             </div>
//         </MainLayout>
//     );
// };

// export default StatByEventType;


import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import ComponentTable from "../../components/table";
import { useTranslation } from "react-i18next";
import { RetrieveEvents } from "../../store/events";
import { EventTableRow, EventType } from "../../types/events";
import { StatByEventsType } from "../../tableData/statByEventsType";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import { theme } from "antd";
import dayjs from "dayjs";

const EventTypeDetails = () => {
  const { eventType } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
   const {
        token: { colorBgContainer },
    } = theme.useToken();

  const eventData = useAppSelector((state) => state.events.eventsCalendar);

  useEffect(() => {
    if (eventType) {
      dispatch(RetrieveEvents({ page: 1, limit: 10, eventTypes: [eventType as EventType] }));
    }
  }, [dispatch, eventType]);


  const eventTypeDetailsData = useMemo(() => {
    return eventData.map((params) => ({
      eventType: t(`eventTypes.${params.eventType.toLowerCase()}`),
      name: params.name,
      startDate: dayjs(params.startDate).format('DD.MM.YYYY'),
      endDate: dayjs(params.endDate).format('DD.MM.YYYY'),
      comment: params.comment
      
    }));
  }, [eventData, t]);

  return (
    <MainLayout>
      <MainHeading title={`${t("tablesName.listOfEventsWithType")}: ${t(`eventTypes.${eventType}`)}`} ></MainHeading>
      <div style={{
        background: colorBgContainer,
      }}
      className="layout-content-container">
        <ComponentTable<EventTableRow>
          data={eventTypeDetailsData}
          columns={StatByEventsType(t)}
        />
        </div>
    </MainLayout>
  );
};

export default EventTypeDetails;


