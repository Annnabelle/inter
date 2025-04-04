import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { InternationalTreatiesTableDataType } from "../../types";
import { InternationalTreatiesTableColumn, InternationalTreatiesTableData } from "../../tableData/internationalTreaties";
import { FileItem } from "../../types/countries";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ComponentTable from "../../components/table";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";


const InternationalTreaties: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
        const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        addTreaties: false,
        editTreaties: false,
        retrieveTreaties: false,
        deleteTreaties: false
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

    const handleRowClick = (type: 'treaties', action: 'Retrieve' | 'Edit' | 'Delete', record: InternationalTreatiesTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
    
        const modalKey = action === 'Retrieve' ? 'retrieveTreaties' 
                        : action === 'Edit' ? 'editTreaties' 
                        : 'deleteTreaties';
    
        setModalState((prev) => ({
            ...prev,
            [modalKey]: true,
        }));
    };

    const handleEditOpen = (type: 'Treaties') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Treaties') => {
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
            <MainHeading title="Международные договора" subtitle="Подзаголоок">
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
                <Button onClick={() => handleModal('addTreaties', true)}>Добавить договор <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<InternationalTreatiesTableDataType> onRowClick={(record) => handleRowClick('treaties', 'Retrieve', record)} columns={InternationalTreatiesTableColumn} data={InternationalTreatiesTableData}/>
            </div>
            <ModalWindow title="Добавить договор" openModal={modalState.addTreaties} closeModal={() => handleModal('addTreaties', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="nameOfTreaties" rules={[{required: true, message:"Введите основные сферы"}]}>
                                <Input className="input" size='large' placeholder="Название договора"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                                <DatePicker size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="place" rules={[{required: true, message:"Введите мероприятие"}]}>
                                <Input className="input" size='large' placeholder="Место"/>
                            </Form.Item>
                            <Form.Item className="input" name="level" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                                <Input className="input" size='large' placeholder="Уровень подписания"/>
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
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>Добавить файл</p>
                        </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть договор" openModal={modalState.retrieveTreaties} closeModal={() => handleModal('retrieveTreaties', false)} handleEdit={() => handleEditOpen('Treaties')}>
                <FormComponent>
                <div className="form-inputs">
                            <Form.Item className="input" name="nameOfTreaties" rules={[{required: true, message:"Введите основные сферы"}]}>
                                <Input disabled className="input" size='large' placeholder="Название договора"/>
                            </Form.Item>
                            <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                                <DatePicker disabled size="large" className="input"/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="place" rules={[{required: true, message:"Введите мероприятие"}]}>
                                <Input disabled className="input" size='large' placeholder="Место"/>
                            </Form.Item>
                            <Form.Item className="input" name="level" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                                <Input disabled className="input" size='large' placeholder="Уровень подписания"/>
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
            <ModalWindow title="Изменить договор" openModal={modalState.editTreaties} closeModal={() => handleModal('editTreaties', false)} handleDelete={() => handleDeleteOpen('Treaties')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfTreaties" rules={[{required: true, message:"Введите основные сферы"}]}>
                            <Input className="input" size='large' placeholder="Название договора"/>
                        </Form.Item>
                        <Form.Item className="input" name="date" rules={[{required: true, message:"Выберите дату"}]}>
                            <DatePicker size="large" className="input"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="place" rules={[{required: true, message:"Введите мероприятие"}]}>
                            <Input className="input" size='large' placeholder="Место"/>
                        </Form.Item>
                        <Form.Item className="input" name="level" rules={[{required: true, message:"Выберите привлекающую организацию"}]}>
                            <Input className="input" size='large' placeholder="Уровень подписания"/>
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
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>Добавить файл</p>
                    </div>
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteTreaties} title="Вы точно хотите удалить договор?" className="modal-tight" closeModal={() => handleModal('deleteTreaties', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteTreaties', false)} className="outline">Отменить</Button>
                    <Button className="danger">Удалить</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default InternationalTreaties;