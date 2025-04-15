import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { theme } from "antd";
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


const EventStatisticsInner: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }
    const handleRowClick = (record: { key: string }) => {
        navigate(`/cooperation/countries/${record.key}`)
    }
    
    return (
        <MainLayout>
            <MainHeading title="Статистика мероприятий" subtitle="Подзаголоок">
                <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                <div className="main-heading-dropdown-item" onClick={() => handleSortDropdown()}>
                    <div className="dropdown-text">
                        <p className="text">Сортировать по</p>
                    </div>
                    <div className="dropdown-icon">
                        <IoIosArrowDown />
                    </div>
                </div>
            {openSortDropdown && (
                <div className="dropdown-sort">
                    <div className="dropdown-sort-item">
                        <p className="text">Агенство</p>
                    </div>
                    <div className="dropdown-sort-item">
                        <p className="text">Другой организхатор</p>
                    </div>
                </div>
            )}
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
                        <h1 className="title">Статистика Семинар/Тренинг</h1>
                    </div>
                </div>
               <ComponentTable<EventSeminarDataType> onRowClick={handleRowClick} columns={EventSeminarTableColumns} data={EventSeminarTableData}/>

               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика встреч</h1>
                    </div>
                </div>
               <ComponentTable<EventMeetingDataType> onRowClick={handleRowClick} columns={EventMeetingTableColumns} data={EventMeetingTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Партнеры</h1>
                    </div>
                </div>
               <ComponentTable<EventPartnersDataType> columns={EventPartnerColumns} data={EventPartnersData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика Зарубежные визиты</h1>
                    </div>
                </div>
               <ComponentTable<ForeignVisitsDataType> onRowClick={handleRowClick} columns={ForeignVisitsTableColumns} data={ForeignVisitsTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика Прием делегаций</h1>
                    </div>
                </div>
               <ComponentTable<ReceptionOfTheDelegationDataType> onRowClick={handleRowClick} columns={ReceptionOfTheDelegationTableColumns} data={ReceptionOfTheDelegationTableData}/>
               <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика Дипломатические приёмы</h1>
                    </div>
                </div>
               <ComponentTable<DiplomaticReceptionsDataType> onRowClick={handleRowClick} columns={DiplomaticReceptionsTableColumns} data={DiplomaticReceptionsTableData}/>
            </div>
        </MainLayout>
    );
};

export default EventStatisticsInner;