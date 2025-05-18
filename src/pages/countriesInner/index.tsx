import { useEffect, useMemo, useState } from "react";
import { theme, Form, Input, Upload, DatePicker } from "antd";
import { Country, DateItem, FileItem } from "../../types/countries";
import { CountriesEventTableColumns, CountriesEventTableData } from "../../tableData/countriesInnerEvent";
import { CountriesInnerInternationalDocumentsColumns } from "../../tableData/countriesInnerInternationalDocuments";
import { CountriesInnerVisitsColumns, CountriesInnerVisitsData } from "../../tableData/countriesInnerVisitTable";
import { CountriesInnerEventDataType, CountriesInnerInternationalDocumentsDataType, CountriesInnerVisitsDataType } from "../../types";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { RetrieveCountries } from "../../store/countries";
import { useParams } from "react-router-dom";
import { RetrieveInternationalDocuments } from "../../store/internationalDocuments";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import dayjs from "dayjs";
import { InternationalDocument, InternationalDocumentsTableDataType } from "../../types/internationalDocuments";
import { InternationalDocumentsTableColumn } from "../../tableData/internationalDocuments";

const CountriesInner: React.FC = () => {
    const { t, i18n } = useTranslation();
    type Lang = 'ru' | 'uz' | 'en';
    const currentLang = i18n.language as Lang;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { token: { colorBgContainer }} = theme.useToken();
    const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [dates, setDates] = useState<DateItem[]>([{ id: 1, place: "", date: null }]);
    const countries = useAppSelector((state: RootState) => state.countries.countries)
    const limit = useAppSelector((state) => state.countries.limit)
    const page = useAppSelector((state) => state.countries.page)
    const total = useAppSelector((state) => state.countries.total)
    const documentPage = useAppSelector((state) => state.internationalDocuments.page)
    const documentTotal = useAppSelector((state) => state.internationalDocuments.total)
    const documentLimit = useAppSelector((state) => state.internationalDocuments.limit)
    const internationalDocuments = useAppSelector((state: RootState) => state.internationalDocuments.internationalDocuments)
    const [currentPage, setCurrentPage] = useState(page);
    const [currentDocumentPage, setCurrentDocumentPage] = useState(page);
    const [modalState, setModalState] = useState<{
        addDocument: boolean,
        editDocument: boolean,
        retrieveDocument: boolean,
        deleteDocument: boolean,
        DocumentData: InternationalDocument | null,
    }>({
        addDocument: false,
        editDocument: false,
        retrieveDocument: false,
        deleteDocument: false,
        DocumentData: null
    });

    useEffect(() => {
        if(countries.length === 0){
            dispatch(RetrieveCountries({limit: 10, page: currentPage}))
        }
    }, [dispatch, countries.length, currentPage, limit])

    // console.log(countries);

    const countryName: Country | undefined = countries.find(country => country?.id === id)
    

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }


    const handleRowClick = (type: 'Document', action: 'retrieve' | 'edit' | 'delete', record: InternationalDocumentsTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        if (type === 'Document'){
            const documentData = internationalDocuments.find((document) => document.id === record.key) ?? null
            setModalState((prev) => ({
                ...prev,
                [`${action}${type}`]: true,
                DocumentData: documentData
            }))
        }
    };
    
      
    const handleEditOpen = () => {
        setModalState((prev) => ({
            ...prev,
            retrieveDocument: false, 
        }));
    
        setTimeout(() => {
            setModalState((prev) => ({
                ...prev,
                editDocument: true,
            }));
        }, 0); 
    };
    

    const handleDeleteOpen = (type: 'document') => {
        setModalState((prev) => ({
          ...prev,
          [`${type}Delete`]: false,
        }));
        setTimeout(() => {
          setModalState((prev) => ({ ...prev, [`${type}Delete`]: true }));
        }, 10);
      };

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };
    const addDateField = () => {
        setDates([...dates, { id: dates.length + 1, place: "", date: null }]);
    };
    const onFinish = () => {
        console.log('hello finish');
    }
     useEffect(() => {
        dispatch(RetrieveInternationalDocuments({ limit: 2, page: currentPage }));
    }, [dispatch, internationalDocuments.length, currentPage, limit])

     const internationalDocumentData = useMemo(() => {
        return internationalDocuments.map((document, index) => ({
            key: document.id,
            itemNumber: index + 1,
            name: document.name,
            place: document.place,
            approval: document.approval,
            comment: document.comment,
            countryId: document.countryId,
            date: dayjs(document.date).format('YYYY-MM-DD'),
            organizationId: document.name,
            signLevel: document.signLevel
        }))
    }, [internationalDocuments, t])
    
    return (
        <MainLayout>
            <MainHeading title={`${t('titles.countries')}`} subtitle="Подзаголоок"/>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">{t('tableTitles.countries')}: {countryName?.name?.[currentLang]} </h1>
                    </div>
                    <div className="page-inner-content">
                        <div className="page-inner-content-title">
                            <h2 className="title">Test Name</h2>
                        </div>
                        <div className="page-inner-content-subtitle">
                            <p className="subtitle">Тестовый текст который будет написан в таком формате</p>
                        </div>
                    </div>
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            {t('tablesName.events')}
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerEventDataType> columns={CountriesEventTableColumns(t)} data={CountriesEventTableData} />
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            {t('tablesName.visits')}
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerVisitsDataType> data={CountriesInnerVisitsData} columns={CountriesInnerVisitsColumns(t)}/>
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <div className="heading-title">
                            <h3 className="title">
                                {t('tablesName.internationalDocuments')}
                            </h3>
                        </div>
                        {/* <div className="heading-btn">
                            <Button className="outline" onClick={() => handleModal('addDocument', true)}>{t('buttons.add')} {t('crudNames.document')} <IoMdAdd/></Button>
                        </div> */}
                    </div>
                     <ComponentTable<InternationalDocumentsTableDataType> 
                      pagination={{
                        current: currentPage,
                        pageSize: documentLimit,
                        total: documentTotal,
                        onChange: (page) => {
                            setCurrentPage(page);
                            dispatch(RetrieveInternationalDocuments({ page, limit: limit }));
                        },
                    }}
                     onRowClick={(record) => handleRowClick('Document', 'retrieve', record)} columns={InternationalDocumentsTableColumn(t)} data={internationalDocumentData}/>
                </div>
                <ModalWindow openModal={modalState.retrieveDocument} title={`${t('buttons.retrieve')} ${t('crudNames.document')}`} closeModal={() => handleModal('retrieveDocument', false)} handleEdit={() => handleEditOpen()}>
                    <FormComponent>
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="documentName" >
                                    <Input className="input" size='large' disabled/>
                                </Form.Item>
                                <Form.Item className="input" name="documentFile" >
                                    <Upload disabled>
                                        <Input className="input input-upload" size='large' disabled/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        {dates.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="place" >
                                    <Input size='large' className="input" disabled/>
                                </Form.Item>
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input" disabled placeholder=""/>
                                </Form.Item>
                            </div>
                        ))}
                    </FormComponent>
                </ModalWindow>
                <ModalWindow openModal={modalState.editDocument} title={`${t('buttons.edit')} ${t('crudNames.document')}`} closeModal={() => handleModal('editDocument', false)} handleDelete={() => handleDeleteOpen('document')}>
                        <FormComponent onFinish={onFinish}>
                            {files.map((item) => (
                                <div className="form-inputs" key={item?.id}>
                                    <Form.Item className="input" name="documentName" >
                                        <Input className="input" size='large' placeholder= {t('inputs.title')}/>
                                    </Form.Item>
                                    <Form.Item className="input" name="documentFile" >
                                        <Upload>
                                            <Input className="input input-upload" size='large' placeholder= {t('inputs.uploadFile')}/>
                                        </Upload>
                                    </Form.Item>
                                </div>
                            ))}
                            <div className="form-btn-new">
                                <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                            </div>
                            {dates.map((item) => (
                                <div className="form-inputs" key={item?.id}>
                                    <Form.Item className="input" name="place" >
                                        <Input size='large' className="input" placeholder= {t('inputs.placeOfSigning')}/>
                                    </Form.Item>
                                    <Form.Item className="input" name="date" >
                                        <DatePicker size="large" className="input" placeholder= {t('inputs.selectDate')}/>
                                    </Form.Item>
                                </div>
                            ))}
                            <div className="form-btn-new">
                                <p className="form-btn-new-text" onClick={addDateField}>{t('buttons.addAnotherDate')}</p>
                            </div>
                            <Button>{t('buttons.edit')}</Button>
                        </FormComponent>
                    </ModalWindow>
                <ModalWindow title={`${t('buttons.add')} ${t('crudNames.document')}`} openModal={modalState.addDocument} closeModal={() => handleModal('addDocument', false)}>
                    <FormComponent  onFinish={onFinish}>
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="documentName" >
                                    <Input className="input" size='large' placeholder={t('inputs.enterTitle')}/>
                                </Form.Item>
                                <Form.Item className="input" name="documentFile" >
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder={t('inputs.uploadFile')}/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                        </div>
                        {dates.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="place" >
                                    <Input size='large' className="input" placeholder={t('inputs.placeOfSigning')}/>
                                </Form.Item>
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input" placeholder={t('inputs.selectDate')}/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addDateField}>{t('buttons.addAnotherDate')}</p>
                        </div>
                        <Button>{t('buttons.create')}</Button>
                    </FormComponent>
                </ModalWindow>
                <ModalWindow openModal={modalState.deleteDocument} title={`${t('titles.areYouSure')} ${t('crudNames.document')} ?`} className="modal-tight" closeModal={() => handleModal('deleteDocument', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteDocument', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
            </div>
        </MainLayout>
    );
}

export default CountriesInner