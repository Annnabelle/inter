import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker } from "antd";
import { DateItem, FileItem } from "../../types/countries";
import { CountriesEventTableColumns, CountriesEventTableData } from "../../tableData/countriesInnerEvent";
import { CountriesInnerInternationalDocumentsColumns, CountriesInnerInternationalDocumentsData } from "../../tableData/countriesInnerInternationalDocuments";
import { CountriesInnerVisitsColumns, CountriesInnerVisitsData } from "../../tableData/countriesInnerVisitTable";
import { CountriesInnerEventDataType, CountriesInnerInternationalDocumentsDataType, CountriesInnerVisitsDataType } from "../../types";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";

const CountriesInner: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [dates, setDates] = useState<DateItem[]>([{ id: 1, place: "", date: null }]);
    const [modalState, setModalState] = useState({
        addDocument: false,
        retrieveDocument: false,
        editDocument: false,
        deleteDocument: false,
    })

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'document', action: 'Retrieve' | 'Edit' | 'Delete', record: CountriesInnerInternationalDocumentsDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
    
        const modalKey = action === 'Retrieve' ? 'retrieveDocument' 
                      : action === 'Edit' ? 'editDocument' 
                      : 'deleteDocument';
    
        setModalState((prev) => ({
            ...prev,
            [modalKey]: true,
        }));
    };
    
      
    const handleEditOpen = () => {
        setModalState((prev) => ({
            ...prev,
            retrieveDocument: false, 
        }));
    
        setTimeout(() => {
            setModalState((prev) => ({
                ...prev,
                editDocument: true,
            }));
        }, 0); 
    };
    

    const handleDeleteOpen = (type: 'Document') => {
        setModalState((prev) => ({
          ...prev,
          [`delete${type}`]: false,
        }));
        setTimeout(() => {
          setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
      };

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };
    const addDateField = () => {
        setDates([...dates, { id: dates.length + 1, place: "", date: null }]);
    };
    const onFinish = () => {
        console.log('hello finish');
    }
    
    return (
        <MainLayout>
            <MainHeading title="Страны" subtitle="Подзаголоок">
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="page-inner">
                    <div className="page-inner-title">
                        <h1 className="title">Страна: Российская Федерация </h1>
                    </div>
                    <div className="page-inner-content">
                        <div className="page-inner-content-title">
                            <h2 className="title">Test Name</h2>
                        </div>
                        <div className="page-inner-content-subtitle">
                            <p className="subtitle">Тестовый текст который будет написан в таком формате</p>
                        </div>
                    </div>
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            Мероприятия
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerEventDataType> columns={CountriesEventTableColumns} data={CountriesEventTableData} />
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <h3 className="title">
                            Визиты
                        </h3>
                    </div>
                    <ComponentTable<CountriesInnerVisitsDataType> data={CountriesInnerVisitsData} columns={CountriesInnerVisitsColumns}/>
                </div>
                <div className="page-inner-table-container">
                    <div className="page-inner-table-container-heading">
                        <div className="heading-title">
                            <h3 className="title">
                                Международные документы
                            </h3>
                        </div>
                        <div className="heading-btn">
                            <Button className="outline" onClick={() => handleModal('addDocument', true)}>Добавить документ <IoMdAdd/></Button>
                        </div>
                    </div>
                    <ComponentTable<CountriesInnerInternationalDocumentsDataType> onRowClick={(record) => handleRowClick('document', 'Retrieve', record)} data={CountriesInnerInternationalDocumentsData} columns={CountriesInnerInternationalDocumentsColumns} />
                </div>
                <ModalWindow openModal={modalState.retrieveDocument} title="Посмотреть документ" closeModal={() => handleModal('retrieveDocument', false)} handleEdit={() => handleEditOpen()}>
                    <FormComponent>
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="documentName" >
                                    <Input className="input" size='large' placeholder="название" disabled/>
                                </Form.Item>
                                <Form.Item className="input" name="documentFile" >
                                    <Upload disabled>
                                        <Input className="input input-upload" size='large' placeholder="файл" disabled/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        {dates.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="place" >
                                    <Input size='large' className="input" placeholder="Место подписания" disabled/>
                                </Form.Item>
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input" disabled/>
                                </Form.Item>
                            </div>
                        ))}
                    </FormComponent>
                </ModalWindow>
                <ModalWindow openModal={modalState.editDocument} title="Изменить документ" closeModal={() => handleModal('editDocument', false)} handleDelete={() => handleDeleteOpen('Document')}>
                        <FormComponent onFinish={onFinish}>
                            {files.map((item) => (
                                <div className="form-inputs" key={item?.id}>
                                    <Form.Item className="input" name="documentName" >
                                        <Input className="input" size='large' placeholder="Введите название"/>
                                    </Form.Item>
                                    <Form.Item className="input" name="documentFile" >
                                        <Upload>
                                            <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                        </Upload>
                                    </Form.Item>
                                </div>
                            ))}
                            <div className="form-btn-new">
                                <p className="form-btn-new-text" onClick={addFileField}>Добавить еще файл</p>
                            </div>
                            {dates.map((item) => (
                                <div className="form-inputs" key={item?.id}>
                                    <Form.Item className="input" name="place" >
                                        <Input size='large' className="input" placeholder="Место подписания"/>
                                    </Form.Item>
                                    <Form.Item className="input" name="date" >
                                        <DatePicker size="large" className="input"/>
                                    </Form.Item>
                                </div>
                            ))}
                            <div className="form-btn-new">
                                <p className="form-btn-new-text" onClick={addDateField}>Добавить еще дату</p>
                            </div>
                            <Button>Применить</Button>
                        </FormComponent>
                    </ModalWindow>
                <ModalWindow title="Добавить документ" openModal={modalState.addDocument} closeModal={() => handleModal('addDocument', false)}>
                    <FormComponent  onFinish={onFinish}>
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="documentName" >
                                    <Input className="input" size='large' placeholder="Введите название"/>
                                </Form.Item>
                                <Form.Item className="input" name="documentFile" >
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>Добавить еще файл</p>
                        </div>
                        {dates.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="place" >
                                    <Input size='large' className="input" placeholder="Место подписания"/>
                                </Form.Item>
                                <Form.Item className="input" name="date" >
                                    <DatePicker size="large" className="input"/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addDateField}>Добавить еще дату</p>
                        </div>
                        <Button>Создать</Button>
                    </FormComponent>
                </ModalWindow>
                <ModalWindow openModal={modalState.deleteDocument} title="Вы точно хотите удалить документ?" className="modal-tight" closeModal={() => handleModal('deleteDocument', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteDocument', false)} className="outline">Отменить</Button>
                        <Button className="danger">Удалить</Button>
                    </div>
                </ModalWindow>
            </div>
        </MainLayout>
    );
}

export default CountriesInner