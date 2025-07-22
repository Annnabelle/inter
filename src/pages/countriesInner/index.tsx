import { useEffect, useMemo, useState } from "react";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { Country } from "../../types/countries";
import { CountriesEventTableColumns } from "../../tableData/countriesInnerEvent";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { fetchCountries, RetrieveCountries } from "../../store/countries";
import { useParams } from "react-router-dom";
import { CreateInternationalDocument, DeleteInternationalDocument, RetrieveInternationalDocumentById, RetrieveInternationalDocuments, UpdateInternationalDocumentRequest } from "../../store/internationalDocuments";
import { InternationalDocument, InternationalDocuments, InternationalDocumentsTableDataType } from "../../types/internationalDocuments";
import { InternationalDocumentsTableColumn } from "../../tableData/internationalDocuments";
import { normalizeUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { CreateDocument } from "../../store/uploads";
import { fetchOrganizationSearch } from "../../store/organizations";
import { Document } from "../../types/uploads";
import { IoMdAdd } from "react-icons/io";
import { RetrieveEvents } from "../../store/events";
import { CountriesInnerEventDataType } from "../../types/events";
import { UserRole } from "../../utils/roles";
import { getUserRole } from "../../utils/getUserRole";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import dayjs from "dayjs";

const CountriesInner: React.FC = () => {
    const { t, i18n } = useTranslation();
    type Lang = 'ru' | 'uz' | 'en';
    const currentLang = i18n.language as Lang;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { token: { colorBgContainer }} = theme.useToken();
    const [files, setFiles] = useState([{ id: Date.now() }]);
    const documentById = useAppSelector((state) => state.internationalDocuments.internationalDocumentById)
    const countries = useAppSelector((state: RootState) => state.countries.countries)
    const limit = useAppSelector((state) => state.countries.limit)
    const eventsLimit = useAppSelector((state) => state.events.limit)
    const eventsPage = useAppSelector((state) => state.events.page)
    const eventsTotal = useAppSelector((state) => state.events.total)
    const documentPage = useAppSelector((state) => state.internationalDocuments.page)
    const documentTotal = useAppSelector((state) => state.internationalDocuments.total)
    const documentLimit = useAppSelector((state) => state.internationalDocuments.limit)
    const internationalDocuments = useAppSelector((state: RootState) => state.internationalDocuments.internationalDocuments)
    const [currentPage, setCurrentPage] = useState(documentPage);
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
    const [currentEventPage, setCurrentEventPage] = useState(eventsPage);
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
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
    const countriesSearch = useAppSelector((state) => state.countries.countriesSearch);
    const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch)
    const [searchType, setSearchType] = useState<'country' | 'organization'>('country');
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [editForm] = Form.useForm();
    const events = useAppSelector((state) => state.events.events)
    const visits = useAppSelector((state) => state.events.delegations);


    const handleTypeChange = (value: 'country' | 'organization') => {
        setSearchType(value);
        setOptions([]);
    };

    const handleSearch = (value: string) => {
        if (!value.trim()) return;

        if (searchType === 'country') {
            dispatch(fetchCountries({ query: value }));
        } else if (searchType === 'organization') {
            dispatch(fetchOrganizationSearch({ query: value }));
        }
    };

    useEffect(() => {
        const language = (i18n.resolvedLanguage || 'ru') as 'ru' | 'uz' | 'en';

        if (searchType === 'country') {
            setOptions(
            countriesSearch.map((c) => ({
                label: c.name?.[language] || c.name.ru,
                value: c.id,
            }))
            );
        } else {
            setOptions(
                organizationSearch.map((o) => ({
                    label: o.name?.[language] || o.name.ru,
                    value: o.id,
                }))
            );
        }
    }, [countriesSearch, searchType, organizationSearch,  i18n.resolvedLanguage]);

    useEffect(() => {
        if(events.length === 0){
            dispatch(RetrieveEvents({page: currentEventPage, limit: 10, sortOrder:'desc', countryId: id}))
        }
    }, [events.length, dispatch, limit])

    useEffect(() => {
        if(visits.length === 0){
            dispatch(RetrieveEvents({limit: 10, page: currentEventPage, eventTypes: 'delegations', countryId: id}))
        }
    }, [visits.length, dispatch, limit, currentEventPage, id])

    const eventsData = useMemo(() => {
        return events.map((event, index) => ({
            key: index + 1,
            name: event.name,
            eventType: event.eventType,
            start: dayjs(event.startDate).format('DD.MM.YYYY'),
            end: dayjs(event.endDate).format('DD.MM.YYYY'),
            comment: event?.comment
        }))
    }, [events, t])

    const DelegationsData = useMemo(() => {
        return visits.map((event, index) => ({
                key: index + 1,
                name: event.name,
                eventType: event.eventType,
                start: dayjs(event.startDate).format('DD.MM.YYYY'),
                end: dayjs(event.endDate).format('DD.MM.YYYY'),
                comment: event?.comment
            }));
    }, [visits, t]);    

    const internationalDocumentData = useMemo(() => {
        return internationalDocuments
        .filter((document) => document.countryId === id)
        .map((document, index) => ({
            key: document.id,
            itemNumber: index + 1,
            name: document.name,
            place: document.place,
            approval: document.approval,
            comment: document.comment,
            countryId: document.countryId,
            date: dayjs(document.date).format('DD.MM.YYYY'),
            organizationId: document.name,
            signLevel: document.signLevel
        }))
    }, [internationalDocuments, t, id]);


    useEffect(() => {
        if(countries.length === 0){
            dispatch(RetrieveCountries({limit: 10, page: currentPage}))
        }
    }, [dispatch, countries.length, currentPage, limit])

    useEffect(() => {
        if (selectedDocumentId) {
            dispatch(RetrieveInternationalDocumentById({id: selectedDocumentId}))
        }
    }, [dispatch, selectedDocumentId])

    useEffect(() => {
        if (documentById) {
            editForm.resetFields(); 
            editForm.setFieldsValue({
                name: documentById.name,
                place: documentById.place,
                approval: documentById.approval,
                comment: documentById.comment,
                date: dayjs(documentById.date),
                signLevel: documentById.signLevel,
                countryId: documentById.country?.name.ru,
                organization: documentById.organizationId
            });
        }
    }, [documentById, editForm]);

    const countryName: Country | undefined = countries.find(country => country?.id === id)
    
    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Document', action: 'retrieve' | 'edit' | 'delete', record: InternationalDocumentsTableDataType) => {

        if (type === 'Document'){
            const documentData = internationalDocuments.find((document) => document.id === record.key) ?? null
            setSelectedDocumentId(record.key)
            setModalState((prev) => ({
                ...prev,
                [`${action}${type}`]: true,
                DocumentData: documentData
            }))
        }
    };
      
    const handleEditOpen = (type: 'Document') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };  

    const handleDeleteOpen = (type: 'Document') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1 }]);
    };

     useEffect(() => {
        dispatch(RetrieveInternationalDocuments({ limit: 10, page: currentPage }));
    }, [dispatch, internationalDocuments.length, currentPage, limit])

    const handleCreateDocument = async(values: InternationalDocuments) => {
        try {
            const data = {...values, files: uploadedFileIds};
            const resultAction = await dispatch(CreateInternationalDocument(data))
            if(CreateInternationalDocument.fulfilled.match(resultAction)){
            toast.success(t('messages.documentAddedSuccess'))
            setTimeout(() => {
                handleModal('addDocument', false);
                window.location.reload()
            }, 1000)
            } else {
            toast.error(t('messages.documentCreateError'))
            }
        } catch (err) {
            toast.error((err as string) || t('messages.serverError'))
        }
    }
        
    const handleUpdateDocument = async (values: any) => {
        try {
            const updatedData = {...values, id: selectedDocumentId,     
            countryId: values.countryId?.value || documentById?.countryId,
            organizationId: values.organizationId?.value || documentById?.organizationId,};
            const resultAction = await dispatch(UpdateInternationalDocumentRequest(updatedData));
            
            if (UpdateInternationalDocumentRequest.fulfilled.match(resultAction)) {
                toast.success(t('messages.documentUpdatedSuccess'));
                setTimeout(() => {
                    handleModal('editDocument', false);
                    dispatch(RetrieveInternationalDocuments(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error(t('messages.documentUpdateError'));
            }
        } catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    };

    const handleFileUpload = async (file: File, onSuccess: Function, onError: Function) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await dispatch(CreateDocument(formData));
            const fileId = response?.payload?.upload?.id;
            console.log("fileId", fileId);
            
            if (fileId) {
                setUploadedFileIds(prev => [...prev, fileId]); 
                onSuccess(); 
            } else {
                throw new Error('File ID not found in response');
            }
            } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        }
    };
    
    const handleDeleteInternationalDocument = async () => {
        try {
            const reportId = modalState.DocumentData?.id
            const resultAction = await dispatch(DeleteInternationalDocument(reportId));
    
            if (DeleteInternationalDocument.fulfilled.match(resultAction)) {
            toast.success(t('messages.documentDeletedSuccess'));
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error(t('messages.documentDeleteError'));
            }
        } catch (error) {
            toast.error(t('messages.serverError'));
        }
    };

    const role = getUserRole();
    
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
                    {/* <div className="page-inner-content">
                        <div className="page-inner-content-title">
                            <h2 className="title">Test Name</h2>
                        </div>
                        <div className="page-inner-content-subtitle">
                            <p className="subtitle">Тестовый текст который будет написан в таком формате</p>
                        </div>
                    </div> */}
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            {t('tablesName.events')}
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerEventDataType> 
                        pagination={{
                            current: currentEventPage,
                            pageSize: eventsLimit,
                            total: eventsTotal,
                            onChange: (page) => {
                                setCurrentEventPage(page);
                                dispatch(RetrieveEvents({ page, limit: eventsLimit, countryId: id }));
                            },
                        }}
                        columns={CountriesEventTableColumns(t)} data={eventsData} 
                    />
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            {t('tablesName.visits')}
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerEventDataType> 
                        pagination={{
                            current: currentEventPage,
                            pageSize: eventsLimit,
                            total: eventsTotal,
                            onChange: (page) => {
                                setCurrentEventPage(page);
                                dispatch(RetrieveEvents({ page, limit: eventsLimit, countryId: id }));
                            },
                        }}
                        data={DelegationsData} columns={CountriesEventTableColumns(t)}/>
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <div className="heading-title">
                            <h3 className="title">
                                {t('tablesName.internationalDocuments')}
                            </h3>
                        </div>
                        <div className="heading-btn">
                            <Button onClick={() => handleModal('addDocument', true)}> {`${t('buttons.add')}`} {`${t('crudNames.document')}`} <IoMdAdd /></Button>
                        </div>
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
                <ModalWindow title={t('buttons.add') + " " + t('crudNames.document')} openModal={modalState.addDocument} closeModal={() => handleModal('addDocument', false)}>
                <FormComponent  onFinish={handleCreateDocument}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder={t('tableTitles.nameOfDocument')}/>
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input" placeholder={t('inputs.selectDate')}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Select
                            value={searchType}
                            onChange={handleTypeChange}
                            size="large"
                            options={[
                            { label: t('tableTitles.countries'), value: 'country' },
                            { label: t('titles.organizations'), value: 'organization' },
                            ]}
                            style={{ width: 200 }}
                        />
                        <Form.Item name={searchType === 'country' ? 'countryId' : 'organizationId'} className="input">
                            <Select
                                showSearch
                                placeholder={t('inputs.search')}
                                size="large"
                                className="input"
                                onSearch={handleSearch}
                                filterOption={false}
                                options={options}
                            />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="approval" >
                            <Input className="input" size='large' placeholder={t('inputs.levelOfSigning')}/>
                        </Form.Item>
                        <Form.Item className="input" name="place" >
                            <Input className="input" size='large' placeholder={t('tableTitles.placeOfSigning')}/>
                        </Form.Item>
                    </div>  
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input">
                                <Upload
                                customRequest={({ file, onSuccess, onError }) => 
                                    handleFileUpload(file as File, onSuccess!, onError!)
                                }
                                >
                                <Input
                                    className="input input-upload"
                                    size='large'
                                    placeholder={t('inputs.uploadFile')}
                                />
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                    </div>
                    <Button type="submit">{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            {documentById && selectedDocumentId && (
                <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.document')} openModal={modalState.retrieveDocument} closeModal={() => handleModal('retrieveDocument', false)} handleEdit={() => handleEditOpen('Document')}>
                    <FormComponent>
                        <div className="form-inputs">
                            {documentById.name && (
                                <Form.Item className="input" name="name" >
                                    <Input disabled className="input" size='large' placeholder={documentById.name}/>
                                </Form.Item>
                            )}
                            {documentById.date && (
                                <Form.Item className="input" name="date" >
                                    <DatePicker disabled size="large" className="input" placeholder={dayjs(documentById.date).format('DD/MM/YYYY')} />
                                </Form.Item>
                            )}
                        </div>
                        {documentById.country && (
                            <div className="form-inputs">
                                <Form.Item className="input" name="country">
                                    <Input disabled className="input" size='large'  placeholder={documentById.country.name?.[currentLang] || ""}/>
                                </Form.Item>
                            </div>  
                        )}
                        {documentById.organization?.name && (
                            <div className="form-inputs">
                                <Form.Item className="input" name="organization" >
                                    <Input disabled className="input" size='large'  placeholder={documentById.organization?.name?.[currentLang] || ""}/>
                                    {/* <Select disabled className="input" size="large" options={countryOptions}  /> */}
                                </Form.Item>
                            </div>  
                        )}
                        {documentById.approval && (
                            <div className="form-inputs">
                                <Form.Item className="input" name="approval" >
                                    <Input disabled className="input" size='large' placeholder={documentById.approval} />
                                </Form.Item>
                            </div>  
                        )}
                        {documentById?.files?.map((item: Document) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="document">
                                    <div className="input input-upload">
                                    <a
                                        href={normalizeUrl(item?.url)}
                                        download={item?.originalName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📄 {item?.originalName}
                                    </a>
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                    </FormComponent>
                </ModalWindow>
            )}
            {modalState.DocumentData && (
                <ModalWindow title={t('buttons.edit') + " " + t('crudNames.document')} openModal={modalState.editDocument} closeModal={() => handleModal('editDocument', false)}  
                {...(role !== UserRole.JUNIOR_INTL_OFFICER && { handleDelete: () => handleDeleteOpen('Document'),})}>
                    <FormComponent formProps={editForm} onFinish={handleUpdateDocument}>
                        <div className="form-inputs">
                            {modalState?.DocumentData?.name && (
                                <Form.Item className="input" name="name" >
                                    <Input className="input" size='large' />
                                </Form.Item>
                            )}
                            {modalState?.DocumentData?.date && (
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input" />
                                </Form.Item>
                            )}
                        </div>
                        <div className="form-inputs">
                            <Select
                                value={searchType}
                                onChange={handleTypeChange}
                                size="large"
                                options={[
                                { label: t('tableTitles.countries'), value: 'country' },
                                { label: t('titles.organizations'), value: 'organization' },
                                ]}
                                style={{ width: 200 }}
                            />
                            <Form.Item name={searchType === 'country' ? 'countryId' : 'organizationId'} className="input">
                                <Select
                                    labelInValue
                                    showSearch
                                    placeholder={t('inputs.search')}
                                    size="large"
                                    className="input"
                                    onSearch={handleSearch}
                                    filterOption={false}
                                    options={options}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            {modalState?.DocumentData?.place && (
                                <Form.Item className="input" name="place" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                            {modalState?.DocumentData?.approval && (
                                <Form.Item className="input" name="approval" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                        </div>
                         {documentById?.files?.map((item: Document) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="document">
                                    <div className="input input-upload">
                                    <a
                                        href={normalizeUrl(item?.url)}
                                        download={item?.originalName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📄 {item?.originalName}
                                    </a>
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                </ModalWindow>
            )}
            <ModalWindow openModal={modalState.deleteDocument} title={`${t('titles.areYouSure')} ${t('crudNames.document')}?`} className="modal-tight" closeModal={() => handleModal('deleteDocument', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteDocument', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteInternationalDocument()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
            </div>
        </MainLayout>
    );
}

export default CountriesInner