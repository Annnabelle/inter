import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Upload, DatePicker, Select } from "antd";
import { ReportsTableDataType } from "../../types";
import { ReportsColumns } from "../../tableData/reports";
import { useTranslation } from "react-i18next";
import { Report } from "../../types/reports";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { CreateReport, deleteReport, RetrieveReportById, RetrieveReports, UpdateReport } from "../../store/reports";
import { CreateDocument } from "../../store/uploads";
import { toast } from "react-toastify";
import { Document } from "../../types/uploads";
import { normalizeUrl } from "../../utils/baseUrl";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import dayjs from "dayjs";


const Reports: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [isActionOpen, setActionOpen] = useState<boolean>(false);
    const [files, setFiles] = useState([{ id: Date.now() }]);
    const [modalState, setModalState] = useState<{
        addReport: boolean,
        editReport: boolean,
        retrieveReport: boolean,
        deleteReport: boolean,
        reportData: Report | null,
    }>({
        addReport: false,
        editReport: false,
        retrieveReport: false,
        deleteReport: false,
        reportData: null,
    });
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state: RootState) => state.reports.reports)
    const limit = useAppSelector((state) => state.reports.limit)
    const page = useAppSelector((state) => state.reports.page)
    const total = useAppSelector((state) => state.reports.total)
    const [currentPage, setCurrentPage] = useState(page);
    const [editForm] = Form.useForm();
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
    const reportById = useAppSelector((state) => state.reports.reportById)
    useEffect(() => {
        if(reports.length === 0){
            dispatch(RetrieveReports({limit: 1, page: currentPage}))
        }
    }, [dispatch, reports.length, currentPage, limit])

    useEffect(() => {
        if (modalState.reportData) {
            editForm.resetFields(); 
            editForm.setFieldsValue({
                name: modalState.reportData.name,
                type: modalState.reportData.type,
                startDate: dayjs(modalState.reportData.startDate),
                endDate: dayjs(modalState.reportData.endDate),
                responsible: modalState.reportData.responsible,
                comment: modalState.reportData.comment
          });
        }
    }, [modalState.reportData, editForm]);

    const reportsData = useMemo(() => {
          return reports.map((report) => ({
            key: report.id,
            name: report.name,
            type: report.type,
            startDate: dayjs(report.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(report.endDate).format('YYYY-MM-DD'),
            responsible: report.responsible,
            comment: report.comment
          }))
    }, [reports, t])
    

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Report', action: 'retrieve' | 'edit' | 'delete', record: ReportsTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        if (type === 'Report'){
            const reportData = reports.find((report) => report.id === record.key) ?? null
            setSelectedReportId(record.key);

            setModalState((prev) => ({
                ...prev,
                [`${action}${type}`]: true,
                reportData: reportData
            }));
        }
    };

    useEffect(() => {
        if (selectedReportId){
            dispatch(RetrieveReportById({id: selectedReportId}))
        }
    }, [dispatch, selectedReportId])

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
        { value: "weekly", label: t("typeOfReport.weekly") },
        { value: "monthly", label: t("typeOfReport.monthly") },
        { value: "quarterly", label: t("typeOfReport.quarterly") },
        { value: "semi_annual", label: t("typeOfReport.semiAnnual") },
        { value: "annual", label: t("typeOfReport.annual") },
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

    const handleCreateReport = async(values: Report) => {
        try {
            const data = {...values, documents: uploadedFileIds};
            const resultAction = await dispatch(CreateReport(data));
            if(CreateReport.fulfilled.match(resultAction)){
                toast.success('Отчет добавлен успешно')
                setTimeout(() => {
                    handleModal('addReport', false);
                    window.location.reload()
                }, 1000)
                } else {
                toast.error("Ошибка при создании отчета")
            }
        }catch (err) {
            toast.error((err as string) || 'Ошибка сервера')
        }
    }

    const handleUpdateReport = async (values: any) => {
        try {
            const updatedData = {
                ...values,
                id: modalState?.reportData?.id,
            }

            const resultAction = await dispatch(UpdateReport(updatedData));
             if (UpdateReport.fulfilled.match(resultAction)) {
                toast.success('Отчет успешно обновлен');
                setTimeout(() => {
                    handleModal('projectEdit', false);
                    dispatch(RetrieveReports(updatedData.id));
                    window.location.reload(); 
                }, 1000); 
            } else {
                
                toast.error('Ошибка при обновлении отчета');
            }
        }catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
        }
    }

    const handleFileUpload = async (file: File, onSuccess: Function, onError: Function) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await dispatch(CreateDocument(formData));
            const fileId = response?.payload?.upload?.id;
            console.log("fileId", fileId);
            
            if (fileId) {
              setUploadedFileIds(prev => [...prev, fileId]); 
              onSuccess();
            } else {
              throw new Error('File ID not found in response');
            }
          } catch (error) {
            console.error('Upload error:', error);
            onError(error);
          }
      };

    const handleDeleteOrganizationProject = async () => {
        try {
            const reportId = modalState.reportData?.id
            const resultAction = await dispatch(deleteReport(reportId));
    
            if (deleteReport.fulfilled.match(resultAction)) {
            toast.success('Отчет успешно удален');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error('Ошибка при удалении отчета');
            }
        } catch (error) {
            toast.error('Ошибка при удалении отчета');
        }
    };

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
               <ComponentTable<ReportsTableDataType> 
                pagination={{
                    current: currentPage,
                    pageSize: limit,
                    total: total,
                    onChange: (page) => {
                        setCurrentPage(page);
                        dispatch(RetrieveReports({ page, limit: limit }));
                    },
                }}
               onRowClick={(record) => handleRowClick('Report', 'retrieve', record)} data={reportsData} columns={ReportsColumns(t)}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.report')}  openModal={modalState.addReport} closeModal={() => handleModal('addReport', false)}>
                <FormComponent  onFinish={handleCreateReport}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder={`${t('inputs.title')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="responsible" >
                            <Input className="input" size='large' placeholder={`${t('inputs.responsible')}`}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="type" >
                            <Select className="input" size="large" options={typeOfReportOption} placeholder={`${t('tableTitles.type')}`} />
                        </Form.Item>
                    </div> 
                     {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                        <Form.Item className="input">
                            <Upload
                            customRequest={({ file, onSuccess, onError }) => 
                                handleFileUpload(file as File, onSuccess!, onError!)
                            }
                            >
                            <Input
                                className="input input-upload"
                                size='large'
                                placeholder={t('inputs.uploadFile')}
                            />
                            </Upload>
                        </Form.Item>
                        </div>
                    ))}
                    <div className="form-inputs">
                        <Form.Item className="input" name="startDate" >
                            <DatePicker size="large" className="input" placeholder={`${t('inputs.selectDate')}`}/>
                        </Form.Item>
                        <Form.Item className="input" name="endDate" >
                            <DatePicker size="large" className="input" placeholder={`${t('inputs.selectDate')}`}/>
                        </Form.Item>
                    </div> 
                    <Button type="submit">{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            {reportById && selectedReportId && (
                <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.report')} openModal={modalState.retrieveReport} closeModal={() => handleModal('retrieveReport', false)} handleEdit={() => handleEditOpen('Report')}>
                    <FormComponent>
                        <div className="form-inputs">
                            <Form.Item className="input" name="nameOfReport" >
                                <Input disabled className="input" size='large' placeholder={reportById.name}/>
                            </Form.Item>
                            <Form.Item className="input" name="responsible" >
                                <Input disabled className="input" size='large' placeholder={reportById.responsible} />
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="typeOfReport" >
                                <Select disabled className="input" size="large" placeholder={reportById.type}/>
                            </Form.Item>
                        </div> 
                        <div className="form-inputs">
                            <Form.Item className="input" name="startDate" >
                                <DatePicker disabled size="large" className="input" placeholder={dayjs(reportById.startDate).format('YYYY-MM-DD')}/>
                            </Form.Item>
                            <Form.Item className="input" name="endDate" >
                                <DatePicker disabled size="large" className="input"   placeholder={dayjs(reportById.endDate).format('YYYY-MM-DD')}/>
                            </Form.Item>
                        </div> 
                        {reportById?.documents?.map((item: Document) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="document">
                                    <div className="input input-upload">
                                    <a
                                        href={normalizeUrl(item?.url)}
                                        download={item?.originalName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📄 {item?.originalName}
                                    </a>
                                    </div>
                                </Form.Item>
                            </div>
                        ))}
                    </FormComponent>
                </ModalWindow>
            )}
            {modalState.reportData && (
                <ModalWindow title={t('buttons.edit') + " " + t('crudNames.report')} openModal={modalState.editReport} closeModal={() => handleModal('editReport', false)} handleDelete={() => handleDeleteOpen('Report')}>
                    <FormComponent formProps={editForm} onFinish={handleUpdateReport}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="name" >
                                <Input className="input" size='large' placeholder={`${t('inputs.title')}`}/>
                            </Form.Item>
                            <Form.Item className="input" name="responsible" >
                                <Input className="input" size='large' placeholder={`${t('inputs.responsible')}`}/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="type" >
                                <Select className="input" size="large" options={typeOfReportOption} placeholder={`${t('tableTitles.type')}`} />
                            </Form.Item>
                            {/* <Form.Item className="input" name="file" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={`${t('inputs.uploadFile')}`}/>
                                </Upload>
                            </Form.Item> */}
                        </div> 
                        <div className="form-inputs">
                            <Form.Item className="input" name="startDate">
                                <DatePicker
                                    size="large"
                                    className="input"
                                />
                            </Form.Item>
                            <Form.Item className="input" name="endDate">
                                <DatePicker
                                    size="large"
                                    className="input"
                                />
                            </Form.Item>
                        </div>
                        <Button type="submit">{t('buttons.edit')}</Button>
                    </FormComponent>
                </ModalWindow>
            )}
            <ModalWindow openModal={modalState.deleteReport} title={`${t('titles.areYouSure')} ${t('crudNames.report')} ?`}  className="modal-tight" closeModal={() => handleModal('deleteReport', false)}>
                    <div className="modal-tight-container">
                        <Button onClick={() => handleModal('deleteReport', false)} className="outline">{t('buttons.cancel')}</Button>
                        <Button onClick={() => handleDeleteOrganizationProject()} className="danger">{t('buttons.delete')}</Button>
                    </div>
                </ModalWindow>
        </MainLayout>
    );
};

export default Reports;