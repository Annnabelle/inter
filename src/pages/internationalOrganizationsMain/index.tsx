import { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { CreateOrganization, Organization, Organizations } from "../../types/organizations";
import { OrganizationsTableColumns } from "../../tableData/organization";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { createOrganization, deleteOrganization, retrieveInternationalOrganizations, updateOrganization } from "../../store/organizations";
import { toast } from "react-toastify";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { useNavigate } from "react-router-dom";


const InternationalOrganizationsMain: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.resolvedLanguage)
    const { token: { colorBgContainer }} = theme.useToken();
    const navigate = useNavigate()
    const [modalState, setModalState] = useState<{
        addOrganizations: boolean,
        editOrganizations: boolean,
        retrieveOrganizations: boolean,
        deleteOrganizations: boolean,
        organizationData: Organization | null
    }>({
        addOrganizations: false,
        editOrganizations: false,
        retrieveOrganizations: false,
        deleteOrganizations: false,
        organizationData: null
    });

    const dispatch  =  useAppDispatch();
    const internationalOrganizations = useAppSelector((state: RootState) => state.organizations.internationalOrganizations)
    const limit = useAppSelector((state) => state.organizations.limit)
    const page = useAppSelector((state) => state.organizations.page)
    const total = useAppSelector((state) => state.organizations.total)
    const [currentPage, setCurrentPage] = useState(page);
    const type = 'international';
    const [editForm] = Form.useForm();

    useEffect(() => {
        if(internationalOrganizations.length === 0){
            dispatch(retrieveInternationalOrganizations({limit: 10, page: currentPage}))
        }
    }, [dispatch, internationalOrganizations.length, currentPage, limit])

    console.log('internationalOrganizations', internationalOrganizations);
    
    

    const InternationalOrganizationsData = useMemo(() => {
        return internationalOrganizations.map((organization) => ({
            key: organization.id,
            organizationName: organization.name,
            organizationType: organization.organizationType,
            comment: organization.comment,
            action: t('buttons.retrieve')
        }))
    }, [internationalOrganizations, t])
    
    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (
        type: 'Organizations',
            action: 'retrieve' | 'edit' | 'delete',
            record: Organizations
        ) => {
            console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        
        if (action === 'retrieve') {
            navigate(`/international-organizations/${record.key}`);
        }
    };

    const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]

    const handleCreateOrganization = async (values: CreateOrganization) => {
        try {
             const payload = {
                ...values,
                name: {
                    ru: values.name.ru,  
                    uz: values.name.uz,
                    en: values.name.en
                },
                organizationType: type,
            };
            
            const resultAction = await dispatch(createOrganization(payload));
            if (createOrganization.fulfilled.match(resultAction)) {
                toast.success(t('messages.organizationAddedSuccess'));
                setTimeout(() => {
                    handleModal('addOrganizations', false);
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error(t('messages.organizationCreateError'));
            }
        }catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    }

    const handleEditOpen = (record: Organizations) => {
        const organization = internationalOrganizations.find(org => org.id === record.key);
        if (organization) {
            setModalState((prev) => ({
                ...prev,
                retrieveOrganizations: false,
                organizationData: organization,
            }));

            editForm.setFieldsValue({
                name: {
                    ru: organization.name.ru,
                    uz: organization.name.uz,
                    en: organization.name.en,
                },
                comment: organization.comment,
            });

            setTimeout(() => {
                setModalState((prev) => ({ ...prev, editOrganizations: true }));
            }, 10);
        }
    };



    const handleDeleteOpen = (record: Organizations) => {
        const organization = internationalOrganizations.find(org => org.id === record.key);
        if (organization) {
            setModalState((prev) => ({
                ...prev,
                editOrganizations: false,
                organizationData: organization, 
            }));

            setTimeout(() => {
                setModalState((prev) => ({ ...prev, deleteOrganizations: true }));
            }, 10);
        }
    };

    const handleUpdateOrganization = async (values: any) => {
        try {
            const updatedData = {
                ...values,
                id: modalState.organizationData?.id,
                type: type,
            };

            const resultAction = await dispatch(updateOrganization(updatedData));
            console.log('resultAction:', resultAction);

            if (updateOrganization.fulfilled.match(resultAction)) {
                toast.success(t('messages.organizationUpdatedSuccess'));
                setTimeout(() => {
                    handleModal('editOrganizations', false);
                    window.location.reload(); 
                }, 1000); 
            } else if (resultAction.error) {
                toast.error(resultAction.error.message || t('messages.organizationUpdateError'));
            } else {
                toast.error( t('messages.organizationUpdateError'));
            }
        } catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    };

    const handleDeleteOrganization = async () => {
        try {
            const organizationId = modalState.organizationData?.id
            const resultAction = await dispatch(deleteOrganization(organizationId));
    
            if (deleteOrganization.fulfilled.match(resultAction)) {
            toast.success(t('messages.organizationDeletedSuccess'));
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error(t('messages.organizationDeleteError'));
            }
        } catch (error) {
            toast.error(t('messages.serverError'));
        }
    };


    return (
        <MainLayout>
            <MainHeading title={`${t('titles.internationalOrganizations')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                    <Button onClick={() => handleModal('addOrganizations', true)}>{t('buttons.add') + " " + t('crudNames.organization')} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <ComponentTable<Organizations> 
                    pagination={{
                        current: currentPage,
                        pageSize: limit,
                        total: total,
                        onChange: (page) => {
                            setCurrentPage(page);
                            dispatch(retrieveInternationalOrganizations({ page, limit: limit }));
                        },
                    }}
                onRowClick={(record) => handleRowClick('Organizations', 'retrieve', record)} data={InternationalOrganizationsData} columns={OrganizationsTableColumns(t, currentLang ?? 'ru', handleEditOpen, handleDeleteOpen)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.organization')}  openModal={modalState.addOrganizations} closeModal={() => handleModal('addOrganizations', false)}>
                <FormComponent onFinish={handleCreateOrganization}>
                        <div className="form-inputs">
                            <Form.Item className="input" name={['name', 'ru']} >
                                <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'ru'}/>
                            </Form.Item>
                            <Form.Item className="input"name={['name', 'en']} >
                                 <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'en'}/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name={['name', 'uz']} >
                                <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'uz'}/>
                            </Form.Item>
                            <Form.Item className="input" name="comment" >
                                 <Input className="input" size='large' placeholder={t('tableTitles.comment') }/>
                            </Form.Item>
                        </div> 
                    <Button type="submit">{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.organization')} openModal={modalState.editOrganizations} closeModal={() => handleModal('editOrganizations', false)}>
                {modalState.organizationData && (
                    <FormComponent formProps={editForm} onFinish={handleUpdateOrganization}>
                        <div className="form-inputs">
                            <Form.Item className="input" name={['name', 'ru']}>
                                <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'ru'} />
                            </Form.Item>
                            <Form.Item className="input" name={['name', 'en']}>
                                <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'en'} />
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name={['name', 'uz']}>
                                <Input className="input" size='large' placeholder={t('inputs.nameOfTheOrganization') + " " + 'uz'} />
                            </Form.Item>
                            <Form.Item className="input" name="comment">
                                <Input className="input" size='large' placeholder={t('tableTitles.comment')} />
                            </Form.Item>
                        </div>
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                )}
            </ModalWindow>

            <ModalWindow openModal={modalState.deleteOrganizations} title={`${t('titles.areYouSure')} ${t('crudNames.organization')} ?`} className="modal-tight" closeModal={() => handleModal('deleteOrganizations', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteOrganizations', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteOrganization()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default InternationalOrganizationsMain;