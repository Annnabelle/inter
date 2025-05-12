import React, { useEffect, useMemo, useState } from 'react'
import { theme, Form, Input, Upload, Select } from "antd";
import { IoMdAdd } from 'react-icons/io';
import {FileItem } from '../../types/countries';
import { InternationalNonGovernmentOrganizationProjectDataType, InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType, InternationalOrganizationChiefDataType, InternationalOrganizationNonGovernmentChiefDataType } from '../../types';
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
import { organizationEmployee, organizationEmployees } from '../../types/organizationEmployee';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { createOrganizationsEmployees, deleteOrganizationsEmployees, retrieveOrganizationsEmployees, updateOrganizationsEmployees } from '../../store/organizationEmployeeSlice';
import { toast } from 'react-toastify';
import { InternationalOrganizationChiefColumns } from '../../tableData/internationalOrganizationChiefTable';

const InternationalNonGovernmentalOrganizations: React.FC = () => {
    const { t } = useTranslation();
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const [documentField, setDocumentField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [referenceField, setReferenceField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [referenceDocumentField, setReferenceDocumentField] = useState<FileItem[]>([{ id: 1, file: null }]);
    const [modalState, setModalState] = useState<{
          chiefRetrieve: boolean,
          chiefEdit: boolean,
          chiefDelete: boolean,
          addChief: boolean,
          projectRetrieve: boolean,
          projectEdit:  boolean,
          projectDelete: boolean,
          addProject: boolean,
          employeeData: organizationEmployee | null
      }>({
          chiefRetrieve: false,
          chiefEdit: false,
          chiefDelete: false,
          addChief: false,
          projectRetrieve: false,
          projectEdit: false,
          projectDelete: false,
          addProject: false,
          employeeData: null
      });
    const { id } = useParams<{ id: string }>();
    const dispatch  =  useAppDispatch();
    const organizationEmployees = useAppSelector((state: RootState) => state.organizationEmployee.organizationsEmployees)
    const limit = useAppSelector((state) => state.organizations.limit)
    const page = useAppSelector((state) => state.organizations.page)
    const total = useAppSelector((state) => state.organizations.total)
    const [currentPage, setCurrentPage] = useState(page);
    const [editForm] = Form.useForm();
    useEffect(() => {
        if (id && organizationEmployees.length === 0) {
            dispatch(retrieveOrganizationsEmployees({ limit: 10, page: currentPage, id }));
        }
    }, [dispatch, organizationEmployees.length, currentPage, limit, id])

    useEffect(() => {
        if (modalState.employeeData) {
            editForm.setFieldsValue({
            fullName: modalState.employeeData.firstName + ' ' + modalState.employeeData.lastName,
            additionalInformation: modalState.employeeData.comment,
            email: modalState.employeeData.email,
            phone: modalState.employeeData.phone,
            employeePosition: modalState.employeeData.position,
        });
        }
    }, [modalState.employeeData, editForm]);

    const organizationEmployeeData = useMemo(() => {
        return organizationEmployees.map((organizationEmployee) => ({
            key: organizationEmployee.id,
            fullName: organizationEmployee.firstName + " " + organizationEmployee.lastName,
            additionalInformation: organizationEmployee.comment,
            email: organizationEmployee.email,
            employeePosition: organizationEmployee.position
        }))
    }, [organizationEmployees, t])
    
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
    
    const handleRowClick = (type: 'chief' | 'project', action: 'Retrieve' | 'Edit' | 'Delete', record: InternationalOrganizationChiefDataType) => {
      console.log(`Clicked on ${type}, action: ${action}, record:`, record);
      if (type === 'chief'){
        const organizationEmployeeData = organizationEmployees.find(
        (organizationEmployee) => organizationEmployee.id === record.key) ?? null;
        setModalState((prev) => ({
          ...prev,
          [`${type}${action}`]: true,
          employeeData: organizationEmployeeData,
        }));
      } else if(type === 'project'){
        const organizationEmployeeData = organizationEmployees.find(
        (organizationEmployee) => organizationEmployee.id === record.key) ?? null;
        setModalState((prev) => ({
          ...prev,
          [`${type}${action}`]: true,
          employeeData: organizationEmployeeData,
        }));
      } else {
        console.log('HandleRowClick Error');
      }
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

    const handleCreateOrganizationEmployee = async(values: organizationEmployees) => {
        try {
          const data = {...values, organizationId: id ?? ''};
          const resultAction = await dispatch(createOrganizationsEmployees(data))
          if(createOrganizationsEmployees.fulfilled.match(resultAction)){
            toast.success('Сотрудник добавлен успешно')
            setTimeout(() => {
              handleModal('chiefAdd', false);
              window.location.reload()
            }, 1000)
          } else {
            toast.error("Ошибка при создании сотрудника")
          }
        } catch (err) {
          toast.error((err as string) || 'Ошибка сервера')
        }
    }

    const handleUpdateOrganizationEmployee = async (values: any) => {
        try {
          const updatedData = {
              ...values,
              id: modalState?.employeeData?.id,
          };
          const resultAction = await dispatch(updateOrganizationsEmployees(updatedData));
          console.log('resultAction', resultAction);
          
          if (updateOrganizationsEmployees.fulfilled.match(resultAction)) {
              toast.success('Сотрудник успешно обновлен');
              setTimeout(() => {
                  handleModal('chiefEdit', false);
                  dispatch(retrieveOrganizationsEmployees(updatedData.id));
                  window.location.reload(); 
              }, 1000); 
          } else {
              toast.error('Ошибка при обновлении сотрудника');
          }
        } catch (err) {
            toast.error((err as string) || 'Ошибка сервера');
        }
    };

    const handleDeleteOrganizationEmployee = async () => {
        try {
            const organizationEmployeeId = modalState.employeeData?.id
            const resultAction = await dispatch(deleteOrganizationsEmployees(organizationEmployeeId));

            if (deleteOrganizationsEmployees.fulfilled.match(resultAction)) {
            toast.success('Сотрудник успешно удален');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            } else {
            toast.error('Ошибка при удалении сотрудника');
            }
        } catch (error) {
            toast.error('Ошибка при удалении сотрудника');
        }
    };

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
                {t('navigation.employees')}
                </h3>
              </div>
              <div className="heading-btn">
                <Button className="outline" onClick={() => handleModal('addChief', true)}>{t('buttons.add')} {t('crudNames.head')} <IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationChiefDataType> onRowClick={(record) => handleRowClick('chief', "Retrieve", record)} data={organizationEmployeeData} columns={InternationalOrganizationChiefColumns(t)} />
          </div>
            {/* <div className="page-inner-table-container">
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
            </div> */}
             <ModalWindow title={t('buttons.add') + " " + t('crudNames.employee')} openModal={modalState.addChief} closeModal={() => handleModal("addChief", false)}>
                <FormComponent onFinish={handleCreateOrganizationEmployee}>
                   <div className="form-inputs">
                    <Form.Item className="input" name="firstName" >
                        <Input  className="input" size='large' placeholder={t('inputs.name')}/>
                    </Form.Item>
                    <Form.Item className="input" name="lastName" >
                        <Input  className="input" size='large' placeholder={t('inputs.lastName')}/>
                    </Form.Item>
                  </div>
                  <div className="form-inputs">
                    <Form.Item className="input" name="email" >
                        <Input  className="input" size='large' placeholder={t('inputs.email')} />
                    </Form.Item>
                    <Form.Item className="input" name="phone" >
                        <Input  className="input" size='large' placeholder={t('inputs.phone')}/>
                    </Form.Item>
                  </div>
                  <div className="form-inputs">
                    <Form.Item className="input" name="position" >
                        <Input  className="input" size='large' placeholder={t('tableTitles.position')}/>
                    </Form.Item>
                    <Form.Item className="input" name="comment" >
                        <Input  className="input" size='large' placeholder={t('tableTitles.comment')}/>
                    </Form.Item>
                  </div>
                    {/* {files.map((item) => (
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
                    </div> */}
                    <Button type='submit'>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
             {modalState.employeeData && (
              <ModalWindow openModal={modalState.chiefRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.employee')} closeModal={() => handleModal('chiefRetrieve', false)} handleEdit={() => handleEditOpen('chief')}>
                <FormComponent>
                    <div className="form-inputs">
                      <Form.Item className="input" name="fullName">
                          <Input disabled className="input" size='large' placeholder={modalState.employeeData.firstName + " " + modalState.employeeData.lastName} />
                      </Form.Item>
                      <Form.Item className="input" name="email">
                          <Input disabled className="input" size='large' placeholder={modalState.employeeData.email} />
                      </Form.Item>
                    </div>
                    <div className="form-inputs">
                      <Form.Item className="input" name="phone" >
                          <Input disabled className="input" size='large' placeholder={modalState.employeeData.phone}/>
                      </Form.Item>
                      <Form.Item className="input" name="position" >
                          <Input disabled className="input" size='large' placeholder={modalState.employeeData.position}/>
                      </Form.Item>
                    </div>
                    <div className="form-inputs">
                      <Form.Item className="input" name="comment" >
                          <Input disabled className="input" size='large' placeholder={modalState.employeeData.comment}/>
                      </Form.Item>
                    </div>
                    {/* {files.map((item) => (
                      <div className="form-inputs" key={item?.id}>
                        <Form.Item className="input" name="addCVFile" >
                            <Upload disabled>
                                <Input disabled className="input input-upload" size='large' />
                            </Upload>
                        </Form.Item>
                      </div>
                    ))} */}
                </FormComponent>
              </ModalWindow>
            )}
             {modalState.employeeData && (
              <ModalWindow openModal={modalState.chiefEdit} title={t('buttons.edit') + " " + t('crudNames.employee')} closeModal={() => handleModal('chiefEdit', false)} handleDelete={() => handleDeleteOpen('chief')}>
                <FormComponent formProps={editForm} onFinish={handleUpdateOrganizationEmployee} >
                  <div className="form-inputs">
                    <Form.Item className="input" name="firstName" initialValue={modalState.employeeData.firstName}>
                        <Input  className="input" size='large' />
                    </Form.Item>
                    <Form.Item className="input" name="lastName" initialValue={modalState.employeeData.lastName}>
                        <Input  className="input" size='large' />
                    </Form.Item>
                  </div>
                  <div className="form-inputs">
                    <Form.Item className="input" name="email" initialValue={modalState.employeeData.email}>
                        <Input  className="input" size='large' />
                    </Form.Item>
                    <Form.Item className="input" name="phone" initialValue={modalState.employeeData.phone}>
                        <Input  className="input" size='large'/>
                    </Form.Item>
                  </div>
                  <div className="form-inputs">
                    <Form.Item className="input" name="position" initialValue={modalState.employeeData.position}>
                        <Input  className="input" size='large'/>
                    </Form.Item>
                    <Form.Item className="input" name="comment" initialValue={modalState.employeeData.comment}>
                        <Input  className="input" size='large'/>
                    </Form.Item>
                  </div>
                  {/* {files.map((item) => (
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
                  </div> */}
                  <Button type='submit'>{t('buttons.edit')}</Button>
                </FormComponent>
              </ModalWindow>
            )}
            <ModalWindow openModal={modalState.chiefDelete} title={`${t('titles.areYouSure')} ${t('crudNames.employee')} ?`} className="modal-tight" closeModal={() => handleModal("chiefDelete", false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal("chiefDelete", false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteOrganizationEmployee()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>

            {/* <ModalWindow openModal={modalState.projectRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.project')} closeModal={() => handleModal('projectRetrieve', false)} handleEdit={() => handleEditOpen('project')}>
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
            </ModalWindow> */}
        </div>
      </div>
    </MainLayout>
  )
}

export default InternationalNonGovernmentalOrganizations