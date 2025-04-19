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
import { useTranslation } from "react-i18next";


const Reports: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
        { value: "Недельный", label: t("typeOfReport.weekly") },
        { value: "Месячный", label: t("typeOfReport.monthly") },
        { value: "Квартальный", label: t("typeOfReport.quarterly") },
        { value: "Полу-годовой", label: t("typeOfReport.semiAnnual") },
        { value: "Годовой", label: t("typeOfReport.annual") },
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
            <MainHeading title={`${t('titles.reports')}`} subtitle="Подзаголоок">
            <Button onClick={() => handleModal('addReport', true)}>{`${t('buttons.addReport')}`}<IoMdAdd /></Button>
                <div className="main-heading-dropdown">
                    <div className="layout-events-heading-dropdown" ref={eventsDropdownRef}>
                        <Button className="outline"  onClick={(e) => {e.stopPropagation(); setActionOpen((prev) => !prev);}}>{`${t('buttons.actions')}`}</Button>
                        {isActionOpen && (
                            <div className="event-dropdown">
                                <div className="event-dropdown-action">
                                    <Button className="outline-black">{`${t('buttons.excelDownload')}`} </Button>
                                    <Button className="outline-black">{`${t('buttons.worldDownload')}`}</Button>
                                    <Button className="outline-black">{`${t('buttons.print')}`}</Button>
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
               <ComponentTable<ReportsTableDataType> onRowClick={(record) => handleRowClick('Report', 'retrieve', record)} data={ReportsData(t)} columns={ReportsColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.report')}  openModal={modalState.addReport} closeModal={() => handleModal('addReport', false)}>
                <FormComponent  onFinish={onFinish}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input className="input" size='large' placeholder={`${t('inputs.title')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input className="input" size='large' placeholder={`${t('inputs.responsible')}`}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select className="input" size="large" options={typeOfReportOption} placeholder={`${t('tableTitles.type')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={`${t('inputs.uploadFile')}`} />
                                </Upload>
                            </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input" placeholder={`${t('inputs.selectDate')}`}/>
                        </Form.Item>
                    </div> 
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.report')} openModal={modalState.retrieveReport} closeModal={() => handleModal('retrieveReport', false)} handleEdit={() => handleEditOpen('Report')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input disabled className="input" size='large' />
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input disabled className="input" size='large' />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select disabled className="input" size="large" options={typeOfReportOption}/>
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                            <Upload disabled>
                                <Input disabled className="input input-upload" size='large' />
                            </Upload>
                        </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker disabled size="large" className="input" placeholder=" "/>
                        </Form.Item>
                    </div> 
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.report')} openModal={modalState.editReport} closeModal={() => handleModal('editReport', false)} handleDelete={() => handleDeleteOpen('Report')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfReport" >
                            <Input className="input" size='large' placeholder={`${t('inputs.title')}`}/>
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input className="input" size='large' placeholder={`${t('inputs.responsible')}`}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="typeOfReport" >
                            <Select className="input" size="large" options={typeOfReportOption} placeholder={`${t('tableTitles.type')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="file" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder={`${t('inputs.uploadFile')}`}/>
                            </Upload>
                        </Form.Item>
                    </div> 
                    <div className="form-inputs">
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input" placeholder={`${t('inputs.selectDate')}`}/>
                        </Form.Item>
                    </div> 
                    <Button>{t('buttons.edit')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteReport} title={`${t('titles.areYouSure')} ${t('crudNames.report')} ?`}  className="modal-tight" closeModal={() => handleModal('deleteReport', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteReport', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Reports;