import { FaPlus } from "react-icons/fa";
import { theme, Form, Input, Upload, DatePicker } from "antd";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import CountriesTable from "../../components/countriesTable";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalWindow from "../../components/modalWindow";
import { DateItem, FileItem } from "../../types/countries";

const CountriesInner: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    const [addDocumentsModalOpen, setAddDocumentsModalOpen] = useState<boolean>(false); 
    const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    const [dates, setDates] = useState<DateItem[]>([{ id: 1, place: "", date: null }]);

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };

    const addDateField = () => {
        setDates([...dates, { id: dates.length + 1, place: "", date: null }]);
    };
    const handleSortDropdown = () => { setOpenSortDropdown((prev) => (!prev))}
    const handleRowEventClick = (record: { key: string }) => {
        navigate(`/cooperation/countries/${id}/events/${record.key}`);
    };
    const handleRowVisitsClick = (record: { key: string }) => {
        navigate(`/cooperation/countries/${id}/visits/${record.key}`);
    };
    const handleRowDocumentsClick = (record: { key: string }) => {
        navigate(`/cooperation/countries/${id}/documents/${record.key}`);
    };
    const handleAddDocumentOpen = () => {
        setAddDocumentsModalOpen(true);
    };
    const handleAddDocumentCancel = () => {
        setAddDocumentsModalOpen(false);
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
                <div className="countries-inner">
                    <div className="countries-inner-title">
                        <h1 className="title">Страна: Российская Федерация </h1>
                    </div>
                    <div className="countries-inner-content">
                        <div className="countries-inner-content-title">
                            <h2 className="title">Test Name</h2>
                        </div>
                        <div className="countries-inner-content-subtitle">
                            <p className="subtitle">Тестовый текст который будет написан в таком формате</p>
                        </div>
                    </div>
                </div>
                <div className="countries-inner-table-container">
                    <div className="countries-inner-table-container-heading">
                        <h3 className="title">
                            Мероприятия
                        </h3>
                    </div>
                    <CountriesTable onRowClick={handleRowEventClick} />
                </div>
                <div className="countries-inner-table-container">
                    <div className="countries-inner-table-container-heading">
                        <h3 className="title">
                            Визиты
                        </h3>
                    </div>
                    <CountriesTable onRowClick={handleRowVisitsClick}/>
                </div>
                <div className="countries-inner-table-container">
                    <div className="countries-inner-table-container-heading">
                        <div className="heading-title">
                            <h3 className="title">
                                Международные документы
                            </h3>
                        </div>
                        <div className="heading-btn">
                            <Button className="outline" onClick={handleAddDocumentOpen}>Добавить документ <IoMdAdd/></Button>
                        </div>
                    </div>
                    <CountriesTable onRowClick={handleRowDocumentsClick}/>
                </div>
                <ModalWindow title="Добавить документ" openEventModal={addDocumentsModalOpen} closeEventModal={handleAddDocumentCancel}>
                    <Form form={form} layout="vertical" onFinish={onFinish} className="form">
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="name" rules={[{required: true, message:"Выберите название"}]}>
                                    <Input className="input" size='large' placeholder="Введите название"/>
                                </Form.Item>
                                <Form.Item className="input" name="name" rules={[{required: true, message:"Выберите название"}]}>
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-inputs-new" onClick={addFileField}>
                            <p className="form-inputs-new-text">Добавить еще файл</p>
                        </div>
                        {dates.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="place" rules={[{required: true, message: "Введите место проведения"}]}>
                                    <Input size='large' className="input" placeholder="Место подписания"/>
                                </Form.Item>
                                <Form.Item className="input" name="date" rules={[{required: true, message: "Введите дату подписания"}]}>
                                    <DatePicker size="large" className="input"/>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-inputs-new" onClick={addDateField}>
                            <p className="form-inputs-new-text">Добавить еще дату</p>
                        </div>
                        <Button>Создать</Button>
                    </Form>
                </ModalWindow>
            </div>
        </MainLayout>
    );
}

export default CountriesInner