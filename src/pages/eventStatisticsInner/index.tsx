import { Form, Select, theme } from "antd";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";
import { StatisticByPartners, StatisticsByLevel, StatisticsByOrganizers } from "../../types/statistics";
import { StatByOrganizerColumns } from "../../tableData/statByOrganizaers";
import { useEffect, useMemo, useState } from "react";
import { RetrieveStatisticByLevel, RetrieveStatisticByOrganizer, RetrieveStatisticByPartners } from "../../store/stistics";
import { StatByLevelColumns } from "../../tableData/statByLevel";
import { StatByPartnersColumns } from "../../tableData/statByPartners";
import dayjs from "dayjs";
import SearchCountriesOrOrganizations from "../../components/searchCountriesOrOrganizations";

const EventStatistics: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useAppDispatch();
    const statByOrganizersData = useAppSelector((state) => state.statistics.statisticByOrg);
    const statByLevel = useAppSelector((state) => state.statistics.statisticByLevel)
    const statByPartners = useAppSelector((state) => state.statistics.statisticByPartners)
    const [selectedYear, setSelectedYear] = useState<string>("2025");
    const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

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

    useEffect(() => {
        if (selectedYear) {
            const startDate = new Date(`${selectedYear}-01-01T00:00:00.000Z`).toISOString();
            const endDate = new Date(`${selectedYear}-12-31T23:59:59.999Z`).toISOString();

            dispatch(RetrieveStatisticByLevel({ startDate, endDate }));
        }
    }, [selectedYear, dispatch]);

     useEffect(() => {
        if (selectedPartnerId) {
            dispatch(RetrieveStatisticByPartners({  partnerId: selectedPartnerId }));
        }
    }, [selectedPartnerId, dispatch]);

    const statByOrganizerData = useMemo(() => {
        return statByOrganizersData.map((params) => ({
            type: params.type,
            total: params.total,
            partial: {
                agency: params.partial.agency,
                other: params.partial.other,
            },
        }));
    }, [statByOrganizersData, t]);

    const statByLevelData = useMemo(() => {
        return statByLevel.map((params) => ({
            type: params.type,
            total: params.total,
            partial: {
                director: params.partial.director,
                deputy: params.partial.deputy,
                expert: params.partial.expert,
            },
        }));
    }, [statByLevel, t]);

    const statByPartnersData = useMemo(() => {
        return statByPartners.map((params) => ({
            name: params.name,
            comment: params.comment,
            eventType: params.eventType,
            startDate: dayjs(params.startDate).format('DD.MM.YYYY'),
            endDate: dayjs(params.endDate).format('DD.MM.YYYY')
        }))
    }, [statByPartners, t])

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
                </div>
                <ComponentTable<StatisticsByOrganizers>
                    data={statByOrganizerData}
                    columns={StatByOrganizerColumns(t)}
                />
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{t("titles.eventStatistics")} {t("tablesName.byLevel")}, {t("tablesName.for")} {selectedYear} {t("tablesName.year")}</h1>
                    </div>
                </div>
                <ComponentTable<StatisticsByLevel>
                    data={statByLevelData}
                    columns={StatByLevelColumns(t)}
                />
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{t("tablesName.partnersStatistics")}, {t("tablesName.for")}  {selectedYear} {t("tablesName.year")}</h1>
                    </div>
                </div>
                     <Form
                        onValuesChange={(_, allValues) => {
                            if (allValues?.partner?.value) {
                                setSelectedPartnerId(allValues.partner.value);
                            } else {
                                setSelectedPartnerId(null);
                            }
                        }}
                    >
                    <div className="page-stat-partners">
                        <SearchCountriesOrOrganizations fieldName="partner" />
                    </div>
                </Form>
                <ComponentTable<StatisticByPartners>
                    data={statByPartnersData}
                    columns={StatByPartnersColumns(t)}
                    />
            </div>
        </MainLayout>
    );
};

export default EventStatistics;