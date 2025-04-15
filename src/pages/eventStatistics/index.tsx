import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { theme } from "antd";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import StatisticsCard from "../../components/statisticCard";


const EventStatistics: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }
    
    return (
        <MainLayout>
            <MainHeading title="Статистика мероприятий" subtitle="Подзаголоок">
                <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                <div className="main-heading-dropdown-item" onClick={() => handleSortDropdown()}>
                    <div className="dropdown-text">
                        <p className="text">2025</p>
                    </div>
                    <div className="dropdown-icon">
                        <IoIosArrowDown />
                    </div>
                </div>
            {openSortDropdown && (
                <div className="dropdown-sort">
                    <div className="dropdown-sort-item">
                        <p className="text">2024</p>
                    </div>
                    <div className="dropdown-sort-item">
                        <p className="text">2023</p>
                    </div>
                    <div className="dropdown-sort-item">
                        <p className="text">2022</p>
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
                        <h1 className="title">Статистика мероприятий, за 2025 год</h1>
                    </div>
                </div>
                <div className="page-inner-statistics">
                    <StatisticsCard
                        title="Семинар/Тренинг" 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title="Конференция/Форум" 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title="Встречи" 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                </div>
                <div className="page-inner-statistics">
                    <StatisticsCard
                        title="Зарубежные визиты" 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title="Прием делегаций" 
                        total={1231} 
                        agencyPercent={65} 
                        otherPercent={35} 
                    />
                    <StatisticsCard
                        title="Дипломатические приёмы" 
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