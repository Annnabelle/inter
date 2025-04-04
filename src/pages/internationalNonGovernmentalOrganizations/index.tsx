import React, { useState } from 'react'
import { theme, Form, Input, Upload } from "antd";
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
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

const InternationalNonGovernmentalOrganizations: React.FC = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    const [openSortDropdown, setOpenSortDropdown] = useState(false);
    const [form] = Form.useForm();
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
    
    const handleSortDropdown = () => {
      setOpenSortDropdown((prev) => !prev);
    };
    
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

  return (
    <MainLayout>
      <MainHeading title="Международные не правительственные организации" subtitle='Подзаголовок'>
        <div className="main-heading-dropdown">
            <div className="main-heading-dropdown-item" onClick={() => handleSortDropdown()}>
                <div className="dropdown-text">
                    <p className="text">Сортировать по</p>
                </div>
                <div className="dropdown-icon">
                    <IoIosArrowDown />
                </div>
            </div>
            {openSortDropdown && (
              <div className="dropdown-sort">
                  <div className="dropdown-sort-item">
                      <p className="text">По названию</p>
                  </div>
                  <div className="dropdown-sort-item">
                      <p className="text">По встречам</p>
                  </div>
                  <div className="dropdown-sort-item">
                      <p className="text">По визитам</p>
                  </div>
              </div>
            )}
        </div>
      </MainHeading>
      <div style={{background: colorBgContainer,}} className="layout-content-container">
        <div className="international-organizations">
          <div className="countries-inner-table-container">
            <div className="countries-inner-table-container-heading">
              <div className="heading-title">
                <h3 className="title">
                    Главы
                </h3>
              </div>
              <div className="heading-btn">
                <Button className="outline" onClick={() => handleModal('addChief', true)}>Добавить главу <IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationNonGovernmentChiefDataType> onRowClick={() => handleRowClick('chief', "Retrieve")} data={InternationalOrganizationNonGovernmentChiefData} columns={InternationalOrganizationNonGovernmentChiefColumns} />
          </div>
            <div className="countries-inner-table-container">
                <div className="countries-inner-table-container-heading">
                  <div className="heading-title">
                    <h3 className="title">
                        Совместные проекты
                    </h3>
                  </div>
                    <div className="heading-btn">
                        <Button className="outline" onClick={() => handleModal('addProject', true)}>Добавить проект <IoMdAdd/></Button>
                    </div>
                </div>
                <ComponentTable<InternationalNonGovernmentOrganizationProjectDataType> onRowClick={() => handleRowClick('project', "Retrieve")} columns={InternationalNonGovernmentOrganizationProjectColumns} data={InternationalNonGovernmentOrganizationProjectData}/>
            </div>
            <div className="countries-inner-table-container">
                <div className="countries-inner-table-container-heading">
                    <div className="heading-title">
                        <h3 className="title">
                            Хронология встреч
                        </h3>
                    </div>
                </div>
                <ComponentTable<InternationalNonGovernmentOrganizationsChronologyOfMeetingDataType> data={InternationalNonGovernmentOrganizationsChronologyOfMeetingData} columns={InternationalNonGovernmentOrganizationsChronologyOfMeetingColumns} />
            </div>
            <ModalWindow title="Добавить главу" openModal={modalState.addChief} closeModal={() => handleModal("addChief", false)}>
                <FormComponent onFinish={onFinish}>
                <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder="Введите Ф.И.О"/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder="Дополнительная информация"/>
                      </Form.Item>
                  </div>
                    {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Загрузить сканер документа"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addDocumentField}>Добавить еще документ</p>
                    </div>
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Загрузите справку"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceField}>Добавить еще справку</p>
                    </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefRetrieve} title="Посмотреть главу" closeModal={() => handleModal('chiefRetrieve', false)} handleEdit={() => handleEditOpen('chief')}>
              <FormComponent>
                      <div className="form-inputs">
                      <Form.Item className="input" name="fullName" >
                          <Input disabled className="input" size='large' placeholder="Введите Ф.И.О"/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input disabled className="input" size='large' placeholder="Дополнительная информация"/>
                      </Form.Item>
                  </div>
                  {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefDocumentFile" >
                                <Upload disabled>
                                    <Input disabled className="input input-upload" size='large' placeholder="Загрузить сканер документа"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload disabled>
                                    <Input disabled className="input input-upload" size='large' placeholder="Загрузите справку"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefEdit} title="Изменить главу" closeModal={() => handleModal('chiefEdit', false)} handleDelete={() => handleDeleteOpen('chief')}>
              <FormComponent onFinish={onFinish} >
                  <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder="Введите Ф.И.О"/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder="Дополнительная информация"/>
                      </Form.Item>
                  </div>
                    {documentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefDocumentFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Сканер документа"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addDocumentField}>Добавить еще документ</p>
                    </div>
                     {referenceField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="chiefReferenceFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Справки"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addReferenceField}>Добавить документ</p>
                  </div>
                  <Button>Применить</Button>
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.chiefDelete} title="Вы точно хотите удалить главу?" className="modal-tight" closeModal={() => handleModal("chiefDelete", false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal("chiefDelete", false)} className="outline">Отменить</Button>
                    <Button className="danger">Удалить</Button>
                </div>
            </ModalWindow>

            <ModalWindow openModal={modalState.projectRetrieve} title="Посмотреть проект" closeModal={() => handleModal('projectRetrieve', false)} handleEdit={() => handleEditOpen('project')}>
              <FormComponent>
                      <div className="form-inputs">
                      <Form.Item className="input" name="fullName" >
                          <Input disabled className="input" size='large' placeholder="Введите Ф.И.О"/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input disabled className="input" size='large' placeholder="Дополнительная информация"/>
                      </Form.Item>
                  </div>
                  {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload disabled>
                                <Input disabled className="input input-upload" size='large' placeholder="Загрузить сканер документа"/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
              </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectEdit} title="Изменить проект" closeModal={() => handleModal('projectEdit', false)} handleDelete={() => handleDeleteOpen('project')}>
              <FormComponent  onFinish={onFinish} >
                  <div className="form-inputs" >
                      <Form.Item className="input" name="fullName" >
                          <Input className="input" size='large' placeholder="Введите Ф.И.О"/>
                      </Form.Item>
                      <Form.Item className="input" name="additionalInfo" >
                          <Input className="input" size='large' placeholder="Дополнительная информация"/>
                      </Form.Item>
                  </div>
                    {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder="Загрузить сканер документа"/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceDocumentField}>Добавить еще документ</p>
                    </div>
                  <Button>Применить</Button>
              </FormComponent>
            </ModalWindow>
            <ModalWindow title="Добавить проект" openModal={modalState.addProject} closeModal={() => handleModal('addProject', false)}>
                <FormComponent onFinish={onFinish}>
                        <div className="form-inputs">
                            <Form.Item className="input" name="fullName" >
                                <Input className="input" size='large' placeholder="Введите Ф.И.О"/>
                            </Form.Item>
                            <Form.Item className="input" name="additionalInfo" >
                                <Input className="input" size='large' placeholder="Дополнительная информация"/>
                            </Form.Item>
                        </div>
                        {referenceDocumentField.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                            <Form.Item className="input" name="projectReferenceFile" >
                            <Upload>
                                <Input className="input input-upload" size='large' placeholder="Загрузить сканер документа"/>
                            </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addReferenceDocumentField}>Добавить еще документ</p>
                    </div>
                    <Button>Создать</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow openModal={modalState.projectDelete} title="Вы точно хотите удалить проект?" className="modal-tight" closeModal={() => handleModal('projectDelete', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('projectDelete', false)} className="outline">Отменить</Button>
                    <Button className="danger">Удалить</Button>
                </div>
            </ModalWindow>
        </div>
      </div>
    </MainLayout>
  )
}

export default InternationalNonGovernmentalOrganizations