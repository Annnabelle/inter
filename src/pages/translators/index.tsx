import { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select, InputNumber } from "antd";
import { TranslatorsColumns } from "../../tableData/translators";
import { TranslatorsTableDataTypes } from "../../types";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { createTranslator, deleteTranslator, retrieveTranslators, updateTranslator } from "../../store/translators";
import { FormatPhone, TranslatorLanguage } from "../../utils/consts";
import { CreateTranslatorRequest, Translator } from "../../types/translator";
import { toast } from "react-toastify";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { getUserRole } from "../../utils/getUserRole";
import { UserRole } from "../../utils/roles";


const Translators: React.FC = () => {
    const { t } = useTranslation();
    const role = getUserRole();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [modalState, setModalState] = useState<{
        addTranslator: boolean,
        editTranslator: boolean,
        retrieveTranslator: boolean,
        deleteTranslator: boolean,
        translatorData: Translator | null
    }>({
        addTranslator: false,
        editTranslator: false,
        retrieveTranslator: false,
        deleteTranslator: false,
        translatorData:  null
    });

    const dispatch = useAppDispatch();
    const translators = useAppSelector((state: RootState) => state.translators.translators)
    const limit = useAppSelector((state) => state.translators.limit)
    const page = useAppSelector((state) => state.translators.page)
    const total = useAppSelector((state) => state.translators.total)
    const [currentPage, setCurrentPage] = useState(page);
    const [editForm] = Form.useForm();
    useEffect(() => {
        if(translators.length === 0){
            dispatch(retrieveTranslators({limit: 10, page: currentPage}))
        }
    }, [dispatch, translators.length, currentPage, limit])

    useEffect(() => {
        if (modalState.translatorData) {
            editForm.setFieldsValue({
            firstName: modalState.translatorData.firstName,
            lastName: modalState.translatorData.lastName,
            phone: modalState.translatorData.phone,
            email: modalState.translatorData.email,
            languages: (modalState.translatorData.languages || []).map((item) => ({
                language: item.language,
                rating: item.rating,
            })),
            });
    }
    }, [modalState.translatorData, editForm]);


    const [languages, setLanguages] = useState<{ language: TranslatorLanguage | string; rating: number | null; }[]>([]);

    const TranslatorsData = useMemo(() => { 
        return translators.map((translator) => ({
            key: translator.id ?? "",
            fullName: translator.firstName + " " + translator.lastName,
            languages: translator.languages,
            phone: FormatPhone(translator.phone),
            status: translator.status,
            email: translator.email,
        }));
    }, [translators]);

    const addLanguagesField = () => {
        const newLang = { language: '', rating: null };
        const updatedLanguages = [...languages, newLang];
        setLanguages(updatedLanguages);
        
        editForm.setFieldsValue({
            languages: updatedLanguages
        });
    };

    useEffect(() => {
        if (modalState.translatorData) {
            const langs = modalState.translatorData.languages.map(l => ({
            language: l.language,
            rating: l.rating
            }));
            setLanguages(langs);
            editForm.setFieldsValue({ languages: langs });
        }
    }, [modalState.translatorData, editForm]);
      
    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }
    const handleRowClick = async (
        type: 'Translator',
        action: 'retrieve' | 'edit' | 'delete',
        record: TranslatorsTableDataTypes
      ) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        const translator = translators.find((translator) => translator.id === record.key);
        
        if (translator) {
          setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
            translatorData: translator,
          }));
        }
    };
    const handleEditOpen = (type: 'Translator') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };
    const handleDeleteOpen = (type: 'Translator') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };
    const languageOption = Object.entries(TranslatorLanguage).map(([code, name]) => ({
        value: name,
        label: name,
    }));
    const handleCreateTranslator = async (values: CreateTranslatorRequest) => {
        try {
            const payload = {...values};
            const resultAction = await dispatch(createTranslator(payload));
            if (createTranslator.fulfilled.match(resultAction)) {
                toast.success(t('messages.translatorAddedSuccess'));
                setTimeout(() => {
                    handleModal('addTranslator', false);
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error(t('messages.translatorCreateError'));
            }
        }catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    }
    const handleUpdateTranslator = async (values: any) => {
        try {
            const updatedData = {
                ...values,
                id: modalState.translatorData?.id,
            };
            const resultAction = await dispatch(updateTranslator(updatedData));
        
            if (updateTranslator.fulfilled.match(resultAction)) {
                toast.success(t('messages.translatorUpdatedSuccess'));
                setTimeout(() => {
                    handleModal('editTranslator', false);
                    dispatch(retrieveTranslators(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error(t('messages.translatorUpdateError'));
            }
        } catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    };
    const handleDeleteTranslator = async () => {
        try {
            const translatorId = modalState.translatorData?.id
            const resultAction = await dispatch(deleteTranslator(translatorId));
    
            if (deleteTranslator.fulfilled.match(resultAction)) {
            toast.success(t('messages.translatorDeletedSuccess'));
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error(t('messages.translatorDeleteError'));
            }
        } catch (error) {
            toast.error(t('messages.serverError'));
        }
    };
    const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]
    return (
        <MainLayout>
            <MainHeading title={`${t('titles.translators')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                    <Button onClick={() => handleModal('addTranslator', true)}>{`${t('buttons.add')}`} {`${t('crudNames.translator')}`} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<TranslatorsTableDataTypes> 
                pagination={{
                    current: currentPage,
                    pageSize: limit,
                    total: total,
                    onChange: (page) => {
                        setCurrentPage(page);
                        dispatch(retrieveTranslators({ page, limit: limit }));
                    },
                }}
               onRowClick={(record) => handleRowClick('Translator', 'retrieve', record)} 
               data={TranslatorsData} 
               columns={TranslatorsColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.translator')}  openModal={modalState.addTranslator} closeModal={() => handleModal('addTranslator', false)}>
                <FormComponent onFinish={handleCreateTranslator}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="firstName" >
                            <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                        </Form.Item>
                        <Form.Item className="input" name="lastName" >
                            <Input className="input" size='large' placeholder={`${t('inputs.lastName')}`} />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="phone" >
                            <Input className="input" size='large' placeholder={`${t('inputs.phone')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="email" >
                            <Input className="input" size='large' placeholder={`${t('inputs.email')}`}/>
                        </Form.Item>
                    </div>
                    {languages.map((item, index) => (
                        <div className="form-inputs" key={index}>
                            <Form.Item
                                className="input"
                                name={['languages', index, 'language']}
                            >
                            <Select
                                className="input"
                                size="large"
                                options={languageOption}
                                placeholder={t('inputs.selectLanguage')}
                            />
                            </Form.Item>
                            <Form.Item
                                className="input"
                                name={['languages', index, 'rating']}
                            >
                                <InputNumber
                                className="input"
                                size="large"
                                placeholder={t('inputs.points')}
                            />
                            </Form.Item>
                        </div>
                        ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addLanguagesField}>{t('buttons.addLang')}</p>
                    </div>
                    <Button type="submit">{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.translator')} openModal={modalState.retrieveTranslator} closeModal={() => handleModal('retrieveTranslator', false)} handleEdit={() => handleEditOpen('Translator')}>
                {modalState.translatorData && (    
                   <FormComponent  >
                    <div className="form-inputs">
                        <Form.Item className="input" name="firstName" >
                            <Input disabled className="input" size='large' placeholder={modalState.translatorData.firstName}/>
                        </Form.Item>
                        <Form.Item className="input" name="lastName" >
                            <Input disabled className="input" size='large' placeholder={modalState.translatorData   .lastName} />
                        </Form.Item>
                    </div>
                   <div className="form-inputs">
                       <Form.Item className="input" name="phone" >
                           <Input disabled className="input" size='large' placeholder={modalState.translatorData.phone} />
                       </Form.Item>
                       <Form.Item className="input" name="email" >
                           <Input disabled className="input" size='large' placeholder={modalState.translatorData.email}/>
                       </Form.Item>
                   </div>
                   {modalState.translatorData.languages.map((item, index) => (
                       <div className="form-inputs" key={index}>
                           <Form.Item
                               className="input"
                               name={['languages', index, 'language']}
                           >
                           <Select
                               className="input"
                               size="large"
                               disabled
                               placeholder={item.language}
                           />
                           </Form.Item>
                           <Form.Item
                               className="input"
                               name={['languages', index, 'rating']}
                           >
                               <InputNumber
                                    className="input"
                                    disabled
                                    size="large"
                                    defaultValue={item.rating}
                                />
                           </Form.Item>
                       </div>
                       ))}
                    </FormComponent>
                )}
            </ModalWindow>
            <ModalWindow
                title={t('buttons.edit') + " " + t('crudNames.translator')}
                openModal={modalState.editTranslator}
                closeModal={() => handleModal('editTranslator', false)}
                {...(role !== UserRole.JUNIOR_INTL_OFFICER && { handleDelete: () => handleDeleteOpen('Translator'),})}
            >
                {modalState.translatorData && (
                    <FormComponent formProps={editForm} onFinish={handleUpdateTranslator}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="firstName" initialValue={modalState.translatorData.firstName}>
                                <Input className="input" size='large' placeholder={modalState.translatorData.firstName} />
                            </Form.Item>
                            <Form.Item className="input" name="lastName" initialValue={modalState.translatorData.lastName}>
                                <Input className="input" size='large' placeholder={modalState.translatorData.lastName} />
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="phone" initialValue={modalState.translatorData.phone}>
                                <Input className="input" size='large' placeholder={modalState.translatorData.phone} />
                            </Form.Item>
                            <Form.Item className="input" name="email" initialValue={modalState.translatorData.email}>
                                <Input className="input" size='large' placeholder={modalState.translatorData.email} />
                            </Form.Item>
                        </div>
                        {(languages || []).map((item, index) => (
                            <div className="form-inputs" key={index}>
                                <Form.Item
                                    className="input"
                                    name={['languages', index, 'language']}
                                    initialValue={item.language}
                                >
                                    <Select
                                        className="input"
                                        size="large"
                                        options={languageOption}
                                        placeholder={t('inputs.selectLanguage')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="input"
                                    name={['languages', index, 'rating']}
                                    initialValue={item.rating}
                                >
                                    <InputNumber
                                        className="input"
                                        size="large"
                                        placeholder={t('inputs.points')}
                                    />
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addLanguagesField}>
                            {t('buttons.addLang')}
                            </p>
                        </div>
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                )}
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteTranslator} title={`${t('titles.areYouSure')} ${t('crudNames.translator')} ?`} className="modal-tight" closeModal={() => handleModal('deleteTranslator', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteTranslator', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button onClick={handleDeleteTranslator} className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Translators;