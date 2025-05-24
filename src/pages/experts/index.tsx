import { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, Select } from "antd";
import { ExpertsColumns } from "../../tableData/experts";
import { ExpertsTableDataTypes } from "../../types";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { CreateExpert, DeleteExpert, RetrieveExpertById, RetrieveExperts, UpdateExpert } from "../../store/expertsSlice";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { Expert, ExpertsType } from "../../types/experts.type";
import { toast } from "react-toastify";
import { CreateDocument, DeleteUpload } from "../../store/uploads";
import { Document } from "../../types/uploads";
import { normalizeUrl } from "../../utils/baseUrl";
import { FaTrashAlt } from "react-icons/fa";
import { fetchCountries } from "../../store/countries";
import { fetchOrganizationSearch } from "../../store/organizations";


const Experts: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { token: { colorBgContainer },} = theme.useToken();
    const [files, setFiles] = useState([{ id: Date.now() }]);
    const [modalState, setModalState] = useState<{
        addExpert: boolean,
        editExpert: boolean,
        retrieveExpert: boolean,
        deleteExpert: boolean,
        expertData: Expert | null
      }>({
        addExpert: false,
        editExpert: false,
        retrieveExpert: false,
        deleteExpert: false,
        expertData: null
      });
    const dispatch = useAppDispatch()
    const limit = useAppSelector((state) => state.experts.limit)
    const page = useAppSelector((state) => state.experts.page)
    const total = useAppSelector((state) => state.experts.total)
    const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch)
    const [searchType, setSearchType] = useState<'organization'>('organization');
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const expertsData = useAppSelector((state: RootState) => state.experts.experts)
    const expertById = useAppSelector((state) => state.experts.expertById)
    const [currentPage, setCurrentPage] = useState(page);
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
    const [editForm] = Form.useForm();
    const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null)
    const supportedLangs = ['ru', 'en', 'uz'] as const;
    const fallbackLang: (typeof supportedLangs)[number] = 'ru';
    const [localFiles, setLocalFiles] = useState<Document[]>([]);

    const currentLang = supportedLangs.includes(i18n.resolvedLanguage as any)
    ? (i18n.resolvedLanguage as typeof fallbackLang)
    : fallbackLang;

    useEffect(() => {
        if (expertsData.length === 0 ){
            dispatch(RetrieveExperts({limit: 10, page: currentPage}))
        }
    }, [dispatch, expertsData.length, currentPage, limit])

    const handleTypeChange = (value: 'organization') => {
        setSearchType(value);
        setOptions([]);
    };

    const handleSearch = (value: string) => {
        if (!value.trim()) return;

        if (searchType === 'organization') {
            dispatch(fetchOrganizationSearch({ query: value }));
        };
    }

    useEffect(() => {
        const language = (i18n.resolvedLanguage || 'ru') as 'ru' | 'uz' | 'en';

        if (searchType === 'organization') {
            setOptions(
                organizationSearch.map((o) => ({
                    label: o.name?.[language] || o.name.ru,
                    value: o.id,
                }))
            );
        }
    }, [ searchType, organizationSearch,  i18n.resolvedLanguage]);
    

    const expertData = useMemo(() => {
        return expertsData.map((expert) => ({
            key: expert.id,
            fullName: expert.firstName + " " + expert.lastName,
            phone: expert.phone,
            email: expert.email,
            comment: expert.comment,
            spheres: expert.spheres,
        }))
    }, [expertsData, t])

    useEffect(() => {
        if(expertById){
            editForm.resetFields(); 
            editForm.setFieldsValue({
                firstName: expertById.firstName,
                lastName: expertById.lastName,
                phone: expertById.phone,
                spheres: expertById.spheres,
                comment: expertById.comment,
                organizationId: expertById.organization?.name?.[currentLang] || expertById.organization?.name?.[fallbackLang]

            })
        }
    }, [expertById, editForm])

     useEffect(() => {
        if (selectedExpertId) {
            dispatch(RetrieveExpertById({id: selectedExpertId}))
        }
    }, [dispatch, selectedExpertId])

    useEffect(() => {
        if (expertById?.files) {
            setLocalFiles(expertById.files); // используем копию
        }
    }, [expertById]);
    

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1}]);
    };


    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Expert', action: 'retrieve' | 'edit' | 'delete', record: ExpertsTableDataTypes) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        const expertData = expertsData.find(
        (expert) => expert.id === record.key) ?? null;
        setSelectedExpertId(record.key)
        setModalState((prev) => ({
        ...prev,
        [`${action}${type}`]: true,
        expertData: expertData,
        }));
    };

    const handleEditOpen = (type: 'Expert') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Expert') => {
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


    const handleFileUpload = async (file: File, onSuccess: Function, onError: Function) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await dispatch(CreateDocument(formData));
            const fileId = response?.payload?.upload?.id;
            
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

    const handleCreateExpert = async(values: ExpertsType) => {
        try {
          const data = {...values,  documents: uploadedFileIds};
          console.log('====================================');
          console.log(data, "data");
          console.log('====================================');
          const resultAction = await dispatch(CreateExpert(data))
          if(CreateExpert.fulfilled.match(resultAction)){
            toast.success('Эксперт добавлен успешно')
            setTimeout(() => {
              handleModal('chiefAdd', false);
              window.location.reload()
            }, 1000)
          } else {
            toast.error("Ошибка при создании эксперта")
          }
        } catch (err) {
          toast.error((err as string) || 'Ошибка сервера')
        }
    }

    const handleUpdateExpert= async (values: any) => {
        try {
            const updatedData = {
                ...values,
                    id: modalState?.expertData?.id,
                    organizationId: expertById?.organization?.id,
                    documents: [
                        ...(localFiles.map(file => file.id) || []),
                        ...(uploadedFileIds || [])
                    ]
            };
            const resultAction = await dispatch(UpdateExpert(updatedData));
            
            if (UpdateExpert.fulfilled.match(resultAction)) {
                toast.success('Эксперт успешно обновлен');
                setTimeout(() => {
                    handleModal('chiefEdit', false);
                    dispatch(RetrieveExperts(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error('Ошибка при обновлении эксперта');
            }
        } catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
        }
    };

    const handleDeleteExpert = async () => {
        try {
            const expertId = modalState.expertData?.id
            const resultAction = await dispatch(DeleteExpert(expertId));
    
            if (DeleteExpert.fulfilled.match(resultAction)) {
            toast.success('Эксперт успешно удален');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error('Ошибка при удалении эксперта');
            }
        } catch (error) {
            toast.error('Ошибка при удалении эксперта');
        }
    };

    console.log('expertId', expertById);
    

    const deleteUpload = async (id: string) => {
        try {
            const deleteUploadedFile = await dispatch(DeleteUpload({
                id,
                owner: expertById?.id,
                entity: 'expert'
            }));

            if (DeleteUpload.fulfilled.match(deleteUploadedFile)) {
                setLocalFiles(prev => prev.filter(file => file.id !== id));
                toast.success('Файл удален успешно');
            }
        } catch (error) {
            console.error("Ошибка при удалении файла:", error);
        }
    };



    return (
        <MainLayout>
            <MainHeading title={`${t('titles.experts')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                    <Button onClick={() => handleModal('addExpert', true)}>{t('buttons.add') + " " + t('crudNames.expert')} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<ExpertsTableDataTypes> 
               pagination={{
                    current: currentPage,
                    pageSize: limit,
                    total: total,
                    onChange: (page) => {
                        setCurrentPage(page);
                        dispatch(RetrieveExperts({ page, limit: limit }));
                    },
                }}
               onRowClick={(record) => handleRowClick('Expert', 'retrieve', record)} data={expertData} columns={ExpertsColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.expert')}  openModal={modalState.addExpert} closeModal={() => handleModal('addExpert', false)}>
                <FormComponent  onFinish={handleCreateExpert}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="firstName" >
                            <Input className="input" size='large' placeholder={t('inputs.name')}/>
                        </Form.Item>
                        <Form.Item className="input" name="lastName" >
                            <Input size="large" className="input" placeholder={t('inputs.lastName')}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="spheres" >
                            <Input className="input" size='large' placeholder={t('inputs.mainAreas')}/>
                        </Form.Item>
                        <Form.Item className="input" name="phone" >
                            <Input className="input" size='large' placeholder={t('inputs.phone')}/>
                        </Form.Item>
                    </div>  
                    <div className="form-inputs">
                         <Form.Item className="input" name="email" >
                            <Input className="input" size="large" placeholder={t('inputs.email')}/>
                        </Form.Item>
                        <Form.Item className="input" name="comment">
                            <Input className="input" size="large" placeholder={t('tableTitles.comment')}></Input>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Select
                            value={searchType}
                            onChange={handleTypeChange}
                            size="large"
                            options={[
                            { label: t('titles.organizations'), value: 'organization' },
                            ]}
                            style={{ width: 200 }}
                        />
                        <Form.Item name={searchType === 'organization' ? 'organizationId' : ' '} className="input">
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
            {modalState.expertData && (
                <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.expert')}  openModal={modalState.retrieveExpert} closeModal={() => handleModal('retrieveExpert', false)} handleEdit={() => handleEditOpen('Expert')}>
                    <FormComponent>
                            <div className="form-inputs">
                                {modalState?.expertData?.spheres && (
                                    <Form.Item className="input" name="spheres" >
                                        <Input disabled className="input" size='large' placeholder={modalState.expertData.spheres} />
                                    </Form.Item>
                                )}
                                {modalState?.expertData?.firstName && modalState.expertData && (
                                    <Form.Item className="input" name="fullName" >
                                        <Input disabled className="input" size='large' placeholder={modalState.expertData.firstName  + " " + modalState.expertData.lastName}/>
                                    </Form.Item>
                                )}
                            </div>
                            <div className="form-inputs">
                                {modalState?.expertData?.email && (
                                    <Form.Item className="input" name="email" >
                                        <Input disabled className="input" size='large' placeholder={modalState.expertData.email}/>
                                    </Form.Item>
                                )}
                                {modalState?.expertData?.phone && (
                                    <Form.Item className="input" name="phone" >
                                        <Input disabled className="input" size="large" placeholder={modalState?.expertData?.phone}  />
                                    </Form.Item>
                                )}
                            </div>  
                            {modalState?.expertData?.comment && (
                                <div className="form-inputs">
                                    <Form.Item className="input" name="comment" >
                                        <Input disabled className="input" size='large' placeholder={modalState.expertData.comment}/>
                                    </Form.Item>
                                </div>  
                            )}
                            {expertById?.organization?.name && (
                                <div className="form-inputs">
                                    <Form.Item className="input" name="" >
                                        <Input disabled className="input" size='large'  placeholder={expertById.organization?.name?.[currentLang] || ""}/>
                                    </Form.Item>
                                </div>  
                            )}
                            {expertById?.files?.map((item: Document) => (
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
                                        </div>
                                    </Form.Item>
                                </div>
                            ))}
                    </FormComponent>
                </ModalWindow>
            )}
            {expertById && (
                <ModalWindow title={t('buttons.edit') + " " + t('crudNames.expert')}  openModal={modalState.editExpert} closeModal={() => handleModal('editExpert', false)} handleDelete={() => handleDeleteOpen('Expert')}>
                    <FormComponent formProps={editForm} onFinish={handleUpdateExpert}>
                            <div className="form-inputs">
                                <Form.Item className="input" name="firstName" initialValue={expertById.firstName}>
                                    <Input className="input" size='large' placeholder={t('inputs.name')}/>
                                </Form.Item>
                                <Form.Item className="input" name="lastName" initialValue={expertById.lastName}>
                                    <Input size="large" className="input" placeholder={t('inputs.lastName')}/>
                                </Form.Item>
                            </div>
                            <div className="form-inputs">
                                <Form.Item className="input" name="spheres" initialValue={expertById.spheres}>
                                    <Input className="input" size='large' placeholder={t('inputs.mainAreas')}/>
                                </Form.Item>
                                <Form.Item className="input" name="phone" initialValue={expertById.phone} >
                                    <Input className="input" size='large' placeholder={t('inputs.phone')}/>
                                </Form.Item>
                            </div>  
                            <div className="form-inputs">
                                <Form.Item className="input" name="email" initialValue={expertById.email} >
                                    <Input className="input" size="large" placeholder={t('inputs.email')}/>
                                </Form.Item>
                                <Form.Item className="input" name="comment" initialValue={expertById.comment}>
                                    <Input className="input" size="large" placeholder={t('tableTitles.comment')}></Input>
                                </Form.Item>
                            </div>
                            <div className="form-inputs">
                                <Select
                                    value={searchType}
                                    onChange={handleTypeChange}
                                    size="large"
                                    options={[
                                    { label: t('titles.organizations'), value: 'organization' },
                                    ]}
                                    style={{ width: 200 }}
                                />
                                <Form.Item name={searchType === 'organization' ? 'organizationId' : ''} className="input">
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
                            {expertById?.files?.map((item: Document) => (
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
                                            <div className="deleteUpload" onClick={() => deleteUpload(item?.id)}>
                                                <FaTrashAlt/>
                                            </div>
                                        </div>
                                    </Form.Item>
                                </div>
                            ))}
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                </ModalWindow>
            )}
            <ModalWindow openModal={modalState.deleteExpert} title={`${t('titles.areYouSure')} ${t('crudNames.expert')} ?`} className="modal-tight" closeModal={() => handleModal('deleteExpert', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteExpert', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteExpert()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default Experts;