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

    const handleRowClick = (type: 'expert', action: 'Retrieve' | 'Edit' | 'Delete', record: ExpertsTableDataTypes) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
    
        const modalKey = action === 'Retrieve' ? 'retrieveExpert' 
                        : action === 'Edit' ? 'editExpert' 
                        : 'deleteExpert';
    
        setModalState((prev) => ({
            ...prev,
            [modalKey]: true,
        }));
    };

    const handleEditOpen = (type: 'Expert') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Expert') => {
        setModalState((prev) => ({
            ...prev,
            [`delete${type}`]: false,
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

    return (
        <MainLayout>
            <MainHeading title="Эксперты" subtitle="Подзаголоок">
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
                    <Button onClick={() => handleModal('addExpert', true)}>Добавить эксперта <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<ExpertsTableDataTypes> onRowClick={(record) => handleRowClick('expert', 'Retrieve', record)} data={ExpertsData} columns={ExpertsColumns}/>
            </div>
            <ModalWindow title="Добавить эксперта" openModal={modalState.addExpert} closeModal={() => handleModal('addExpert', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="mainAreas" rules={[{required: true, message:"Введите основные сферы"}]}>
                                <Input className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                                <DatePicker size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" rules={[{required: true, message:"Введите мероприятие"}]}>
                                <Input className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                                <Select className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" rules={[{required: true, message:"Выберите файл"}]}>
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new" onClick={addFileField}>
                            <p className="form-btn-new-text">Добавить файл</p>
                        </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть эксперта" openModal={modalState.retrieveExpert} closeModal={() => handleModal('retrieveExpert', false)} handleEdit={() => handleEditOpen('Expert')}>
                <FormComponent>
                        <div className="form-inputs">
                            <Form.Item className="input" name="mainAreas" rules={[{required: true, message:"Введите основные сферы"}]}>
                                <Input disabled className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                                <DatePicker disabled size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" rules={[{required: true, message:"Введите мероприятие"}]}>
                                <Input disabled className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                                <Select disabled className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" rules={[{required: true, message:"Выберите файл"}]}>
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
                            <Form.Item className="input" name="mainAreas" rules={[{required: true, message:"Введите основные сферы"}]}>
                                <Input  className="input" size='large' placeholder="Основные сферы"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                                <DatePicker  size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="eventName" rules={[{required: true, message:"Введите мероприятие"}]}>
                                <Input  className="input" size='large' placeholder="Мероприятие"/>
                            </Form.Item>
                            <Form.Item className="input" name="organization" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                                <Select  className="input" size="large" options={organizationOption} placeholder="Привлекающая организация" />
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" rules={[{required: true, message:"Выберите файл"}]}>
                                    <Upload disabled>
                                        <Input  className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new" onClick={addFileField}>
                            <p className="form-btn-new-text">Добавить файл</p>
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