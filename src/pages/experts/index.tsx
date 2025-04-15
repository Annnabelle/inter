import { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { ExpertsColumns, ExpertsData } from "../../tableData/experts";
import { useNavigate } from "react-router-dom";
import { ExpertsTableDataTypes } from "../../types";
import { FileItem } from "../../types/countries";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";


const Experts: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
        const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        addExpert: false,
        editExpert: false,
        retrieveExpert: false,
        deleteExpert: false
    });

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };

    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Expert', action: 'retrieve' | 'edit' | 'delete', record: ExpertsTableDataTypes) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
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

    const organizationOption = [
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
        {value: 'byName',label:'По названию'},
        {value: 'byVisit',label:'По визиту'},
        {value: 'byMeeting',label:'По встрече'},
        {value: 'all', label: 'Все'}
    ]

    return (
        <MainLayout>
            <MainHeading title="Эксперты" subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder="Сортировать по"/>
                </div>
                    <Button onClick={() => handleModal('addExpert', true)}>Добавить эксперта <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<ExpertsTableDataTypes> onRowClick={(record) => handleRowClick('Expert', 'retrieve', record)} data={ExpertsData} columns={ExpertsColumns}/>
            </div>
            <ModalWindow title="Добавить эксперта" openModal={modalState.addExpert} closeModal={() => handleModal('addExpert', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="mainAreas" >
                                <Input className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" >
                                <DatePicker size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" >
                                <Input className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" >
                                <Select className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" >
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>Добавить файл</p>
                        </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть эксперта" openModal={modalState.retrieveExpert} closeModal={() => handleModal('retrieveExpert', false)} handleEdit={() => handleEditOpen('Expert')}>
                <FormComponent>
                        <div className="form-inputs">
                            <Form.Item className="input" name="mainAreas" >
                                <Input disabled className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" >
                                <DatePicker disabled size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" >
                                <Input disabled className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" >
                                <Select disabled className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" >
                                    <Upload disabled>
                                        <Input disabled className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Изменить эксперта" openModal={modalState.editExpert} closeModal={() => handleModal('editExpert', false)} handleDelete={() => handleDeleteOpen('Expert')}>
                <FormComponent>
                        <div className="form-inputs">
                            <Form.Item className="input" name="mainAreas" >
                                <Input  className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" >
                                <DatePicker  size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" >
                                <Input  className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" >
                                <Select  className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" >
                                    <Upload disabled>
                                        <Input  className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>Добавить файл</p>
                        </div>
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteExpert} title="Вы точно хотите удалить эксперта?" className="modal-tight" closeModal={() => handleModal('deleteExpert', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteExpert', false)} className="outline">Отменить</Button>
                        <Button className="danger">Удалить</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Experts;