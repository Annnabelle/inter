
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
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
import { useTranslation } from "react-i18next";


const InternationalTreaties: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    // const [form] = Form.useForm();
    const [files, setFiles] = useState<FileItem[]>([{ id: 1, name: "", file: null }]);
    // const [openSortDropdown, setOpenSortDropdown] = useState<boolean>(false);
    // const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        addTreaties: false,
        editTreaties: false,
        retrieveTreaties: false,
        deleteTreaties: false
    });

    const addFileField = () => {
        setFiles([...files, { id: files.length + 1, name: "", file: null }]);
    };

    // const handleSortDropdown = () => {
    //     setOpenSortDropdown((prev) => (!prev))
    // }

    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Treaties', action: 'retrieve' | 'edit' | 'delete', record: InternationalTreatiesTableDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);

        setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
        }));
    };

    const handleEditOpen = (type: 'Treaties') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`edit${type}`]: true }));
        }, 10);
    };

    const handleDeleteOpen = (type: 'Treaties') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };

    // const organizationOption = [
    //     { value: "test1", label: "test1" },
    //     { value: "test2", label: "test2" },
    //     { value: "test3", label: "test3" },
    //     { value: "test4", label: "test4" },
    //     { value: "test5", label: "test5" },
    //   ];

    const onFinish = () => {
        console.log('hello finish');
    }

    const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]

    return (
        <MainLayout>
            <MainHeading title={`${t('titles.internationalsTreaties')}`}  subtitle="Подзаголоок">
                <div className="main-heading-dropdown">
                    <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
                </div>
                <Button onClick={() => handleModal('addTreaties', true)}>{`${t('buttons.add')}`} {`${t('crudNames.agreement')}`} <IoMdAdd /></Button>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
               <ComponentTable<InternationalTreatiesTableDataType> onRowClick={(record) => handleRowClick('Treaties', 'retrieve', record)} columns={InternationalTreatiesTableColumn(t)} data={InternationalTreatiesTableData}/>
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.agreement')} openModal={modalState.addTreaties} closeModal={() => handleModal('addTreaties', false)}>
                <FormComponent  onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="nameOfTreaties" >
                                <Input className="input" size='large' placeholder={t('inputs.contractTitle')}/>
                            </Form.Item>
                            <Form.Item className="input" name="date" >
                                <DatePicker size="large" className="input" placeholder={t('inputs.selectDate')}/>
                            </Form.Item>
                        </div>
                        <div className="form-inputs">
                            <Form.Item className="input" name="place" >
                                <Input className="input" size='large' placeholder={t('inputs.placeOfSigning')}/>
                            </Form.Item>
                            <Form.Item className="input" name="level" >
                                <Input className="input" size='large' placeholder={t('inputs.levelOfSigning')}/>
                            </Form.Item>
                        </div>  
                        {files.map((item) => (
                            <div className="form-inputs" key={item?.id}>
                                <Form.Item className="input" name="file" >
                                    <Upload>
                                        <Input className="input input-upload" size='large' placeholder={t('inputs.uploadFile')}/>
                                    </Upload>
                                </Form.Item>
                            </div>
                        ))}
                        <div className="form-btn-new">
                            <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                        </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.agreement')} openModal={modalState.retrieveTreaties} closeModal={() => handleModal('retrieveTreaties', false)} handleEdit={() => handleEditOpen('Treaties')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfTreaties" >
                            <Input disabled className="input" size='large' />
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker disabled size="large" className="input" placeholder=" "/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="place" >
                            <Input disabled className="input" size='large'/>
                        </Form.Item>
                        <Form.Item className="input" name="level" >
                            <Input disabled className="input" size='large' />
                        </Form.Item>
                    </div>  
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="file" >
                                <Upload disabled>
                                    <Input disabled className="input input-upload" size='large'/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.agreement')} openModal={modalState.editTreaties} closeModal={() => handleModal('editTreaties', false)} handleDelete={() => handleDeleteOpen('Treaties')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="nameOfTreaties" >
                            <Input className="input" size='large' placeholder={t('inputs.contractTitle')}/>
                        </Form.Item>
                        <Form.Item className="input" name="date" >
                            <DatePicker size="large" className="input" placeholder={t('inputs.selectDate')}/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="place" >
                            <Input className="input" size='large' placeholder={t('inputs.placeOfSigning')}/>
                        </Form.Item>
                        <Form.Item className="input" name="level" >
                            <Input className="input" size='large' placeholder={t('inputs.levelOfSigning')}/>
                        </Form.Item>
                    </div>  
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="file" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadFile')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                    </div>
                    <Button>{t('buttons.edit')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.deleteTreaties} title= {`${t('titles.areYouSure')} ${t('crudNames.agreement')} ?`} className="modal-tight" closeModal={() => handleModal('deleteTreaties', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteTreaties', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default InternationalTreaties;