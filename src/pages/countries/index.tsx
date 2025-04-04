import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { theme } from "antd";
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
        navigate(`/cooperation/countries/${record.key}`)
    }
    
    return (
        <MainLayout>
            <MainHeading title="Страны" subtitle="Подзаголоок">
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
                        <p className="text">По названию</p>
                    </div>
                    <div className="dropdown-sort-item">
                        <p className="text">По встречам</p>
                    </div>
                    <div className="dropdown-sort-item">
                        <p className="text">По визитам</p>
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
               <ComponentTable<CountriesTableDataType> onRowClick={handleRowClick} columns={CountriesTableColumns} data={CountriesTableData}/>
            </div>
        </MainLayout>
    );
};

export default Countries;