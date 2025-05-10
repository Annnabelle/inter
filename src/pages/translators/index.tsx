import { useEffect, useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select, InputNumber } from "antd";
import { TranslatorsColumns } from "../../tableData/translators";
import { TranslatorsTableDataTypes } from "../../types";
import { FileItem } from "../../types/countries";
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


const Translators: React.FC = () => {
    const { t } = useTranslation();
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
    const [form] = Form.useForm();
    useEffect(() => {
        if(translators.length === 0){
            dispatch(retrieveTranslators({limit: 10, page: currentPage}))
        }
    }, [dispatch, translators.length, currentPage, limit])

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
        
        form.setFieldsValue({
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
            form.setFieldsValue({ languages: langs });
        }
    }, [modalState.translatorData, form]);
      
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
                toast.success('Переводчик добавлен успешно');
                setTimeout(() => {
                    handleModal('addTranslator', false);
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error('Ошибка при создании переводчика');
            }
        }catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
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
                toast.success('Переводчик успешно обновлен');
                setTimeout(() => {
                    handleModal('editTranslator', false);
                    dispatch(retrieveTranslators(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error('Ошибка при обновлении пользователя');
            }
        } catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
        }
    };
    const handleDeleteTranslator = async () => {
        try {
            const translatorId = modalState.translatorData?.id
            const resultAction = await dispatch(deleteTranslator(translatorId));
    
            if (deleteTranslator.fulfilled.match(resultAction)) {
            toast.success('Переводчик успешно удален');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error('Ошибка при удалении переводчика');
            }
        } catch (error) {
            toast.error('Ошибка при удалении переводчика');
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
                <FormComponent  onFinish={handleCreateTranslator}>
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
                handleDelete={() => handleDeleteOpen('Translator')}
            >
                {modalState.translatorData && (
                    <FormComponent onFinish={handleUpdateTranslator}>
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