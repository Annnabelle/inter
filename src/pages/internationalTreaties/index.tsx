
import { DatePicker, Form, Input, Select, theme, Upload } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { CreateAgreementDocument, DeleteAgreementDocument, RetrieveAgreementDocumentById, RetrieveAgreementDocuments, UpdateAgreementDocumentRequest } from "../../store/agreements";
import { fetchCountries } from "../../store/countries";
import { fetchOrganizationSearch } from "../../store/organizations";
import { CreateDocument } from "../../store/uploads";
import { InternationalTreatiesTableColumn } from "../../tableData/internationalTreaties";
import { AgreementDocument, AgreementDocuments, InternationalTreatiesTableDataType } from "../../types/agreements";
import { Document } from "../../types/uploads";
import { normalizeUrl } from "../../utils/baseUrl";
import Button from "../../components/button";
import FormComponent from "../../components/form";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import ModalWindow from "../../components/modalWindow";
import ComponentTable from "../../components/table";
import dayjs from "dayjs";


const InternationalTreaties: React.FC = () => {
    const { t, i18n } = useTranslation();
    const language = i18n.resolvedLanguage || 'ru';
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const dispatch  =  useAppDispatch();
    const agreementDocuments = useAppSelector((state: RootState) => state.agreement.agreementDocuments)
    const page = useAppSelector((state) => state.agreement.page)
    const total = useAppSelector((state) => state.agreement.total)
    const limit = useAppSelector((state) => state.agreement.limit)
    const [currentPage, setCurrentPage] = useState(page);
    const [files, setFiles] = useState([{ id: Date.now() }]);
    const agreementById = useAppSelector((state) => state.agreement.agreementDocumentById)
    const [editForm] = Form.useForm();
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
    const [modalState, setModalState] = useState<{
        addTreaties: boolean,
        editTreaties: boolean,
        retrieveTreaties: boolean,
        deleteTreaties: boolean,
        AgreementData: AgreementDocument | null,
    }>({
        addTreaties: false,
        editTreaties: false,
        retrieveTreaties: false,
        deleteTreaties: false,
        AgreementData: null
    });
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
    const countriesSearch = useAppSelector((state) => state.countries.countriesSearch);
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
        dispatch(RetrieveAgreementDocuments({ limit: 10, page: currentPage }));
    }, [dispatch, agreementDocuments.length, currentPage, limit])
    
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
        }
    }, [countriesSearch, searchType,  i18n.resolvedLanguage]);

    const agreementDocumentData = useMemo(() => {
        return agreementDocuments.map((document, index) => ({
            key: document.id,
            itemNumber: index + 1,
            name: document.name,
            place: document.place,
            comment: document.comment,
            countryId: document.countryId,
            date: dayjs(document.date).format('YYYY-MM-DD'),
            signLevel: document.signLevel
        }))
    }, [agreementDocuments, t])
    
    useEffect(() => {
        if (selectedDocumentId) {
            dispatch(RetrieveAgreementDocumentById({id: selectedDocumentId}))
        }
    }, [dispatch, selectedDocumentId])
    
    useEffect(() => {
        if (agreementById) {
            editForm.resetFields(); 
            editForm.setFieldsValue({
                name: agreementById.name,
                place: agreementById.place,
                comment: agreementById.comment,
                date: dayjs(agreementById.date),
                signLevel: agreementById.signLevel,
                countryId: agreementById.country?.name.ru,
            });
        }
    }, [agreementById, editForm]);

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }
    
    const handleRowClick = (type: 'Treaties', action: 'retrieve' | 'edit' | 'delete', record: InternationalTreatiesTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        if (type === 'Treaties'){
            const agreementData = agreementDocuments.find((agreement) => agreement.id === record.key) ?? null
            setSelectedDocumentId(record.key)
            setModalState((prev) => ({
                ...prev,
                [`${action}${type}`]: true,
                AgreementData: agreementData
            }))
        }
    };

    const handleEditOpen = (type: 'Treaties') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Treaties') => {
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

    const handleCreateDocument = async(values: AgreementDocuments) => {
        try {
            const data = {...values, files: uploadedFileIds};
            const resultAction = await dispatch(CreateAgreementDocument(data))
            if(CreateAgreementDocument.fulfilled.match(resultAction)){
            toast.success('Договор добавлен успешно')
            setTimeout(() => {
                handleModal('addDocument', false);
                window.location.reload()
            }, 1000)
            } else {
            toast.error("Ошибка при создании договора")
            }
        } catch (err) {
            toast.error((err as string) || 'Ошибка сервера')
        }
    }
        
    const handleUpdateDocument = async (values: any) => {
        try {
            const updatedData = {...values, id: selectedDocumentId,
            countryId: values.countryId?.value || agreementById?.countryId}
            const resultAction = await dispatch(UpdateAgreementDocumentRequest(updatedData));
            console.log('resultAction', resultAction);
            
            if (UpdateAgreementDocumentRequest.fulfilled.match(resultAction)) {
                toast.success('Договор успешно обновлен');
                setTimeout(() => {
                    handleModal('editDocument', false);
                    dispatch(RetrieveAgreementDocuments(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error('Ошибка при обновлении договора');
            }
        } catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
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
    
    const handleDeleteAgreementDocument = async () => {
        try {
            const reportId = modalState.AgreementData?.id
            const resultAction = await dispatch(DeleteAgreementDocument(reportId));
    
            if (DeleteAgreementDocument.fulfilled.match(resultAction)) {
            toast.success('Договор успешно удален');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        } else {
                toast.error('Ошибка при удалении договора');
            }
        } catch (error) {
            toast.error('Ошибка при удалении договора');
        }
    };

    return (
        <MainLayout>
            <MainHeading title={`${t('titles.internationalsTreaties')}`}  subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                <Button onClick={() => handleModal('addTreaties', true)}>{`${t('buttons.add')}`} {`${t('crudNames.agreement')}`} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<InternationalTreatiesTableDataType> onRowClick={(record) => handleRowClick('Treaties', 'retrieve', record)} columns={InternationalTreatiesTableColumn(t)} data={agreementDocumentData}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.agreement')} openModal={modalState.addTreaties} closeModal={() => handleModal('addTreaties', false)}>
                <FormComponent  onFinish={handleCreateDocument}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="name" >
                                <Input className="input" size='large' placeholder={t('inputs.contractTitle')}/>
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
                                ]}
                                style={{ width: 200 }}
                            />
                            <Form.Item name={searchType === 'country' ? 'countryId' : ' '} className="input">
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
                            <Form.Item className="input" name="place" >
                                <Input className="input" size='large' placeholder={t('inputs.placeOfSigning')}/>
                            </Form.Item>
                            <Form.Item className="input" name="signLevel" >
                                <Input className="input" size='large' placeholder={t('inputs.levelOfSigning')}/>
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
            {agreementById && selectedDocumentId && (
                <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.agreement')} openModal={modalState.retrieveTreaties} closeModal={() => handleModal('retrieveTreaties', false)} handleEdit={() => handleEditOpen('Treaties')}>
                    <FormComponent>
                        <div className="form-inputs">
                            {agreementById.name && (
                                <Form.Item className="input" name="name" >
                                    <Input disabled className="input" size='large' placeholder={agreementById.name} />
                                </Form.Item>
                            )}
                            {agreementById.date && (
                                <Form.Item className="input" name="date" >
                                    <DatePicker disabled size="large" className="input" placeholder={dayjs(agreementById.date).format('DD/MM/YYYY')}/>
                                </Form.Item>
                            )}
                        </div>
                        {agreementById.country && (
                            <div className="form-inputs">
                                <Form.Item className="input" name="country">
                                    <Input disabled className="input" size='large'  placeholder={agreementById.country.name?.[currentLang] || ""}/>
                                </Form.Item>
                            </div>  
                        )}
                        <div className="form-inputs">
                            {agreementById.place && (
                                <Form.Item className="input" name="place" >
                                    <Input disabled className="input" size='large' placeholder={agreementById.place}/>
                                </Form.Item>
                            )}
                            {agreementById.signLevel && (
                                <Form.Item className="input" name="signLevel" >
                                    <Input disabled className="input" size='large' placeholder={agreementById.signLevel}/>
                                </Form.Item>
                            )}
                        </div>  
                        {agreementById?.files?.map((item: Document) => (
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
            {modalState.AgreementData && (
                <ModalWindow title={t('buttons.edit') + " " + t('crudNames.agreement')} openModal={modalState.editTreaties} closeModal={() => handleModal('editTreaties', false)} handleDelete={() => handleDeleteOpen('Treaties')}>
                    <FormComponent formProps={editForm} onFinish={handleUpdateDocument}>
                        <div className="form-inputs">
                            {modalState.AgreementData.name && (
                                <Form.Item className="input" name="name" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                            {modalState.AgreementData.date && (
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input"/>
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
                            {modalState.AgreementData.place && (
                                <Form.Item className="input" name="place" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                            {modalState.AgreementData.signLevel && (
                                <Form.Item className="input" name="signLevel" >
                                    <Input className="input" size='large'/>
                                </Form.Item>
                            )}
                        </div>  
                        {/* {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" >
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder={t('inputs.uploadFile')}/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                        </div> */}
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                </ModalWindow>
            )}
            <ModalWindow openModal={modalState.deleteTreaties} title= {`${t('titles.areYouSure')} ${t('crudNames.agreement')} ?`} className="modal-tight" closeModal={() => handleModal('deleteTreaties', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteTreaties', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteAgreementDocument()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default InternationalTreaties;