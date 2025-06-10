import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventFormat } from "../../../../dtos/events/addEvent";
import ApprovalSection from "../../../approvalsSection";
import SearchCountriesOrOrganizationsEdit from "../../../searchCountriesOrOrganizationsEdit";
import SearchOrganizerEdit from "../../../searchOrganizerSearchEdit";
import ApprovalSectionEdit from "../../../approvalsSectionEdit";

interface SeminarEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const SeminarAdditionalFieldsEdit: React.FC<SeminarEditAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();
    const FormatOptions = [
        { value: EventFormat.Personal, label: t('events.personal') },
        { value: EventFormat.Online, label: t('events.online') },
        { value: EventFormat.Hybrid, label: t('events.hybrid') }
    ];
    const initialPartners = event?.partners || [];

    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);
    
    const [files, setFiles] = useState(
    initialPartners.length > 0
        ? initialPartners.map((partner: any, index: any) => ({
            id: Date.now() + index,
            initialEntity: partner.entity,
            initialValue: {
            id: partner.value.id,
            name: partner.value.name
            }
        }))
        : [{ id: Date.now() }]
    );

    const addFileField = () => {
    setFiles([
        ...files,
        { id: Date.now() + Math.random() }
    ]);
    };

    return (
        <>
            <div className="inputs-label">
                <p className="label">{t('titles.roles.organizer')}</p>
            </div>
            <div className="form-inputs">
                <SearchOrganizerEdit initialValue={event?.organizer} />
            </div>
            <div className="inputs-label">
                <p className="label">{t('inputs.numberOfParticipants')}</p>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="membersQuantity" initialValue={event?.membersQuantity}>
                    <Input className="input" placeholder="Кол-во людей" size="large" />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Формат мероприятия</p>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="format" initialValue={event?.format}>
                    <Select
                        className="input"
                        size="large"
                        options={FormatOptions}
                        placeholder={t('tableTitles.format')}
                    />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Партнеры</p>
            </div>
            {files.map((item: any, index: any) => (
                <div className="form-inputs" key={item.id}>
                <SearchCountriesOrOrganizationsEdit
                    fieldName={['partners', index]}
                    initialEntity={item.initialEntity}
                    initialValue={item.initialValue}
                />
                </div>
            ))}
            <div className="form-btn-new">
                <p className="form-btn-new-text" onClick={addFileField}>
                    {t('buttons.add')}
                </p>
            </div>
             <div className="inputs-label">
                <p className="label">Донор</p>
            </div>
            <div className="form-inputs">
                <SearchCountriesOrOrganizationsEdit
                    fieldName="donor"
                    initialEntity={event?.donor?.entity}
                    initialValue={event?.donor?.value}
                />
            </div>
            <ApprovalSectionEdit
                fieldName="mia"
                titleRequest={t('events.letterToMFA')}
                titleResponse={t('events.MFAResponse')}
                checkboxLabel={t('events.approvalFromMFA')}
                t={t}
            />

            <ApprovalSectionEdit
                fieldName="sss"
                titleRequest={t('events.letterToSSS')}
                titleResponse={t('events.SSSResponse')}
                checkboxLabel={t('events.approvalFromSSS')}
                t={t}
            />

            <ApprovalSectionEdit
                fieldName="administration"
                titleRequest={t('events.letterToAdministration')}
                titleResponse={t('events.administrationResponse')}
                checkboxLabel={t('events.approvalFromAdministration')}
                t={t}
            />
        </>
    )
}


export default SeminarAdditionalFieldsEdit;