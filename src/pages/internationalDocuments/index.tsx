import { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { InternationalDocumentsTableColumn } from "../../tableData/internationalDocuments";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ComponentTable from "../../components/table";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { CreateInternationalDocument, DeleteInternationalDocument, RetrieveInternationalDocumentById, RetrieveInternationalDocuments, UpdateInternationalDocumentRequest } from "../../store/internationalDocuments";
import { InternationalDocument, InternationalDocuments, InternationalDocumentsTableDataType } from "../../types/internationalDocuments";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Document } from "../../types/uploads";
import { normalizeUrl } from "../../utils/baseUrl";
import { fetchCountries } from "../../store/countries";
import { fetchOrganizationSearch } from "../../store/organizations";
import { CreateDocument } from "../../store/uploads";
import { getUserRole } from "../../utils/getUserRole";
import { UserRole } from "../../utils/roles";


const InternationalDocumentsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const role = getUserRole();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch  =  useAppDispatch();
    const internationalDocuments = useAppSelector((state: RootState) => state.internationalDocuments.internationalDocuments)
    const page = useAppSelector((state) => state.internationalDocuments.page)
    const total = useAppSelector((state) => state.internationalDocuments.total)
    const limit = useAppSelector((state) => state.internationalDocuments.limit)
    const [currentPage, setCurrentPage] = useState(page);
    const [files, setFiles] = useState([{ id: Date.now() }]);
    const documentById = useAppSelector((state) => state.internationalDocuments.internationalDocumentById)
    const [editForm] = Form.useForm();
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
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
    const supportedLangs = ['ru', 'en', 'uz'] as const;
    const fallbackLang: (typeof supportedLangs)[number] = 'ru';
    const currentLang = supportedLangs.includes(i18n.resolvedLanguage as any)
    ? (i18n.resolvedLanguage as typeof fallbackLang)
    : fallbackLang;

    const handleTypeChange = (value: 'country' | 'organization') => {
        setSearchType(value);
        setOptions([]);
    };

    useEffect(() => {
        dispatch(RetrieveInternationalDocuments({ limit: 10, page: currentPage }));
    }, [dispatch, internationalDocuments.length, currentPage, limit])
    
    const addFileField = () => {
        setFiles([...files, { id: files.length + 1}]);
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


    const internationalDocumentData = useMemo(() => {
        return internationalDocuments.map((document, index) => ({
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
    }, [internationalDocuments, t])
    
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

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Document', action: 'retrieve' | 'edit' | 'delete', record: InternationalDocumentsTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
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

    const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]

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
          console.log('resultAction', resultAction);
          
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

    return (
        <MainLayout>
            <MainHeading title={`${t('titles.internationalDocuments')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                <Button onClick={() => handleModal('addDocument', true)}> {`${t('buttons.add')}`} {`${t('crudNames.document')}`} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<InternationalDocumentsTableDataType>
                pagination={{
                    current: currentPage,
                    pageSize: limit,
                    total: total,
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
                            {modalState.DocumentData.name && (
                                <Form.Item className="input" name="name" >
                                    <Input className="input" size='large' />
                                </Form.Item>
                            )}
                            {modalState.DocumentData.date && (
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
                            {modalState.DocumentData.place && (
                                <Form.Item className="input" name="place" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                            {modalState.DocumentData.approval && (
                                <Form.Item className="input" name="approval" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                        </div>
                         {documentById?.files?.map((item: Document) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="document">
                                    <div className="input-upload-items">
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
                                        {/* <div className="deleteUpload" onClick={() => deleteUpload(item?.id)}>
                                            <FaTrashAlt/>
                                        </div> */}
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
        </MainLayout>
    );
};

export default InternationalDocumentsPage;