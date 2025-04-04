import { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select } from "antd";
import { TranslatorsColumns, TranslatorsData } from "../../tableData/translators";
import { useNavigate } from "react-router-dom";
import { TranslatorsTableDataTypes } from "../../types";
import { FileItem } from "../../types/countries";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";


const Translators: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
        const [languages, setLanguages] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        addTranslator: false,
        editTranslator: false,
        retrieveTranslator: false,
        deleteTranslator: false
    });

    const addLanguagesField = () => {
        setLanguages([...languages, { id: languages.length + 1, name: "", file: null }]);
    };

    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'translator', action: 'Retrieve' | 'Edit' | 'Delete', record: TranslatorsTableDataTypes) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
    
        const modalKey = action === 'Retrieve' ? 'retrieveTranslator' 
                        : action === 'Edit' ? 'editTranslator' 
                        : 'deleteTranslator';
    
        setModalState((prev) => ({
            ...prev,
            [modalKey]: true,
        }));
    };

    const handleEditOpen = (type: 'Translator') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Translator') => {
        setModalState((prev) => ({
            ...prev,
            [`delete${type}`]: false,
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

    return (
        <MainLayout>
            <MainHeading title="Переводчики" subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <div className="main-heading-dropdown-item" onClick={() => handleSortDropdown()}>
                        <div className="dropdown-text">
                            <p className="text">Сортировать по</p>
                        </div>
                        <div className="dropdown-icon">
                            <IoIosArrowDown />
                        </div>
                    </div>
                    {openSortDropdown && (
                        <div className="dropdown-sort">
                            <div className="dropdown-sort-item">
                                <p className="text">По названию</p>
                            </div>
                            <div className="dropdown-sort-item">
                                <p className="text">По встречам</p>
                            </div>
                            <div className="dropdown-sort-item">
                                <p className="text">По визитам</p>
                            </div>
                        </div>
                    )}
                </div>
                    <Button onClick={() => handleModal('addTranslator', true)}>Добавить переводчика <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<TranslatorsTableDataTypes> onRowClick={(record) => handleRowClick('translator', 'Retrieve', record)} data={TranslatorsData} columns={TranslatorsColumns}/>
            </div>
            <ModalWindow title="Добавить переводчика" openModal={modalState.addTranslator} closeModal={() => handleModal('addTranslator', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="name" rules={[{required: true, message:"Введите Ф.И.О"}]}>
                                <Input className="input" size='large' placeholder="Ф.И.О"/>
                            </Form.Item>
                        </div>
                        {languages.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="language" rules={[{required: true, message:"Выберите язык"}]}>
                                    <Select className="input" size="large" options={languageOption} placeholder="Выберите язык" />
                                </Form.Item>
                                <Form.Item className="input" name="points" rules={[{required: true, message:"Введите балов"}]}>
                                    <Input className="input" size='large' placeholder="балы"/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new" onClick={addLanguagesField}>
                            <p className="form-btn-new-text">Добавить язык</p>
                        </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть переводчика" openModal={modalState.retrieveTranslator} closeModal={() => handleModal('retrieveTranslator', false)} handleEdit={() => handleEditOpen('Translator')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" rules={[{required: true, message:"Введите Ф.И.О"}]}>
                            <Input disabled className="input" size='large' placeholder="Ф.И.О"/>
                        </Form.Item>
                    </div>
                    {languages.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="language" rules={[{required: true, message:"Выберите язык"}]}>
                                <Select disabled className="input" size="large" options={languageOption} placeholder="Выберите язык" />
                            </Form.Item>
                            <Form.Item className="input" name="points" rules={[{required: true, message:"Введите балов"}]}>
                                <Input disabled className="input" size='large' placeholder="балы"/>
                            </Form.Item>
                        </div>
                    ))}
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Изменить переводчика" openModal={modalState.editTranslator} closeModal={() => handleModal('editTranslator', false)} handleDelete={() => handleDeleteOpen('Translator')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" rules={[{required: true, message:"Введите Ф.И.О"}]}>
                            <Input className="input" size='large' placeholder="Ф.И.О"/>
                        </Form.Item>
                    </div>
                    {languages.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="language" rules={[{required: true, message:"Выберите язык"}]}>
                                <Select className="input" size="large" options={languageOption} placeholder="Выберите язык" />
                            </Form.Item>
                            <Form.Item className="input" name="points" rules={[{required: true, message:"Введите балов"}]}>
                                <Input className="input" size='large' placeholder="балы"/>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new" onClick={addLanguagesField}>
                        <p className="form-btn-new-text">Добавить язык</p>
                    </div>
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteTranslator} title="Вы точно хотите удалить переводчика?" className="modal-tight" closeModal={() => handleModal('deleteTranslator', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteTranslator', false)} className="outline">Отменить</Button>
                        <Button className="danger">Удалить</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Translators;