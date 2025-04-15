import React, { useState } from 'react'
import { theme, Form, Input, Upload, Select } from "antd";
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
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

const InternationalOrganizations: React.FC = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    const [openSortDropdown, setOpenSortDropdown] = useState(false);
    const [form] = Form.useForm();
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
    
    const handleSortDropdown = () => {
      setOpenSortDropdown((prev) => !prev);
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
      {value: 'byName',label:'По названию'},
      {value: 'byVisit',label:'По визиту'},
      {value: 'byMeeting',label:'По встрече'},
      {value: 'all', label: 'Все'}
  ]

  return (
    <MainLayout>
      <MainHeading title="Международные организации" subtitle='Подзаголовок'>
        <div className="main-heading-dropdown main-heading-dropdown-single-btn">
        <Select options={filterOptions} size="large" className="select" placeholder="Сортировать по"/>
        </div>
      </MainHeading>
      <div style={{background: colorBgContainer,}} className="layout-content-container">
        <div className="international-organizations">
          <div className="page-inner-table-container">
            <div className="page-inner-table-container-heading">
              <div className="heading-title">
                <h3 className="title">
                    Главы
                </h3>
              </div>
              <div className="heading-btn">
                <Button className="outline" onClick={() => handleModal('addChief', true)}>Добавить главу <IoMdAdd/></Button>
              </div>
            </div>
            <ComponentTable<InternationalOrganizationChiefDataType> onRowClick={() => handleRowClick('chief', "Retrieve")} data={InternationalOrganizationChiefData} columns={InternationalOrganizationChiefColumns} />
          </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                  <div className="heading-title">
                    <h3 className="title">
                        Совместные проекты
                    </h3>
                  </div>
                    <div className="heading-btn">
                        <Button className="outline" onClick={() => handleModal('addProject', true)}>Добавить проект <IoMdAdd/></Button>
                    </div>
                </div>
                <ComponentTable<InternationalOrganizationProjectDataType> onRowClick={() => handleRowClick('project', "Retrieve")} data={InternationalOrganizationProjectData} columns={InternationalOrganizationProjectColumns}/>
            </div>
            <div className="page-inner-table-container">
                <div className="page-inner-table-container-heading">
                    <div className="heading-title">
                        <h3 className="title">
                            Хронология встреч
                        </h3>
                    </div>
                </div>
                <ComponentTable<InternationalOrganizationChronologyOfMeetingDataType> columns={InternationalOrganizationChronologyOfMeetingColumns} data={InternationalOrganizationChronologyOfMeetingData}/>
            </div>
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
                  {files.map((item) => (
                    <div className="form-inputs" key={item?.id}>
                      <Form.Item className="input" name="addCVFile" >
                          <Upload disabled>
                              <Input disabled className="input input-upload" size='large' placeholder="Загрузить CV"/>
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
                {files.map((item) => (
                  <div className="form-inputs" key={item?.id}>
                    <Form.Item className="input" name="addCVFile" >
                      <Upload>
                        <Input className="input input-upload" size='large' placeholder="Загрузить CV"/>
                      </Upload>
                    </Form.Item>
                  </div>
                ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addFileField}>Добавить еще CV</p>
                  </div>
                  <Button>Применить</Button>
              </FormComponent>
            </ModalWindow>
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
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="addCVFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Загрузить CV"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>Добавить еще CV</p>
                    </div>
                    <Button>Создать</Button>
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
                  {files.map((item) => (
                    <div className="form-inputs" key={item?.id}>
                      <Form.Item className="input" name="addCVFile" >
                          <Upload disabled>
                              <Input disabled className="input input-upload" size='large' placeholder="Загрузить CV"/>
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
                {files.map((item) => (
                  <div className="form-inputs" key={item?.id}>
                    <Form.Item className="input" name="addCVFile" >
                      <Upload>
                        <Input className="input input-upload" size='large' placeholder="Загрузить CV"/>
                      </Upload>
                    </Form.Item>
                  </div>
                ))}
                  <div className="form-btn-new">
                      <p className="form-btn-new-text" onClick={addFileField}>Добавить еще CV</p>
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
                    {files.map((item) => (
                        <div className="form-inputs" key={item?.id}>
                             <Form.Item className="input" name="addCVFile" >
                                <Upload>
                                    <Input className="input input-upload" size='large' placeholder="Загрузить CV"/>
                                </Upload>
                            </Form.Item>
                        </div>
                    ))}
                    <div className="form-btn-new">
                        <p className="form-btn-new-text" onClick={addFileField}>Добавить еще CV</p>
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

export default InternationalOrganizations