import { useState } from "react";
import {  IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select } from "antd";
import { AdministrationDataType } from "../../types";
import { AdministrationTableColumns, AdministrationTableData } from "../../tableData/administartion";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { useTranslation } from "react-i18next";


const Administation: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
        // const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [modalState, setModalState] = useState({
        addAdministration: false,
        editAdministration: false,
        retrieveAdministration: false,
        deleteAdministration: false
    });

    // const addFileField = () => {
    //     setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    // };


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
        { value: "Супер администратор", label: t('roles.superAdministrator') },
        { value: "Администратор", label: t('roles.administrator')},
        { value: "Младший администратор", label: t('roles.juniorAdministrator') },
        { value: "Пользователь", label: t('roles.user')},
    ];

    const statusOption = [
        { value: "Активный", label: t('buttons.active') },
        { value: "Не активный", label: t('buttons.inactive') },
    ];

    const onFinish = () => {
        console.log('hello finish');
    }

    return (
        <MainLayout>
            <MainHeading title={`${t('titles.administration')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown-single-btn"> 
                    <Button onClick={() => handleModal('addAdministration', true)}>{`${t('buttons.add')}`} {`${t('crudNames.administrator')}`} <IoMdAdd /></Button>
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<AdministrationDataType> onRowClick={(record) => handleRowClick('Administration', 'retrieve', record)} data={AdministrationTableData(t)} columns={AdministrationTableColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.administrator')} openModal={modalState.addAdministration} closeModal={() => handleModal('addAdministration', false)}>
                <FormComponent  onFinish={onFinish}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder={`${t('inputs.name')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" options={roleOption} placeholder={`${t('inputs.role')}`}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" options={statusOption} placeholder={`${t('inputs.status')}`} />
                        </Form.Item>
                    </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.administrator')} openModal={modalState.retrieveAdministration} closeModal={() => handleModal('retrieveAdministration', false)} handleEdit={() => handleEditOpen('Administration')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input disabled className="input" size='large'/>
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select disabled className="input" size="large" options={roleOption}  />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select disabled className="input" size="large" options={statusOption}  />
                        </Form.Item>
                    </div>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.administrator')} openModal={modalState.editAdministration} closeModal={() => handleModal('editAdministration', false)} handleDelete={() => handleDeleteOpen('Administration')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder={`${t('inputs.name')}`}/>
                        </Form.Item>
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" options={roleOption} placeholder={`${t('inputs.role')}`} />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" options={statusOption} placeholder={`${t('inputs.status')}`} />
                        </Form.Item>
                    </div>
                    <Button>{t('buttons.edit')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteAdministration} title={`${t('titles.areYouSure')} ${t('crudNames.administrator')} ?`}  className="modal-tight" closeModal={() => handleModal('deleteAdministration', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteAdministration', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Administation;