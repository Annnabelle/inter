import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Select, theme } from "antd";
import { CountriesTableDataType } from "../../types";
import { CountriesTableColumns, CountriesTableData } from "../../tableData/countriesTable";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";


const Countries: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }
    const handleRowClick = (record: { key: string }) => {
        navigate(`/countries/${record.key}`)
    }

    const filterOptions = [
        {value: 'byName',label:'По названию'},
        {value: 'byVisit',label:'По визиту'},
        {value: 'byMeeting',label:'По встрече'},
        {value: 'all', label: 'Все'}
    ]
    
    return (
        <MainLayout>
            <MainHeading title="Страны" subtitle="Подзаголоок">
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

export default Countries;