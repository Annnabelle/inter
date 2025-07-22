import React, { useEffect, useMemo, useState } from 'react'
import { theme, Form, Input, Upload } from "antd";
import { IoMdAdd } from 'react-icons/io';
import { InternationalOrganizationChiefDataType, InternationalOrganizationChronologyOfMeetingDataType, InternationalOrganizationProjectDataType } from '../../types';
import { InternationalOrganizationChiefColumns } from '../../tableData/internationalOrganizationChiefTable';
import { InternationalOrganizationProjectColumns } from '../../tableData/internationalOrganizationProject';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { useParams } from 'react-router-dom';
import { createOrganizationsEmployees, deleteOrganizationsEmployees, retrieveOrganizationsEmployeeById, RetrieveOrganizationEmployees, updateOrganizationsEmployees } from '../../store/organizationEmployeeSlice';
import { OrganizationEmployee, OrganizationEmployees } from '../../types/organizationEmployee';
import { toast } from 'react-toastify';
import { createOrganizationProject, deleteOrganizationProject, retrieveOrganizationProjectById, retrieveOrganizationsProjects, updateOrganizationsProject } from '../../store/projects';
import { Project } from '../../types/projects';
import { CreateDocument, DeleteUpload } from '../../store/uploads';
import { normalizeUrl } from '../../utils/baseUrl';
import { Document } from '../../types/uploads';
import { FaTrashAlt } from 'react-icons/fa';
import { UserRole } from '../../utils/roles';
import { getUserRole } from '../../utils/getUserRole';
import { InternationalOrganizationChronologyOfMeetingColumns, InternationalOrganizationChronologyOfMeetingData } from '../../tableData/internationalOgranizationChronologyOfMeeting';
import MainLayout from '../../components/layout'
import MainHeading from '../../components/mainHeading'
import ModalWindow from '../../components/modalWindow';
import Button from '../../components/button';
import FormComponent from '../../components/form';
import ComponentTable from '../../components/table';
import { RetrieveEvents } from '../../store/events';
import dayjs from 'dayjs';
import { CountriesInnerEventDataType } from '../../types/events';
import { CountriesEventTableColumns } from '../../tableData/countriesInnerEvent';

const InternationalOrganizations: React.FC = () => {
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [files, setFiles] = useState([{ id: Date.now() }]);
  const [modalState, setModalState] = useState<{
      chiefRetrieve: boolean,
      chiefEdit: boolean,
      chiefDelete: boolean,
      addChief: boolean,
      projectRetrieve: boolean,
      projectEdit:  boolean,
      projectDelete: boolean,
      addProject: boolean,
      employeeData: OrganizationEmployee | null,
      projectData: Project | null
  }>({
      chiefRetrieve: false,
      chiefEdit: false,
      chiefDelete: false,
      addChief: false,
      projectRetrieve: false,
      projectEdit: false,
      projectDelete: false,
      addProject: false,
      employeeData: null,
      projectData: null
  });
  const { id } = useParams<{ id: string }>();
  const dispatch  =  useAppDispatch();
  const organizationEmployees = useAppSelector((state: RootState) => state.organizationEmployee.organizationsEmployees)
  const organizationProjects = useAppSelector((state) => state.organizationProjects.organizationProjects)
  const limit = useAppSelector((state) => state.organizations.limit)
  const projectById = useAppSelector((state) => state.organizationProjects.project)
  const employeeById = useAppSelector((state) => state.organizationEmployee.employee)
  const page = useAppSelector((state) => state.organizations.page)
  const total = useAppSelector((state) => state.organizations.total)
  const projectsPage = useAppSelector((state) => state.organizationProjects.page)
  const projectsTotal = useAppSelector((state) => state.organizationProjects.total)
  const projectsLimit = useAppSelector((state) => state.organizationProjects.limit)
  const [currentProjectPage, setCurrentProjectPage] = useState(projectsPage)
  const [currentPage, setCurrentPage] = useState(page);
  const [editForm] = Form.useForm();
  const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
  const [selectedChiefId, setSelectedChiefId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [localFiles, setLocalFiles] = useState<Document[]>([]);
  const role = getUserRole();
  const meetings = useAppSelector((state) => state.events.delegations);
  const eventsPage = useAppSelector((state) => state.events.page)
  const [currentEventPage, setCurrentEventPage] = useState(eventsPage);

  useEffect(() => {
      if (id) {
        dispatch(RetrieveOrganizationEmployees({ limit: 10, page: currentPage, id }));
      }
  }, [dispatch, organizationEmployees.length, currentPage, limit, id])

  useEffect(() => {
      if (id) {
        dispatch(retrieveOrganizationsProjects({ limit: 10, page: currentProjectPage, id }));
      }
  }, [dispatch, organizationProjects.length, currentProjectPage, limit, id])

  
  useEffect(() => {
    if (employeeById) {
        editForm.resetFields(); 
        editForm.setFieldsValue({
          firstName: employeeById.firstName,
          lastName: employeeById.lastName,
          additionalInformation: employeeById.comment,
          email: employeeById.email,
          phone: employeeById.phone,
          comment: employeeById.comment,
          position: employeeById.position,
          employeePosition: employeeById.position,
          document: employeeById.documents
      });
    } else if (projectById){
       editForm.resetFields(); 
        editForm.setFieldsValue({
          name: projectById.name,
          comment: projectById.comment
        })
    }
  }, [employeeById, editForm, projectById]);


  const organizationEmployeeData = useMemo(() => {
      return organizationEmployees.map((organizationEmployee) => ({
          key: organizationEmployee.id,
          fullName: organizationEmployee.firstName + " " + organizationEmployee.lastName,
          additionalInformation: organizationEmployee.comment,
          email: organizationEmployee.email,
          employeePosition: organizationEmployee.position
      }))
  }, [organizationEmployees, t])

  const organizationProjectsData = useMemo(() => {
    return organizationProjects.map((projects) => ({
      key: projects.id,
      name: projects.name,
      comment: projects.comment,
      document: projects.documents
    }))
  }, [organizationProjects, t])

  const handleModal = (modalName: string, value: boolean) => {
    setModalState((prev) => ({ ...prev, [modalName]: value }));
  };
    
  const addFileField = () => {
    setFiles([...files, { id: files.length + 1 }]);
  };
  
 const handleRowClick = (
    type: 'chief' | 'project',
    action: 'Retrieve' | 'Edit' | 'Delete',
    record: InternationalOrganizationChiefDataType | InternationalOrganizationProjectDataType
  ) => {

    if (type === 'chief') {
      const organizationEmployeeData = organizationEmployees.find(
        (organizationEmployee) => organizationEmployee.id === record.key
      ) ?? null;
      setSelectedChiefId(record.key);
      setModalState((prev) => ({
        ...prev,
        [`${type}${action}`]: true,
        employeeData: organizationEmployeeData,
      }));
    } else if (type === 'project') {

      const organizationProjectsData = organizationProjects.find(
        (organizationProject) => organizationProject.id === record.key
      ) ?? null;
      setSelectedProjectId(record.key)
      setModalState((prev) => ({
        ...prev,
        [`${type}${action}`]: true,
        projectData: organizationProjectsData,
      }));
  } else {
    console.log('HandleRowClick Error');
  }
};
  useEffect(() => {
    if (selectedChiefId) {
      dispatch(retrieveOrganizationsEmployeeById({ id: selectedChiefId }));
    }
  }, [dispatch, selectedChiefId]);

  useEffect(() => {
    if (selectedProjectId) {
      dispatch(retrieveOrganizationProjectById({ id: selectedProjectId }));
    }
  }, [dispatch, selectedProjectId]);

   useEffect(() => {
      if (projectById?.documents) {
          setLocalFiles(projectById.documents);
      } else if (employeeById?.documents) {
          setLocalFiles(employeeById?.documents)
      }
  }, [projectById]);

  useEffect(() => {
    if(meetings.length === 0){
        dispatch(RetrieveEvents({limit: 10, page: currentEventPage, eventTypes: 'meeting', organizationId: id}))
    }
  }, [meetings.length, dispatch, limit, currentEventPage, id])


  const MeetingsData = useMemo(() => {
    return meetings.map((event, index) => ({
        key: index + 1,
        name: event.name,
        eventType: event.eventType,
        start: dayjs(event.startDate).format('DD.MM.YYYY'),
        end: dayjs(event.endDate).format('DD.MM.YYYY'),
        comment: event?.comment
    }));
  }, [meetings, t]);  

    
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

  const handleCreateOrganizationEmployee = async(values: OrganizationEmployees) => {
    try {
      const data = {...values, organizationId: id ?? '',  documents: uploadedFileIds};
      const resultAction = await dispatch(createOrganizationsEmployees(data))
      if(createOrganizationsEmployees.fulfilled.match(resultAction)){
        toast.success(t('messages.employeeCreatedSuccess'))
        setTimeout(() => {
          handleModal('chiefAdd', false);
          window.location.reload()
        }, 1000)
      } else {
        toast.error(t('messages.employeeCreatedError'))
      }
    } catch (err) {
      toast.error((err as string) || t('messages.serverError'))
    }
  }

  const handleUpdateOrganizationEmployee = async (values: any) => {
    try {
      const updatedData = {
          ...values,
          id: modalState?.employeeData?.id,
          documents: [
            ...(localFiles.map(file => file.id) || []),
            ...(uploadedFileIds || [])
          ]
      };
      const resultAction = await dispatch(updateOrganizationsEmployees(updatedData));
      
      if (updateOrganizationsEmployees.fulfilled.match(resultAction)) {
          toast.success(t('messages.employeeUpdatedSuccess'));
          setTimeout(() => {
              handleModal('chiefEdit', false);
              dispatch(RetrieveOrganizationEmployees(updatedData.id));
              window.location.reload(); 
          }, 1000); 
      } else {
          toast.error(t('messages.employeeUpdatedError'));
      }
    } catch (err) {
        toast.error((err as string) || t('messages.serverError'));
    }
  };
  
  const handleDeleteOrganizationEmployee = async () => {
    try {
        const organizationEmployeeId = modalState.employeeData?.id
        const resultAction = await dispatch(deleteOrganizationsEmployees(organizationEmployeeId));

        if (deleteOrganizationsEmployees.fulfilled.match(resultAction)) {
        toast.success(t('messages.employeeDeletedSuccess'));
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
        } else {
        toast.error(t('messages.employeeDeletedError'));
        }
    } catch (error) {
        toast.error(t('messages.serverError'));
    }
  };

  const handleUpdateOrganizationProject = async (values: any) => {
    try {
      const updatedData = {
          ...values,
          id: modalState?.projectData?.id,
          documents: [
            ...(localFiles.map(file => file.id) || []),
            ...(uploadedFileIds || [])
          ]
      };
      const resultAction = await dispatch(updateOrganizationsProject(updatedData));
      
      if (updateOrganizationsProject.fulfilled.match(resultAction)) {
          toast.success(t('messages.projectUpdatedSuccess'));
          setTimeout(() => {
              handleModal('projectEdit', false);
              dispatch(retrieveOrganizationsProjects(updatedData.id));
              window.location.reload(); 
          }, 1000); 
      } else {
          toast.error(t('messages.projectUpdatedError'));
      }
    } catch (err) {
        toast.error((err as string) || t('messages.serverError'));
    }
  };

  const handleCreateOrganizationProject = async(values: Project) => {
    try {
      const data = {...values, organizationId: id ?? '', documents: uploadedFileIds};
      const resultAction = await dispatch(createOrganizationProject(data))
      if(createOrganizationProject.fulfilled.match(resultAction)){
        toast.success(t('messages.projectCreatedSuccess'))
        setTimeout(() => {
          handleModal('chiefAdd', false);
          window.location.reload()
        }, 1000)
      } else {
        toast.error(t('messages.projectCreatedError'))
      }
    } catch (err) {
      toast.error((err as string) || t('messages.serverError'))
    }
  }

  const handleDeleteOrganizationProject = async () => {
    try {
        const organizationProjectId = modalState.projectData?.id
        const resultAction = await dispatch(deleteOrganizationProject(organizationProjectId));

        if (deleteOrganizationProject.fulfilled.match(resultAction)) {
        toast.success(t('messages.projectDeletedSuccess'));
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
        } else {
        toast.error(t('messages.projectDeletedError'));
        }
    } catch (error) {
        toast.error(t('messages.serverError'));
    }
  };

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
          throw new Error(t('messages.fileIdNotFound'));
        }
      } catch (error) {
        onError(error);
      }
  };

  const deleteUpload = async (id: string) => {
    try {
        let owner: string | undefined;
        let entity: 'project' | 'employee' | undefined;

        if (projectById?.id) {
            owner = projectById.id;
            entity = 'project';
        } else if (employeeById?.id) {
            owner = employeeById.id;
            entity = 'employee';
        }

        if (!owner || !entity) {
            return;
        }

        const deleteUploadedFile = await dispatch(DeleteUpload({
            id,
            owner,
            entity
        }));

        if (DeleteUpload.fulfilled.match(deleteUploadedFile)) {
            setLocalFiles(prev => prev.filter(file => file.id !== id));
            toast.success(t('messages.fileDeletedSuccess'));
        }
    } catch (error) {
        console.error(t('messages.serverError'), error);
    }
};


  return (
    <MainLayout>
      <MainHeading title={`${t('titles.internationalOrganizations')}`} subtitle='Подзаголовок'>
        <div className="main-heading-dropdown main-heading-dropdown-single-btn">
          {/* <Button className='danger'>Удалить организацию</Button> */}
        {/* <Select options={filterOptions} size="large" className="select" placeholder={`${t('buttons.sort.sortBy')}`} /> */}
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
                <Button className="outline" onClick={() => handleModal('addChief', true)}>{t('buttons.add')} {t('crudNames.employee')}<IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationChiefDataType> 
              pagination={{
                current: currentPage,
                pageSize: limit,
                total: total,
                onChange: (page) => {
                    setCurrentPage(page)
                }
              }}
            onRowClick={(record) => handleRowClick('chief', "Retrieve", record)} data={organizationEmployeeData} columns={InternationalOrganizationChiefColumns(t)} />
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
                <ComponentTable<InternationalOrganizationProjectDataType> 
                  pagination={{
                    current: currentProjectPage,
                    pageSize: projectsLimit,
                    total: projectsTotal,
                    onChange: (page) => {
                        setCurrentProjectPage(page)
                        dispatch(retrieveOrganizationsProjects({limit: 10, page: currentProjectPage, id: id }))
                    }
                  }}
                onRowClick={(record) => handleRowClick('project', "Retrieve", record)} data={organizationProjectsData} columns={InternationalOrganizationProjectColumns(t)}/>
            </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                    <div className="heading-title">
                        <h3 className="title">
                        {t('tablesName.meetingTimeline')}
                        </h3>
                    </div>
                </div>
                <ComponentTable<CountriesInnerEventDataType> columns={CountriesEventTableColumns(t)} data={MeetingsData}/>
            </div>
            {employeeById && selectedChiefId && (
              <ModalWindow openModal={modalState.chiefRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.employee')} closeModal={() => handleModal('chiefRetrieve', false)} handleEdit={() => handleEditOpen('chief')}>
                <FormComponent>
                    <div className="form-inputs">
                      {employeeById?.firstName && employeeById?.lastName && (
                        <Form.Item className="input" name="fullName">
                            <Input disabled className="input" size='large' placeholder={employeeById.firstName + " " + employeeById.lastName} />
                        </Form.Item>
                      )}
                      {employeeById?.email && (
                        <Form.Item className="input" name="email">
                            <Input disabled className="input" size='large' placeholder={employeeById.email} />
                        </Form.Item>
                      )}
                    </div>
                    <div className="form-inputs">
                      {employeeById?.phone && (
                        <Form.Item className="input" name="phone" >
                            <Input disabled className="input" size='large' placeholder={employeeById.phone}/>
                        </Form.Item>
                      )}
                      {employeeById?.position && (
                        <Form.Item className="input" name="position" >
                            <Input disabled className="input" size='large' placeholder={employeeById.position}/>
                        </Form.Item>
                      )}
                    </div>
                    {employeeById?.comment && (
                      <div className="form-inputs">
                        <Form.Item className="input" name="comment" >
                            <Input disabled className="input" size='large' placeholder={employeeById.comment}/>
                        </Form.Item>
                      </div>
                    )}
                    {employeeById?.documents?.map((item: Document) => (
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
            {employeeById && (
              <ModalWindow openModal={modalState.chiefEdit} title={t('buttons.edit') + " " + t('crudNames.employee')} closeModal={() => handleModal('chiefEdit', false)} handleDelete={() => handleDeleteOpen('chief')}
               {...(role !== UserRole.JUNIOR_INTL_OFFICER && { handleDelete: () => handleDeleteOpen('chief'),})}>
                <FormComponent  formProps={editForm} onFinish={handleUpdateOrganizationEmployee} >
                  <div className="form-inputs">
                  {employeeById?.firstName && (
                    <Form.Item className="input" name="firstName" initialValue={employeeById?.firstName}>
                      <Input className="input" size="large" />
                    </Form.Item>
                  )}
                  {employeeById?.lastName && (
                    <Form.Item className="input" name="lastName" initialValue={employeeById?.lastName}>
                      <Input className="input" size="large" />
                    </Form.Item>
                  )}
                  </div>
                  <div className="form-inputs">
                    {employeeById?.email && (
                      <Form.Item className="input" name="email" initialValue={employeeById?.email}>
                          <Input  className="input" size='large' />
                      </Form.Item>
                    )}
                    {employeeById?.phone && (
                      <Form.Item className="input" name="phone" initialValue={employeeById?.phone} >
                          <Input  className="input" size='large'/>
                      </Form.Item>
                    )}
                  </div>
                  <div className="form-inputs">
                    {employeeById?.position && (
                      <Form.Item className="input" name="position" initialValue={employeeById?.position}>
                          <Input  className="input" size='large'/>
                      </Form.Item>
                    )}
                    {employeeById?.comment && (
                      <Form.Item className="input" name="comment" initialValue={employeeById?.comment}>
                          <Input  className="input" size='large'/>
                      </Form.Item>
                    )}
                  </div>
                  <div className="form-inputs">
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
                    </div>
                      {employeeById?.documents?.map((item: Document) => (
                          <div className="form-inputs" key={item?.id}>
                              <Form.Item className="input" name="document">
                                  <div className="input-upload-items">
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
                                      <div className="deleteUpload" onClick={() => deleteUpload(item?.id)}>
                                          <FaTrashAlt/>
                                      </div>
                                  </div>
                              </Form.Item>
                          </div>
                        ))}
                  <Button type='submit'>{t('buttons.edit')}</Button>
                </FormComponent>
              </ModalWindow>
            )}
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

                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                    </div>
                    <Button type='submit'>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefDelete} title={`${t('titles.areYouSure')} ${t('crudNames.employee')} ?`} className="modal-tight" closeModal={() => handleModal("chiefDelete", false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal("chiefDelete", false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteOrganizationEmployee()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
            {projectById && modalState.projectRetrieve && (
              <ModalWindow openModal={modalState.projectRetrieve} title={t('buttons.retrieve') + " " + t('crudNames.project')}  closeModal={() => handleModal('projectRetrieve', false)} handleEdit={() => handleEditOpen('project')}>
                <FormComponent>
                        <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input disabled className="input" size='large' placeholder={projectById.name}/>
                        </Form.Item>
                        <Form.Item className="input" name="comment" >
                            <Input disabled className="input" size='large' placeholder={projectById.comment}/>
                        </Form.Item>
                    </div>
                    {projectById?.documents?.map((item: Document) => (
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
            {projectById && (
              <ModalWindow openModal={modalState.projectEdit} title={t('buttons.edit') + " " + t('crudNames.project')}  closeModal={() => handleModal('projectEdit', false)}
               {...(role !== UserRole.JUNIOR_INTL_OFFICER && { handleDelete: () => handleDeleteOpen('project'),})}>
                <FormComponent formProps={editForm}  onFinish={handleUpdateOrganizationProject} >
                    <div className="form-inputs" >
                      {projectById.name && (
                        <Form.Item className="input" name="name" initialValue={projectById.name}>
                            <Input className="input" size='large' />
                        </Form.Item>
                      )}
                      {projectById.comment && (
                        <Form.Item className="input" name="comment" initialValue={projectById.comment}>
                            <Input className="input" size='large' />
                        </Form.Item>
                      )}
                    </div>
                    <div className="form-inputs">
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
                    </div>
                      {projectById?.documents?.map((item: Document) => (
                          <div className="form-inputs" key={item?.id}>
                              <Form.Item className="input" name="document">
                                  <div className="input-upload-items">
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
                                      <div className="deleteUpload" onClick={() => deleteUpload(item?.id)}>
                                          <FaTrashAlt/>
                                      </div>
                                  </div>
                              </Form.Item>
                          </div>
                      ))}
                    <Button type='submit'>{t('buttons.edit')}</Button>
                </FormComponent>
              </ModalWindow>
            )}
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.project')}  openModal={modalState.addProject} closeModal={() => handleModal('addProject', false)}>
                <FormComponent onFinish={handleCreateOrganizationProject}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="name" >
                            <Input className="input" size='large' placeholder={t('inputs.title')}/>
                        </Form.Item>
                        <Form.Item className="input" name="comment" >
                            <Input className="input" size='large' placeholder={t('inputs.additionalInformation')}/>
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
                    <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addFileField}>{t('buttons.addAnotherFile')}</p>
                    </div>
                    <Button type='submit'>{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectDelete} title={`${t('titles.areYouSure')} ${t('crudNames.project')} ?`} className="modal-tight" closeModal={() => handleModal('projectDelete', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('projectDelete', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button onClick={() => handleDeleteOrganizationProject()} className="danger">{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </div>
      </div>
    </MainLayout>
  )
}

export default InternationalOrganizations