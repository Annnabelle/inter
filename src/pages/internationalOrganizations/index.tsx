import React, { useState } from 'react'
import { theme, Form, Input, Upload, Select } from "antd";
import { IoMdAdd } from 'react-icons/io';
import {FileItem } from '../../types/countries';
import { InternationalOrganizationChiefDataType, InternationalOrganizationChronologyOfMeetingDataType, InternationalOrganizationProjectDataType } from '../../types';
import { InternationalOrganizationChiefColumns, InternationalOrganizationChiefData } from '../../tableData/internationalOrganizationChiefTable';
import { InternationalOrganizationProjectColumns, InternationalOrganizationProjectData } from '../../tableData/internationalOrganizationProject';
import { InternationalOrganizationChronologyOfMeetingColumns, InternationalOrganizationChronologyOfMeetingData } from '../../tableData/internationalOgranizationChronologyOfMeeting';
import MainLayout from '../../components/layout'
import MainHeading from '../../components/mainHeading'
import ModalWindow from '../../components/modalWindow';
import Button from '../../components/button';
import FormComponent from '../../components/form';
import ComponentTable from '../../components/table';
import { useTranslation } from 'react-i18next';

const InternationalOrganizations: React.FC = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [files, setFiles] = useState<FileItem[]>([{ id: 1, file: null }]);
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
    
  const addFileField = () => {
    setFiles([...files, { id: files.length + 1, file: null }]);
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
      <MainHeading title={`${t('titles.internationalOrganizations')}`} subtitle='Подзаголовок'>
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
                <Button className="outline" onClick={() => handleModal('addChief', true)}>{t('buttons.add')} {t('crudNames.head')}<IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationChiefDataType> onRowClick={() => handleRowClick('chief', "Retrieve")} data={InternationalOrganizationChiefData} columns={InternationalOrganizationChiefColumns(t)} />
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
                <ComponentTable<InternationalOrganizationProjectDataType> onRowClick={() => handleRowClick('project', "Retrieve")} data={InternationalOrganizationProjectData} columns={InternationalOrganizationProjectColumns(t)}/>
            </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                    <div className="heading-title">
                        <h3 className="title">
                        {t('tablesName.meetingTimeline')}
                        </h3>
                    </div>
                </div>
                <ComponentTable<InternationalOrganizationChronologyOfMeetingDataType> columns={InternationalOrganizationChronologyOfMeetingColumns(t)} data={InternationalOrganizationChronologyOfMeetingData}/>
            </div>
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
                  {files.map((item) => (
                    <div className="form-inputs" key={item?.id}>
                      <Form.Item className="input" name="addCVFile" >
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
                {files.map((item) => (
                  <div className="form-inputs" key={item?.id}>
                    <Form.Item className="input" name="addCVFile" >
                      <Upload>
                        <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCV')}/>
                      </Upload>
                    </Form.Item>
                  </div>
                ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherCV')}</p>
                  </div>
                  <Button>{t('buttons.edit')}</Button>
              </FormComponent>
            </ModalWindow>
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
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="addCVFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCV')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherCV')}</p>
                    </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefDelete} title={`${t('titles.areYouSure')} ${t('crudNames.head')} ?`} className="modal-tight" closeModal={() => handleModal("chiefDelete", false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal("chiefDelete", false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.project')}  closeModal={() => handleModal('projectRetrieve', false)} handleEdit={() => handleEditOpen('project')}>
              <FormComponent>
                      <div className="form-inputs">
                      <Form.Item className="input" name="fullName" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input disabled className="input" size='large' />
                      </Form.Item>
                  </div>
                  {files.map((item) => (
                    <div className="form-inputs" key={item?.id}>
                      <Form.Item className="input" name="addCVFile" >
                          <Upload disabled>
                              <Input disabled className="input input-upload" size='large' />
                          </Upload>
                      </Form.Item>
                    </div>
                  ))}
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectEdit} title={t('buttons.edit') + " " + t('crudNames.project')}  closeModal={() => handleModal('projectEdit', false)} handleDelete={() => handleDeleteOpen('project')}>
              <FormComponent  onFinish={onFinish} >
                  <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                      </Form.Item>
                  </div>
                {files.map((item) => (
                  <div className="form-inputs" key={item?.id}>
                    <Form.Item className="input" name="addCVFile" >
                      <Upload>
                        <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCV')}/>
                      </Upload>
                    </Form.Item>
                  </div>
                ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherCV')}</p>
                  </div>
                  <Button>{t('buttons.edit')}</Button>
              </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.project')}  openModal={modalState.addProject} closeModal={() => handleModal('addProject', false)}>
                <FormComponent onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="fullName" >
                                <Input className="input" size='large' placeholder={t('inputs.enterFullName')}/>
                            </Form.Item>
                            <Form.Item className="input" name="additionalInfo" >
                                <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
                            </Form.Item>
                        </div>
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="addCVFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder={t('inputs.uploadCV')}/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherCV')}</p>
                    </div>
                    <Button>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectDelete} title={`${t('titles.areYouSure')} ${t('crudNames.project')} ?`} className="modal-tight" closeModal={() => handleModal('projectDelete', false)}>
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

export default InternationalOrganizations