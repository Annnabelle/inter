
import { useNavigate } from "react-router-dom";
import { theme } from "antd";
import { CountriesTableDataType } from "../../types";
import { CountriesTableColumns } from "../../tableData/countriesTable";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useMemo, useState } from "react";
import { RetrieveCountries } from "../../store/countries";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ComponentTable from "../../components/table";


const Countries: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.resolvedLanguage)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const countries = useAppSelector((state: RootState) => state.countries.countries)
    const limit = useAppSelector((state) => state.countries.limit)
    const page = useAppSelector((state) => state.countries.page)
    const total = useAppSelector((state) => state.countries.total)
    const [currentPage, setCurrentPage] = useState(page);

    const handleRowClick = (record: { key: string }) => {
        navigate(`/countries/${record.key}`)
    }

    useEffect(() => {
        if(countries.length === 0){
            dispatch(RetrieveCountries({limit: 10, page: currentPage}))
        }
    }, [dispatch, countries.length, currentPage, limit])


    const countriesData = useMemo(() => {
        return countries.map((country) => ({
            key: country.id,
            name: country.name,
            comment: country.comment,
            action: t('buttons.retrieve'),
        }))
    }, [countries, t])
    
    return (
        <MainLayout>
            <MainHeading title={`${t('titles.countries')}`} subtitle="Подзаголовок">
                {/* <div className="main-heading-dropdown main-heading-dropdown-single-btn">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div> */}
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<CountriesTableDataType> 
                pagination={{
                    current: currentPage,
                    pageSize: limit,
                    total: total,
                    onChange: (page) => {
                        setCurrentPage(page);
                        dispatch(RetrieveCountries({ page, limit: limit }));
                    },
                }}
               onRowClick={handleRowClick} columns={CountriesTableColumns(t, currentLang ?? 'ru')} data={countriesData}/>
            </div>
        </MainLayout>
    );
};

export default Countries;