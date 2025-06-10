import { useEffect, useMemo, useState } from "react";
import {  IoMdAdd } from "react-icons/io";
import { theme, Form, Input, Select } from "antd";
import { AdministrationTableColumns } from "../../tableData/administartion";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {  User } from "../../types/user";
import { deleteUser, retrieveUsers, updateUser } from "../../store/usersSlice";
import { RegisterUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import FormComponent from "../../components/form";
import ComponentTable from "../../components/table";
import { formatDateTime, FormatPhone } from "../../utils/consts";
import { AdministrationDataType } from "../../types";
import { RegisterForm } from "../../types/auth.types";


const Administration: React.FC = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.resolvedLanguage;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [modalState, setModalState] = useState<{
        addAdministration: boolean;
        editAdministration: boolean;
        retrieveAdministration: boolean;
        deleteAdministration: boolean;
        userData: User | null; 
      }>({
        addAdministration: false,
        editAdministration: false,
        retrieveAdministration: false,
        deleteAdministration: false,
        userData: null, 
      });

    const dispatch = useAppDispatch();
    const users = useAppSelector((state: RootState) => state.users.users);
    const dataLimit = useAppSelector((state) => state.users.dataLimit)
    const page = useAppSelector((state) => state.users.dataPage)
    const pagesTotal = useAppSelector((state) => state.users.dataTotal)
    const [currentPage, setCurrentPage] = useState(page);
    const supportedLangs = ['ru', 'en', 'uz'] as const;
    const fallbackLang: (typeof supportedLangs)[number] = 'ru';
     const currentLang = supportedLangs.includes(i18n.resolvedLanguage as any)
    ? (i18n.resolvedLanguage as typeof fallbackLang)
    : fallbackLang;

    useEffect(() => {
        if (users.length === 0) {
          dispatch(retrieveUsers({page: currentPage, limit: 10 }));
        }
      }, [dispatch, users.length, currentPage, dataLimit]);
      

    const UsersData = useMemo(() => {
            return users.map((user) => ({
                key: user.id,
                name: user.firstName + " " + user.lastName,
                lastLoggedInAt: formatDateTime(user.lastLoggedInAt),
                status: user.status,
                role: user.role.name?.[currentLang] || user.role.name?.[fallbackLang],
                action: t('buttons.retrieve'),
            }));
        }, [users]);
    
    const handleModal = (modalName: string, value: boolean) => {
        setModalState((prev) => ({...prev, [modalName] : value}));
    }

    const handleRowClick = (type: 'Administration', action: 'retrieve' | 'edit' | 'delete', record: AdministrationDataType) => {
        console.log(`Clicked on ${type}, action: ${action}, record:`, record);
        const user = users.find((user) => user.id === record.key);
        
        if (user) {
          setModalState((prev) => ({
            ...prev,
            [`${action}${type}`]: true,
            userData: user, 
          }));
        }
      };

    const roleOption = [
        { value: "admin", label: 'Администратор'},
        { value: "intl_officer", label: "Сотрудник международного управления"},
        { value: "junior_intl_officer", label: 'Младший сотрудник международного управления' },
        { value: "manager", label: 'Руководство'},
        { value: "employee", label: 'Другие сотрудники'},
    ];
    const statusOption = [
        { value: "Активный", label: t('buttons.active') },
        { value: "Не активный", label: t('buttons.inactive') },
    ];
    const handleEditOpen = (type: 'Administration') => {
        setModalState((prev) => ({
            ...prev,
            [`retrieve${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({
                ...prev,
                [`edit${type}`]: true,
            }));
        }, 10);
    };
    const handleDeleteOpen = (type: 'Administration') => {
        setModalState((prev) => ({
            ...prev,
            [`edit${type}`]: false,
        }));
        setTimeout(() => {
            setModalState((prev) => ({ ...prev, [`delete${type}`]: true }));
        }, 10);
    };
    const handleRegisterUser = async (values: RegisterForm) => {
        try {
            const newFormData = {...values, language: "ru" }
            const resultAction = await dispatch(RegisterUser(newFormData));
          
            if (RegisterUser.fulfilled.match(resultAction)) {
                toast.success( t('messages.userAddedSuccess'));
                setTimeout(() => {
                    handleModal('addAdministration', false);
                    window.location.reload(); 
                }, 1000); 
            } else {
                toast.error(t('messages.userRegisterError'));
            }
        } catch (err) {
          toast.error((err as string) || t('messages.serverError'));
        }
      };
    
    const handleUpdateUser = async (values: any) => {
        try {
            const updatedData = {
                ...values,
                id: modalState.userData?.id,
                language: lang, 
            };
        
            const resultAction = await dispatch(updateUser(updatedData));
        
            if (updateUser.fulfilled.match(resultAction)) {
                toast.success(t('messages.serUpdatedSuccess'));
                setTimeout(() => {
                    handleModal('editAdministration', false);
                    window.location.reload(); 
                    dispatch(retrieveUsers(updatedData.id));
                }, 1000); 
            } else {
                toast.error(t('messages.userUpdateError'));
            }
        } catch (err) {
            toast.error((err as string) || t('messages.serverError'));
        }
    };
    const handleDelete = async () => {
        try {
            const userId = modalState.userData?.id
            const resultAction = await dispatch(deleteUser(userId));
    
          if (deleteUser.fulfilled.match(resultAction)) {
            toast.success(t('messages.userDeletedSuccess'));
            setTimeout(() => {
              window.location.reload(); 
            }, 1000);
          } else {
            toast.error(t('messages.userDeleteError'));
          }
        } catch (error) {
          toast.error(t('messages.serverError'));
        }
    };
    return (
        <MainLayout>
            <MainHeading title={`${t('titles.administration')}`} subtitle="Подзаголоок">
                <div className="main-heading-dropdown-single-btn"> 
                    <Button onClick={() => handleModal('addAdministration', true)}>{`${t('buttons.add')}`} {`${t('crudNames.administrator')}`} <IoMdAdd /></Button>
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <ComponentTable<AdministrationDataType>
                    pagination={{
                        current: currentPage,
                        pageSize: dataLimit,
                        total: pagesTotal,
                        onChange: (page) => {
                            setCurrentPage(page);
                            dispatch(retrieveUsers({ page, limit: dataLimit }));
                        },
                    }}
                    onRowClick={(record) => handleRowClick('Administration', 'retrieve', record)}
                    data={UsersData}
                    columns={AdministrationTableColumns(t)}
                    loading={useAppSelector((state) => state.users.loading)}
                />
            </div>
            <ModalWindow title={t('buttons.add') + " " + t('crudNames.administrator')} openModal={modalState.addAdministration} closeModal={() => handleModal('addAdministration', false)}>
                <FormComponent  onFinish={handleRegisterUser}>
                    <div className="form-inputs">
                        <Form.Item className="input" name="firstName" >
                            <Input className="input" size='large' placeholder={`${t('inputs.name')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="lastName" >
                            <Input className="input" size='large' placeholder={`${t('inputs.lastName')}`} />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="phone" >
                            <Input className="input" size='large' placeholder={`${t('inputs.phone')}`} />
                        </Form.Item>
                        <Form.Item className="input" name="email" >
                            <Input className="input" size='large' placeholder={`${t('inputs.email')}`} />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" options={roleOption} placeholder={`${t('inputs.role')}`}/>
                        </Form.Item>
                        <Form.Item className="input" name="password" >
                            <Input className="input" size='large' placeholder={`${t('inputs.password')}`} />
                        </Form.Item>
                    </div>
                    {/* <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" options={statusOption} placeholder={`${t('inputs.status')}`} />
                        </Form.Item>
                    </div> */}
                    <Button type="submit">{t('buttons.create')}</Button>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.retrieve') + " " + t('crudNames.administrator')} openModal={modalState.retrieveAdministration} closeModal={() => handleModal('retrieveAdministration', false)} handleEdit={() => handleEditOpen('Administration')}>
                <FormComponent>
                    <div className="form-inputs">
                        <Form.Item className="input" name="firstName" >
                            <Input className="input" size='large' placeholder={modalState.userData?.firstName || ''} disabled/>
                        </Form.Item>
                        <Form.Item className="input" name="lastName" >
                            <Input className="input" size='large' placeholder={modalState.userData?.lastName || ''} disabled/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="phone" >
                            <Input className="input" size='large' placeholder={modalState.userData?.phone || ''} disabled />
                        </Form.Item>
                        <Form.Item className="input" name="email" >
                            <Input className="input" size='large' placeholder={modalState.userData?.email || ''} disabled />
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="role" >
                            <Select className="input" size="large" placeholder={modalState.userData?.role?.name?.ru} disabled/>
                        </Form.Item>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="status" >
                            <Select className="input" size="large" placeholder={modalState.userData?.status || ''} disabled />
                        </Form.Item>
                    </div>
                </FormComponent>
            </ModalWindow>
            <ModalWindow title={t('buttons.edit') + " " + t('crudNames.administrator')} openModal={modalState.editAdministration} closeModal={() => handleModal('editAdministration', false)} handleDelete={() => handleDeleteOpen('Administration')}>
            <FormComponent onFinish={handleUpdateUser}>
                <div className="form-inputs">
                    <Form.Item className="input" name="firstName" initialValue={modalState.userData?.firstName}>
                        <Input className="input" size="large" placeholder={`${t('inputs.name')}`} />
                    </Form.Item>
                    <Form.Item className="input" name="lastName" initialValue={modalState.userData?.lastName}>
                        <Input className="input" size="large" placeholder={`${t('inputs.lastName')}`} />
                    </Form.Item>
                </div>
                <div className="form-inputs">
                    <Form.Item className="input" name="phone" initialValue={modalState.userData?.phone}>
                        <Input className="input" size="large" placeholder={`${t('inputs.phone')}`} />
                    </Form.Item>
                    <Form.Item className="input" name="email" initialValue={modalState.userData?.email}>
                        <Input className="input" size="large" placeholder={`${t('inputs.email')}`} />
                    </Form.Item>
                </div>
                {/* <div className="form-inputs">
                    <Form.Item className="input" name="role" initialValue={modalState.userData?.role.name?.ru}>
                        <Select className="input" size="large" options={roleOption} placeholder={`${t('inputs.role')}`} />
                    </Form.Item>
                </div> */}
                <div className="form-inputs">
                    <Form.Item className="input" name="status" initialValue={modalState.userData?.status}>
                        <Select className="input" size="large" options={statusOption} placeholder={`${t('inputs.status')}`} />
                    </Form.Item>
                </div>
                <Button type="submit">{t('buttons.edit')}</Button>
            </FormComponent>
        </ModalWindow>

            <ModalWindow openModal={modalState.deleteAdministration} title={`${t('titles.areYouSure')} ${t('crudNames.administrator')} ?`}  className="modal-tight" closeModal={() => handleModal('deleteAdministration', false)}>
                <div className="modal-tight-container">
                    <Button onClick={() => handleModal('deleteAdministration', false)} className="outline">{t('buttons.cancel')}</Button>
                    <Button className="danger" onClick={handleDelete}>{t('buttons.delete')}</Button>
                </div>
            </ModalWindow>
        </MainLayout>
    );
};

export default Administration;