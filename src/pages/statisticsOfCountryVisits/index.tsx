import {   useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Select, theme } from "antd";
import {VisitCountryStatisticsDataTypes } from "../../types";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { VisitCountryStatisticsColumns, VisitCountryStatisticsData } from "../../tableData/visitCountryStatistic";
import { useTranslation } from "react-i18next";


const StatisticsOfCountryVisits: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    // const handleSortDropdown = () => {
    //     setOpenSortDropdown((prev) => (!prev))
    // }
    const handleRowClick = (record: { key: string }) => {
        navigate(`/countries/${record.key}`)
    }

    //  const handleClickOutside = useCallback((event: MouseEvent) => {
    //      if (openSortDropdown && sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
    //         setOpenSortDropdown(false);
    //      }
    //    }, [openSortDropdown]);
    //   useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //       document.addEventListener("mousedown", handleClickOutside);
    //     }
    //   }, [handleClickOutside])
      const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]

    const yearsOptions = [
        {value: '2025',label:'2025'},
        {value: '2024',label:'2024'},
        {value: '2023',label:'2023'},
        {value: '2022', label: '2022'}
    ]
    
    return (
        <MainLayout ref={sortDropdownRef}>
            <MainHeading title={`${t('titles.statisticsOfCountryVisits')}`} subtitle="Подзаголоок">
                <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                <Select options={yearsOptions} size="large" className="select" placeholder={`${t('buttons.selectYear')}`}/>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{`${t('tablesName.countryVisitStatistics')}, ${t('tablesName.for')} 2025 ${t('tablesName.year')}`}</h1>
                    </div>
                </div>
               <ComponentTable<VisitCountryStatisticsDataTypes> onRowClick={handleRowClick} columns={VisitCountryStatisticsColumns(t)} data={VisitCountryStatisticsData}/>
            </div>
        </MainLayout>
    );
};

export default StatisticsOfCountryVisits;