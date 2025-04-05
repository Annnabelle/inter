import { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { InternationalDocumentsTableDataType } from "../../types";
import { FileItem } from "../../types/countries";
import { InternationalDocumentsTableColumn, InternationalDocumentsTableData } from "../../tableData/internationalDocuments";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ComponentTable from "../../components/table";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";


const InternationalDocuments: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [form] = Form.useForm();
        const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const [modalState, setModalState] = useState({
        addDocument: false,
        editDocument: false,
        retrieveDocument: false,
        deleteDocument: false
    });
    const [isAnotherCountry, setIsAnotherCountry] = useState<boolean>(false)
    const [isAnotherGovernment, setIsAnotherGovernment] = useState<boolean>(false)

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };

    const handleSortDropdown = () => {
        setOpenSortDropdown((prev) => (!prev))
    }

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Document', action: 'retrieve' | 'edit' | 'delete', record: InternationalDocumentsTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
        }));
    };

    const handleEditOpen = (type: 'Document') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Document') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };
    const countryOptions = [
        { value: "test1", label: "test1" },
        { value: "test2", label: "test2" },
        { value: "test3", label: "test3" },
        { value: "test4", label: "test4" },
        { value: "test5", label: "test5" },
      ];

    const onFinish = () => {
        console.log('hello finish');
    }

    const handleAnotherCountry = () => {
        setIsAnotherCountry((prev) => !prev)
    }

    const handleAnotherGovernment = () => {
        setIsAnotherGovernment((prev) => !prev)
    }

    return (
        <MainLayout>
            <MainHeading title="Международные документы" subtitle="Подзаголоок">
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
                                <p className="text">По умолчанию</p>
                            </div>
                            <div className="dropdown-sort-item">
                                <p className="text">По названию</p>
                            </div>
                            <div className="dropdown-sort-item">
                                <p className="text">По дате</p>
                            </div>
                            <div className="dropdown-sort-item">
                                <p className="text">По стране</p>
                            </div>
                        </div>
                    )}
                </div>
                <Button onClick={() => handleModal('addDocument', true)}>Добавить документ <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<InternationalDocumentsTableDataType> onRowClick={(record) => handleRowClick('Document', 'retrieve', record)} columns={InternationalDocumentsTableColumn} data={InternationalDocumentsTableData}/>
            </div>
            <ModalWindow title="Добавить документ" openModal={modalState.addDocument} closeModal={() => handleModal('addDocument', false)}>
                <FormComponent  onFinish={onFinish}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfDocument" >
                            <Input className="input" size='large' placeholder="Название документа"/>
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="country" >
                            <Select className="input" size="large" options={countryOptions} placeholder="Страна" />
                        </Form.Item>
                    </div>  
                    {isAnotherCountry && (
                        <div className="form-inputs">
                                <Form.Item className="input" name="anotherCountry" >
                                    <Input className="input" size='large' placeholder="Название страны"/>
                                </Form.Item>
                        </div>
                    )}
                    <div className="form-btn-new form-btn-another-input">
                        <p className="form-btn-new-text" onClick={handleAnotherCountry}>Другая страна</p>
                    </div>

                    <div className="form-inputs">
                        <Form.Item className="input" name="government" >
                            <Select className="input" size="large" options={countryOptions} placeholder="Гос.орган" />
                        </Form.Item>
                    </div>  
                    {isAnotherGovernment && (
                        <div className="form-inputs">
                                <Form.Item className="input" name="anotherGovernment" >
                                    <Input className="input" size='large' placeholder="Название Гос.органа"/>
                                </Form.Item>
                        </div>
                    )}
                    <div className="form-btn-new form-btn-another-input">
                        <p className="form-btn-new-text" onClick={handleAnotherGovernment}>Другаой Гос.орган</p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="administrationPermission" >
                            <Input className="input" size='large' placeholder="Разрешение администрации"/>
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
            <ModalWindow title="Просмотреть документ" openModal={modalState.retrieveDocument} closeModal={() => handleModal('retrieveDocument', false)} handleEdit={() => handleEditOpen('Document')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfDocument" >
                            <Input disabled className="input" size='large' placeholder="Название документа"/>
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker disabled size="large" className="input"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="country">
                            <Select disabled className="input" size="large" options={countryOptions} placeholder="Страна" />
                        </Form.Item>
                    </div>  
                    {isAnotherCountry && (
                        <div className="form-inputs">
                            <Form.Item className="input" name="anotherCountry" >
                                <Input disabled className="input" size='large' placeholder="Название страны"/>
                            </Form.Item>
                        </div>
                    )}
                    <div className="form-inputs">
                        <Form.Item className="input" name="government" >
                            <Select disabled className="input" size="large" options={countryOptions} placeholder="Гос.орган" />
                        </Form.Item>
                    </div>  
                    {isAnotherGovernment && (
                        <div className="form-inputs">
                            <Form.Item className="input" name="anotherGovernment" >
                                <Input disabled className="input" size='large' placeholder="Название Гос.органа"/>
                            </Form.Item>
                        </div>
                    )}
                    <div className="form-inputs">
                        <Form.Item className="input" name="administrationPermission" >
                            <Input disabled className="input" size='large' placeholder="Разрешение администрации"/>
                        </Form.Item>
                    </div>  
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="file" >
                                <Upload>
                                    <Input disabled className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Изменить документ" openModal={modalState.editDocument} closeModal={() => handleModal('editDocument', false)} handleDelete={() => handleDeleteOpen('Document')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfDocument" >
                            <Input className="input" size='large' placeholder="Название документа"/>
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="country" >
                            <Select className="input" size="large" options={countryOptions} placeholder="Страна" />
                        </Form.Item>
                    </div>  
                    {isAnotherCountry && (
                        <div className="form-inputs">
                                <Form.Item className="input" name="anotherCountry" >
                                    <Input className="input" size='large' placeholder="Название страны"/>
                                </Form.Item>
                        </div>
                    )}
                    <div className="form-btn-new form-btn-another-input">
                        <p className="form-btn-new-text" onClick={handleAnotherCountry}>Другая страна</p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="government" >
                            <Select className="input" size="large" options={countryOptions} placeholder="Гос.орган" />
                        </Form.Item>
                    </div>  
                    {isAnotherGovernment && (
                        <div className="form-inputs">
                                <Form.Item className="input" name="anotherGovernment" >
                                    <Input className="input" size='large' placeholder="Название Гос.органа"/>
                                </Form.Item>
                        </div>
                    )}
                    <div className="form-btn-new form-btn-another-input">
                        <p className="form-btn-new-text" onClick={handleAnotherGovernment}>Другаой Гос.орган</p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="administrationPermission" >
                            <Input className="input" size='large' placeholder="Разрешение администрации"/>
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
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteDocument} title="Вы точно хотите удалить документ?" className="modal-tight" closeModal={() => handleModal('deleteDocument', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteDocument', false)} className="outline">Отменить</Button>
                    <Button className="danger">Удалить</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default InternationalDocuments;