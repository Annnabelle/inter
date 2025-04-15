import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Select, theme } from "antd";
import { CountriesTableDataType } from "../../types";
import { CountriesTableColumns, CountriesTableData } from "../../tableData/countriesTable";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";


const Statistics: React.FC = () => {
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

    const filterOptions = [
        {value: '2025',label:'2025'},
        {value: '2024',label:'2024'},
        {value: '2023',label:'2023'},
        {value: '2022', label: '2022'}
    ]
    
    return (
        <MainLayout>
            <MainHeading title="Статистика" subtitle="Подзаголоок">
                <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                    <Select options={filterOptions} size="large" className="select" placeholder="Сортировать по"/>
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<CountriesTableDataType> onRowClick={handleRowClick} columns={CountriesTableColumns} data={CountriesTableData}/>
            </div>
        </MainLayout>
    );
};

export default Statistics;