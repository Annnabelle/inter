import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select } from "antd";
import { TranslatorsColumns, TranslatorsData } from "../../tableData/translators";
import { TranslatorsTableDataTypes } from "../../types";
import { FileItem } from "../../types/countries";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { useTranslation } from "react-i18next";


const Translators: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // const [form] = Form.useForm();
    const [languages, setLanguages] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    // const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    // const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        addTranslator: false,
        editTranslator: false,
        retrieveTranslator: false,
        deleteTranslator: false
    });

    const addLanguagesField = () => {
        setLanguages([...languages, { id: languages.length + 1, name: "", file: null }]);
    };

    // const handleSortDropdown = () => {
    //     setOpenSortDropdown((prev) => (!prev))
    // }

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Translator', action: 'retrieve' | 'edit' | 'delete', record: TranslatorsTableDataTypes) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
        }));
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

    const languageOption = [
        { value: "test1", label: "test1" },
        { value: "test2", label: "test2" },
        { value: "test3", label: "test3" },
        { value: "test4", label: "test4" },
        { value: "test5", label: "test5" },
      ];

    const onFinish = () => {
        console.log('hello finish');
    }

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
               <ComponentTable<TranslatorsTableDataTypes> onRowClick={(record) => handleRowClick('Translator', 'retrieve', record)} data={TranslatorsData} columns={TranslatorsColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.translator')}  openModal={modalState.addTranslator} closeModal={() => handleModal('addTranslator', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="fullName" >
                                <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                            </Form.Item>
                        </div>
                        {languages.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="language" >
                                    <Select className="input" size="large" options={languageOption} placeholder={t('inputs.selectLanguage')} />
                                </Form.Item>
                                <Form.Item className="input" name="points" >
                                    <Input className="input" size='large' placeholder={t('inputs.points')}/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addLanguagesField}>{t('buttons.addLang')}</p>
                        </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.translator')} openModal={modalState.retrieveTranslator} closeModal={() => handleModal('retrieveTranslator', false)} handleEdit={() => handleEditOpen('Translator')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="fullName" >
                            <Input disabled className="input" size='large' />
                        </Form.Item>
                    </div>
                    {languages.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="language" >
                                <Select disabled className="input" size="large" options={languageOption} />
                            </Form.Item>
                            <Form.Item className="input" name="points" >
                                <Input disabled className="input" size='large'/>
                            </Form.Item>
                        </div>
                    ))}
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.translator')}  openModal={modalState.editTranslator} closeModal={() => handleModal('editTranslator', false)} handleDelete={() => handleDeleteOpen('Translator')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="fullName" >
                            <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                        </Form.Item>
                    </div>
                    {languages.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="language" >
                                <Select className="input" size="large" options={languageOption} placeholder={t('inputs.selectLanguage')} />
                            </Form.Item>
                            <Form.Item className="input" name="points" >
                                <Input className="input" size='large' placeholder={t('inputs.points')}/>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addLanguagesField}>{t('buttons.addLang')}</p>
                    </div>
                    <Button>{t('buttons.edit')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteTranslator} title={`${t('titles.areYouSure')} ${t('crudNames.translator')} ?`} className="modal-tight" closeModal={() => handleModal('deleteTranslator', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteTranslator', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Translators;