
// import { useNavigate } from "react-router-dom";
// import { Select, theme } from "antd";
// import { CountriesTableDataType } from "../../types";
// import { CountriesTableColumns } from "../../tableData/countriesTable";
// import MainLayout from "../../components/layout";
// import MainHeading from "../../components/mainHeading";
// import ComponentTable from "../../components/table";
// import { useTranslation } from "react-i18next";


// const Statistics: React.FC = () => {
//     const { t } = useTranslation();
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();
//     // const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
//     const navigate = useNavigate()
//     // const handleSortDropdown = () => {
//     //     setOpenSortDropdown((prev) => (!prev))
//     // }
//     const handleRowClick = (record: { key: string }) => {
//         navigate(`/cooperation/countries/${record.key}`)
//     }

//     const filterOptions = [
//         {value: 'byName',label: t('buttons.sort.byName')},
//         {value: 'byVisit',label: t('buttons.sort.byVisit')},
//         {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
//         {value: 'all', label: t('buttons.sort.all')}
//     ]
    
//     return (
//         <MainLayout>
//             <MainHeading title={`${t('titles.statistics')}`}  subtitle="Подзаголоок">
//                 <div className="main-heading-dropdown main-heading-dropdown-single-btn">
//                     <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
//                 </div>
//             </MainHeading>
//             <div
//                 style={{
//                     background: colorBgContainer,
//                 }}
//                 className="layout-content-container"
//             >
//                <ComponentTable<CountriesTableDataType> onRowClick={handleRowClick} columns={CountriesTableColumns(t)} data={CountriesTableData}/>
//             </div>
//         </MainLayout>
//     );
// };

// export default Statistics;