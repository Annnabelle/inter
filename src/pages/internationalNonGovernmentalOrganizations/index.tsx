import React, { useState } from 'react'
import { theme, Form, Input, Upload, Select } from "antd";
import { IoMdAdd } from 'react-icons/io';
import {FileItem } from '../../types/countries';
import { InternationalNonGovernmentOrganizationProjectDataType, InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType, InternationalOrganizationNonGovernmentChiefDataType } from '../../types';
import { InternationalOrganizationNonGovernmentChiefColumns, InternationalOrganizationNonGovernmentChiefData } from '../../tableData/internationalNonGovernmentOrganizationChief';
import { InternationalNonGovernmentOrganizationsChronologyOfMeetingColumns, InternationalNonGovernmentOrganizationsChronologyOfMeetingData } from '../../tableData/internationalNonGovernmentOrganizationChronologyOfMeetings';
import { InternationalNonGovernmentOrganizationProjectColumns, InternationalNonGovernmentOrganizationProjectData } from '../../tableData/internationalNonGovernmentOrganizationProject';
import MainLayout from '../../components/layout'
import MainHeading from '../../components/mainHeading'
import ModalWindow from '../../components/modalWindow';
import Button from '../../components/button';
import FormComponent from '../../components/form';
import ComponentTable from '../../components/table';
import { useTranslation } from 'react-i18next';

const InternationalNonGovernmentalOrganizations: React.FC = () => {
    const { t } = useTranslation();
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    
    // const [openSortDropdown, setOpenSortDropdown] = useState(false);
    // const [form] = Form.useForm();
    const [documentField, setDocumentField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [referenceField, setReferenceField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [referenceDocumentField, setReferenceDocumentField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [modalState, setModalState] = useState({
      chiefRetrieve: false,
      chiefEdit: false,
      chiefDelete: false,
      addChief: false,
      projectRetrieve: false,
      projectEdit: false,
      projectDelete: false,
      addProject: false,
    });
    
    const handleModal = (modalName: string, value: boolean) => {
      setModalState((prev) => ({ ...prev, [modalName]: value }));
    };
    
    // const handleSortDropdown = () => {
    //   setOpenSortDropdown((prev) => !prev);
    // };
    
    const addDocumentField = () => {
      setDocumentField([...documentField, { id: documentField.length + 1, file: null }]);
    };
    const addReferenceField = () => {
        setReferenceField([...referenceField, { id: referenceField.length + 1, file: null }]);
    };

    const addReferenceDocumentField = () => {
        setReferenceDocumentField([...referenceDocumentField, { id: referenceDocumentField.length + 1, file: null }]);
    };
    
    const handleRowClick = (type: 'chief' | 'project', action: 'Retrieve' | 'Edit' | 'Delete') => {
      setModalState((prev) => ({
        ...prev,
        [`${type}${action}`]: true,
      }));
    };
    
    const handleEditOpen = (type: 'chief' | 'project') => {
      setModalState((prev) => ({
        ...prev,
        [`${type}Retrieve`]: false,
      }));
      setTimeout(() => {
        setModalState((prev) => ({ ...prev, [`${type}Edit`]: true }));
      }, 10);
    };
    
    const handleDeleteOpen = (type: 'chief' | 'project') => {
      setModalState((prev) => ({
        ...prev,
        [`${type}Edit`]: false,
      }));
      setTimeout(() => {
        setModalState((prev) => ({ ...prev, [`${type}Delete`]: true }));
      }, 10);
    };
    
    const onFinish = () => {
      console.log('hello finish');
    };

    const filterOptions = [
        {value: 'byName',label: t('buttons.sort.byName')},
        {value: 'byVisit',label: t('buttons.sort.byVisit')},
        {value: 'byMeeting',label: t('buttons.sort.byMeeting')},
        {value: 'all', label: t('buttons.sort.all')}
    ]

  return (
    <MainLayout>
      <MainHeading title={`${t('titles.internationalNonGovernmentalOrganizations')}`} subtitle='Подзаголовок'>
        <div className="main-heading-dropdown main-heading-dropdown-single-btn">
            <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} />
        </div>
      </MainHeading>
      <div style={{background: colorBgContainer,}} className="layout-content-container">
        <div className="international-organizations">
          <div className="page-inner-table-container">
            <div className="page-inner-table-container-heading">
              <div className="heading-title">
                <h3 className="title">
                {t('tablesName.leaders')}
                </h3>
              </div>
              <div className="heading-btn">
                <Button className="outline" onClick={() => handleModal('addChief', true)}>{t('buttons.add')} {t('crudNames.head')} <IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationNonGovernmentChiefDataType> onRowClick={() => handleRowClick('chief', "Retrieve")} data={InternationalOrganizationNonGovernmentChiefData} columns={InternationalOrganizationNonGovernmentChiefColumns} />
          </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                  <div className="heading-title">
                    <h3 className="title">
                    {t('tablesName.jointProjects')}
                    </h3>
                  </div>
                    <div className="heading-btn">
                        <Button className="outline" onClick={() => handleModal('addProject', true)}>{t('buttons.add')}  {t('crudNames.project')}<IoMdAdd/></Button>
                    </div>
                </div>
                <ComponentTable<InternationalNonGovernmentOrganizationProjectDataType> onRowClick={() => handleRowClick('project', "Retrieve")} columns={InternationalNonGovernmentOrganizationProjectColumns} data={InternationalNonGovernmentOrganizationProjectData}/>
            </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                    <div className="heading-title">
                        <h3 className="title">
                        {t('tablesName.meetingTimeline')}
                        </h3>
                    </div>
                </div>
                <ComponentTable<InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType> data={InternationalNonGovernmentOrganizationsChronologyOfMeetingData} columns={InternationalNonGovernmentOrganizationsChronologyOfMeetingColumns} />
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.head')} openModal={modalState.addChief} closeModal={() => handleModal("addChief", false)}>
                <FormComponent onFinish={onFinish}>
                    <div className="form-inputs" >
                        <Form.Item className="input" name="fullName" >
                            <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                        </Form.Item>
                        <Form.Item className="input" name="additionalInfo" >
                            <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                        </Form.Item>
                    </div>
                    {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadScannedDocument')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addDocumentField}>{t('buttons.addAnotherDocument')}</p>
                    </div>
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCertificate')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceField}>{t('buttons.addAnotherCertificate')}</p>
                    </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.head')} closeModal={() => handleModal('chiefRetrieve', false)} handleEdit={() => handleEditOpen('chief')}>
              <FormComponent>
                      <div className="form-inputs">
                      <Form.Item className="input" name="fullName" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                  </div>
                  {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefDocumentFile" >
                                <Upload disabled>
                                    <Input disabled className="input input-upload" size='large' />
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload disabled>
                                    <Input disabled className="input input-upload" size='large' />
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefEdit} title={t('buttons.edit') + " " + t('crudNames.head')} closeModal={() => handleModal('chiefEdit', false)} handleDelete={() => handleDeleteOpen('chief')}>
              <FormComponent onFinish={onFinish} >
                  <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                      </Form.Item>
                  </div>
                    {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefDocumentFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadScannedDocument')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addDocumentField}>{t('buttons.addAnotherDocument')}</p>
                    </div>
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCertificate')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addReferenceField}>{t('buttons.addAnotherCertificate')}</p>
                  </div>
                  <Button>{t('buttons.edit')}</Button>
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefDelete} title={`${t('titles.areYouSure')} ${t('crudNames.head')} ?`} className="modal-tight" closeModal={() => handleModal("chiefDelete", false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal("chiefDelete", false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>

            <ModalWindow openModal={modalState.projectRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.project')} closeModal={() => handleModal('projectRetrieve', false)} handleEdit={() => handleEditOpen('project')}>
              <FormComponent>
                      <div className="form-inputs">
                      <Form.Item className="input" name="fullName" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                  </div>
                  {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload disabled>
                                <Input disabled className="input input-upload" size='large'/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectEdit} title={t('buttons.edit') + " " + t('crudNames.project')} closeModal={() => handleModal('projectEdit', false)} handleDelete={() => handleDeleteOpen('project')}>
              <FormComponent  onFinish={onFinish} >
                  <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                      </Form.Item>
                  </div>
                    {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder={t('inputs.uploadScannedDocument')}/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceDocumentField}>{t('buttons.addAnotherDocument')}</p>
                    </div>
                  <Button>{t('buttons.edit')}</Button>
              </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.project')} openModal={modalState.addProject} closeModal={() => handleModal('addProject', false)}>
                <FormComponent onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="fullName" >
                                <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                            </Form.Item>
                            <Form.Item className="input" name="additionalInfo" >
                                <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                            </Form.Item>
                        </div>
                        {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder={t('inputs.uploadScannedDocument')}/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceDocumentField}>{t('buttons.addAnotherDocument')}</p>
                    </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectDelete} title={`${t('titles.areYouSure')} ${t('crudNames.project')} ?`}className="modal-tight" closeModal={() => handleModal('projectDelete', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('projectDelete', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </div>
      </div>
    </MainLayout>
  )
}

export default InternationalNonGovernmentalOrganizations