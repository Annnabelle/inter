import { useState } from "react";
import {  IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { AdministrationDataType } from "../../types";
import { FileItem } from "../../types/countries";
import { AdministrationTableColumns, AdministrationTableData } from "../../tableData/administartion";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";


const Administation: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
        const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [modalState, setModalState] = useState({
        addAdministration: false,
        editAdministration: false,
        retrieveAdministration: false,
        deleteAdministration: false
    });

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };


    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Administration', action: 'retrieve' | 'edit' | 'delete', record: AdministrationDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
        }));
    };

    const handleEditOpen = (type: 'Administration') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Administration') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };

    const roleOption = [
        { value: "Супер администратор", label: "Супер администратор" },
        { value: "Администратор", label: "Администратор" },
        { value: "Младший администратор", label: "Младший администратор" },
        { value: "Пользователь", label: "Пользователь" },
    ];

    const statusOption = [
        { value: "Активный", label: "Активный" },
        { value: "Не активный", label: "Не активный" },
    ];

    const onFinish = () => {
        console.log('hello finish');
    }

    return (
        <MainLayout>
            <MainHeading title="Администрирование" subtitle="Подзаголоок">
                <div className="main-heading-dropdown-single-btn"> 
                    <Button onClick={() => handleModal('addAdministration', true)}>Добавить администратора <IoMdAdd /></Button>
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<AdministrationDataType> onRowClick={(record) => handleRowClick('Administration', 'retrieve', record)} data={AdministrationTableData} columns={AdministrationTableColumns}/>
            </div>
            <ModalWindow title="Добавить администратора" openModal={modalState.addAdministration} closeModal={() => handleModal('addAdministration', false)}>
                <FormComponent  onFinish={onFinish}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder="Имя"/>
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" options={roleOption} placeholder="Роль" />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" options={statusOption} placeholder="Статус" />
                        </Form.Item>
                    </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть администратора" openModal={modalState.retrieveAdministration} closeModal={() => handleModal('retrieveAdministration', false)} handleEdit={() => handleEditOpen('Administration')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input disabled className="input" size='large' placeholder="Имя"/>
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select disabled className="input" size="large" options={roleOption} placeholder="Роль" />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select disabled className="input" size="large" options={statusOption} placeholder="Статус" />
                        </Form.Item>
                    </div>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Изменить администратора" openModal={modalState.editAdministration} closeModal={() => handleModal('editAdministration', false)} handleDelete={() => handleDeleteOpen('Administration')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder="Имя"/>
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" options={roleOption} placeholder="Роль" />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" options={statusOption} placeholder="Статус" />
                        </Form.Item>
                    </div>
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteAdministration} title="Вы точно хотите удалить администратора?" className="modal-tight" closeModal={() => handleModal('deleteAdministration', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteAdministration', false)} className="outline">Отменить</Button>
                        <Button className="danger">Удалить</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Administation;