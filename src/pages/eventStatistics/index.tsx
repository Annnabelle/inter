// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Select, theme } from "antd";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import StatisticsCard from "../../components/statisticCard";
import { useTranslation } from "react-i18next";


const EventStatistics: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer  },
    } = theme.useToken();
    // const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    // const navigate = useNavigate()
    // const handleSortDropdown = () => {
    //     setOpenSortDropdown((prev) => (!prev))
    // }

    const filterOptions = [
        {value: '2025',label:'2025'},
        {value: '2024',label:'2024'},
        {value: '2023',label:'2023'},
        {value: '2022', label: '2022'}
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
                        <h1 className="title">{t("titles.eventStatistics")}, за 2025 год</h1>
                    </div>
                </div>
                <div className="page-inner-statistics">
                    <StatisticsCard
                        title={t('events.seminar')}
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title={t('events.conferences')}
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title={t('events.meetings')} 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                </div>
                <div className="page-inner-statistics">
                    <StatisticsCard
                        title={t('events.foreignVisits')}
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title={t('events.receptionOfDelegations')}
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title={t('events.diplomaticReceptions')}
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                        thirdPercent={35}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default EventStatistics;