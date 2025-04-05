import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { ReportsTableDataType } from "../../types";
import { ReportsColumns, ReportsData } from "../../tableData/reports";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";


const Reports: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [isActionOpen, setActionOpen] = useState<boolean>(false);
    const [modalState, setModalState] = useState({
        addReport: false,
        editReport: false,
        retrieveReport: false,
        deleteReport: false
    });

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Report', action: 'retrieve' | 'edit' | 'delete', record: ReportsTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
        }));
    };

    const handleEditOpen = (type: 'Report') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Report') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };

    const typeOfReportOption = [
        { value: "Недельный", label: "Недельный" },
        { value: "Месячный", label: "Месячный" },
        { value: "Квартальный", label: "Квартальный" },
        { value: "Полу-годовой", label: "Полу-годовой" },
        { value: "Годовой", label: "Годовой" },
    ];

    const eventsDropdownRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (isActionOpen && eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
            setActionOpen(false);
        }
    }, [isActionOpen]);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    const onFinish = () => {
        console.log('hello finish');
    }

    return (
        <MainLayout>
            <MainHeading title="Отчеты" subtitle="Подзаголоок">
            <Button onClick={() => handleModal('addReport', true)}>Добавить отчет <IoMdAdd /></Button>
                <div className="main-heading-dropdown">
                    <div className="layout-events-heading-dropdown" ref={eventsDropdownRef}>
                        <Button  onClick={(e) => {e.stopPropagation(); setActionOpen((prev) => !prev);}}>Действия</Button>
                        {isActionOpen && (
                            <div className="event-dropdown">
                                <div className="event-dropdown-action">
                                    <Button className="outline-black">Скачать Excel </Button>
                                    <Button className="outline-black">Скачать World</Button>
                                    <Button className="outline-black">Печать</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<ReportsTableDataType> onRowClick={(record) => handleRowClick('Report', 'retrieve', record)} data={ReportsData} columns={ReportsColumns}/>
            </div>
            <ModalWindow title="Добавить отчет" openModal={modalState.addReport} closeModal={() => handleModal('addReport', false)}>
                <FormComponent  onFinish={onFinish}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input className="input" size='large' placeholder="Название"/>
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input className="input" size='large' placeholder="Ответственный"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select className="input" size="large" options={typeOfReportOption} placeholder="Тип" />
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                                </Upload>
                            </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input"/>
                        </Form.Item>
                    </div> 
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Просмотреть отчет" openModal={modalState.retrieveReport} closeModal={() => handleModal('retrieveReport', false)} handleEdit={() => handleEditOpen('Report')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input disabled className="input" size='large' placeholder="Название"/>
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input disabled className="input" size='large' placeholder="Ответственный"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select disabled className="input" size="large" options={typeOfReportOption} placeholder="Тип" />
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                            <Upload disabled>
                                <Input disabled className="input input-upload" size='large' placeholder="Загрузить файл"/>
                            </Upload>
                        </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker disabled size="large" className="input"/>
                        </Form.Item>
                    </div> 
                </FormComponent>
            </ModalWindow>
            <ModalWindow title="Изменить отчет" openModal={modalState.editReport} closeModal={() => handleModal('editReport', false)} handleDelete={() => handleDeleteOpen('Report')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input className="input" size='large' placeholder="Название"/>
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input className="input" size='large' placeholder="Ответственный"/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select className="input" size="large" options={typeOfReportOption} placeholder="Тип" />
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder="Загрузить файл"/>
                            </Upload>
                        </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input"/>
                        </Form.Item>
                    </div> 
                    <Button>Применить изменения</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteReport} title="Вы точно хотите удалить отчет?" className="modal-tight" closeModal={() => handleModal('deleteReport', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteReport', false)} className="outline">Отменить</Button>
                        <Button className="danger">Удалить</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Reports;