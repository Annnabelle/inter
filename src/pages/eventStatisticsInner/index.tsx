import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Select, theme } from "antd";
import { DiplomaticReceptionsDataType, EventMeetingDataType, EventPartnersDataType, EventSeminarDataType, ForeignVisitsDataType, ReceptionOfTheDelegationDataType } from "../../types";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { EventMeetingTableColumns, EventMeetingTableData } from "../../tableData/eventMeeting";
import { ForeignVisitsTableColumns, ForeignVisitsTableData } from "../../tableData/foreignVisits";
import { ReceptionOfTheDelegationTableColumns, ReceptionOfTheDelegationTableData } from "../../tableData/receptionOfTheDelegation";
import { DiplomaticReceptionsTableColumns, DiplomaticReceptionsTableData } from "../../tableData/diplomaticReceptions";
import { EventPartnerColumns, EventPartnersData } from "../../tableData/eventPartners";
import { EventSeminarTableColumns, EventSeminarTableData } from "../../tableData/eventSeminar";
import { useTranslation } from "react-i18next";


const EventStatisticsInner: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }
    const handleRowClick = (record: { key: string }) => {
        navigate(`/cooperation/countries/${record.key}`)
    }

    const filterOptions = [
        {value: 'agency',label: t('buttons.sort.agency')},
        {value: 'otherOrganizer',label: t('buttons.sort.otherOrganizer')},
        {value: 'all',label:t('buttons.sort.all')},
    ]
    
    return (
        <MainLayout>
            <MainHeading title={`${t('titles.eventStatistics')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.seminar')}`}</h1>
                    </div>
                </div>
               <ComponentTable<EventSeminarDataType> onRowClick={handleRowClick} columns={EventSeminarTableColumns(t)} data={EventSeminarTableData}/>

               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.meetings')}`}</h1>
                    </div>
                </div>
               <ComponentTable<EventMeetingDataType> onRowClick={handleRowClick} columns={EventMeetingTableColumns(t)} data={EventMeetingTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.partners')}`}</h1>
                    </div>
                </div>
               <ComponentTable<EventPartnersDataType> columns={EventPartnerColumns(t)} data={EventPartnersData(t)}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.foreignVisits')}`}</h1>
                    </div>
                </div>
               <ComponentTable<ForeignVisitsDataType> onRowClick={handleRowClick} columns={ForeignVisitsTableColumns(t)} data={ForeignVisitsTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.receptionOfDelegations')}`}</h1>
                    </div>
                </div>
               <ComponentTable<ReceptionOfTheDelegationDataType> onRowClick={handleRowClick} columns={ReceptionOfTheDelegationTableColumns(t)} data={ReceptionOfTheDelegationTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('titles.statistics') + " " + t('events.diplomaticReceptions')}`}</h1>
                    </div>
                </div>
               <ComponentTable<DiplomaticReceptionsDataType> onRowClick={handleRowClick} columns={DiplomaticReceptionsTableColumns(t)} data={DiplomaticReceptionsTableData}/>
            </div>
        </MainLayout>
    );
};

export default EventStatisticsInner;