import { Select, theme } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { RetrieveStatisticByOrganizer  } from "../../store/stistics";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import StatisticsCard from "../../components/statisticCard";

const EventStatistics: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useAppDispatch();
    const statByOrganizersData = useAppSelector((state) => state.statistics.statisticByOrg);
    const [selectedYear, setSelectedYear] = useState<string>("2025");

    const filterOptions = [
        { value: "2025", label: "2025" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
    ];

    useEffect(() => {
        if (selectedYear) {
            const startDate = new Date(`${selectedYear}-01-01T00:00:00.000Z`).toISOString();
            const endDate = new Date(`${selectedYear}-12-31T23:59:59.999Z`).toISOString();

            dispatch(RetrieveStatisticByOrganizer({ startDate, endDate }));
        }
    }, [selectedYear, dispatch]);

    return (
        <MainLayout>
            <MainHeading title={`${t("titles.eventStatistics")}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                    <Select
                        options={filterOptions}
                        size="large"
                        className="select"
                        placeholder={`${t("buttons.sort.sortBy")}`}
                        defaultValue="2025"
                        onChange={(value) => setSelectedYear(value)}
                    />
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
                        <h1 className="title">{t("titles.eventStatistics")}, {t("tablesName.for")} {selectedYear} {t("tablesName.year")}</h1>
                    </div>
                    <div className="page-inner-statistics">
                        {statByOrganizersData?.map((item) => (
                            <StatisticsCard
                                title={item.type}
                                total={item.total} 
                                agencyPercent={item.partial.agency} 
                                otherPercent={item.partial.other} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default EventStatistics;
