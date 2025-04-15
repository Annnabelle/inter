import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Select, theme } from "antd";
import {VisitStatisticsEmployeesDataTypes } from "../../types";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";
import { VisitStatisticsEmployeesColumns, VisitStatisticsEmployeesData } from "../../tableData/visitStatistic";


const EventVisitsEmployee: React.FC = () => {
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
        navigate(`/cooperation/countries/${record.key}`)
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
          const eventOptions = [
            { value: "2025", label: "2025" },
            { value: "2024", label: "2024" },
            { value: "2023", label: "2023" },
            { value: "2022", label: "2022" },
            { value: "2021", label: "2021" },
        ];
    return (
        <MainLayout ref={sortDropdownRef}>
            <MainHeading title="Статистика визитов сотрудников" subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
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
                <Select
                    defaultValue="2025"
                    style={{
                        height: 44.8,
                        color: 'white',
                        width: "100%",
                    }}
                    size="large"
                    className="input"
                    dropdownStyle={{ minWidth: 100 }}
                    options={eventOptions}
                />
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Статистика визитов сотрудников, за 2025 год:</h1>
                    </div>
                </div>
               <ComponentTable<VisitStatisticsEmployeesDataTypes> onRowClick={handleRowClick} columns={VisitStatisticsEmployeesColumns} data={VisitStatisticsEmployeesData}/>
            </div>
        </MainLayout>
    );
};

export default EventVisitsEmployee;