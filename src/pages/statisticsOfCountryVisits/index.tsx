import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Select, theme } from "antd";
import {VisitCountryStatisticsDataTypes, VisitStatisticsEmployeesDataTypes } from "../../types";
import { VisitStatisticsEmployeesColumns, VisitStatisticsEmployeesData } from "../../tableData/visitStatistic";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { VisitCountryStatisticsColumns, VisitCountryStatisticsData } from "../../tableData/visitCountryStatistic";


const StatisticsOfCountryVisits: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }
    const handleRowClick = (record: { key: string }) => {
        navigate(`/countries/${record.key}`)
    }

     const handleClickOutside = useCallback((event: MouseEvent) => {
         if (openSortDropdown && sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
            setOpenSortDropdown(false);
         }
       }, [openSortDropdown]);
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.addEventListener("mousedown", handleClickOutside);
        }
      }, [handleClickOutside])
    const filterOptions = [
        {value: 'byName',label:'По названию'},
        {value: 'byVisit',label:'По визиту'},
        {value: 'byMeeting',label:'По встрече'},
        {value: 'all', label: 'Все'}
    ]

    const yearsOptions = [
        {value: '2025',label:'2025'},
        {value: '2024',label:'2024'},
        {value: '2023',label:'2023'},
        {value: '2022', label: '2022'}
    ]
    
    return (
        <MainLayout ref={sortDropdownRef}>
            <MainHeading title="Статистика визитов стран" subtitle="Подзаголоок">
                <Select options={filterOptions} size="large" className="select" placeholder="Сортировать по"/>
                <Select options={yearsOptions} size="large" className="select" placeholder="Выбрать год"/>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика визитов стран, за 2025 год:</h1>
                    </div>
                </div>
               <ComponentTable<VisitCountryStatisticsDataTypes> onRowClick={handleRowClick} columns={VisitCountryStatisticsColumns} data={VisitCountryStatisticsData}/>
            </div>
        </MainLayout>
    );
};

export default StatisticsOfCountryVisits;