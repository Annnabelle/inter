import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import SearchOrganizationRetrieve from "../../../searchOrganizationRetrieve";
import SearchOrganizerRetrieve from "../../../organizerSearchRetrieve";
import ApprovalSectionRetrieve from "../../../approvalsSectionRetrieve";

interface ForeignRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}

const ForeignAdditionalFieldsRetrieve: React.FC<ForeignRetrieveAdditionalFieldsProps> = ({event, form}) => {
    const { i18n, t } = useTranslation();
    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);
    return (
    <>
        <div className="inputs-label">
            <p className="label">{t('titles.roles.organizer')}</p>
        </div>
        <div className="form-inputs">
            <SearchOrganizerRetrieve
                initialValue={
                event?.organizer
                    ? {
                        id: event.organizer.id,
                        name: event.organizer.name, // <= строка, без [lang]
                    }
                    : undefined
                }
            />
        </div>

        {(event?.level || event?.additionalMembers) && (
            <div className="form-inputs">
                {event.level && (
                    <Form.Item className="input" name="level" >
                        <Input disabled className="input" size="large" placeholder={event?.level}/>
                    </Form.Item>
                )}
                {event.additionalMembers && (
                    <Form.Item className="input" name="additionalMembers">
                        <Input disabled className="input" placeholder={event.additionalMembers} size="large"/>
                    </Form.Item>
                )}
            </div>
        )}
        {event?.donors?.map((donor: any, index: any) => (
            <div className="form-donors" key={index}>
                <div className="form-inputs">

                <Select size="large" disabled value={donor.entity} className="input">
                    <Select.Option value="agency">Agency</Select.Option>
                    <Select.Option value="organization">Organization</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>

                {/* Значение в зависимости от entity */}
                {donor.entity === "other" && (
                    <Input size="large" disabled value={donor.value} placeholder="Введите другое" className="input" />
                )}

                {donor.entity === "organization" && (
                    <SearchOrganizationRetrieve
                        value={donor.value.id}
                        disabled={true}
                        currentName={donor.value.name[i18n?.resolvedLanguage || 'ru']} // передаешь имя для отображения
                    />
                )}

                {donor.entity === "agency" && (
                    <Select size="large" disabled value={donor.value} className="input">
                        <Select.Option value={donor.value}>
                        {/* {getAgencyLabel(i18n?.resolvedLanguage || 'ru')} */}
                        hello
                        </Select.Option>
                    </Select>
                )}

                </div>
            </div>
        ))}
        {event.approvals?.mia?.status != 'none' && (
            <ApprovalSectionRetrieve
                fieldName="mia"
                titleRequest={t('events.letterToMFA')}
                titleResponse={t('events.MFAResponse')}
                checkboxLabel={t('events.approvalFromMFA')}
                t={t}
            />
        )}
        {event.approvals?.sss?.status != 'none' && (
            <ApprovalSectionRetrieve
                fieldName="sss"
                titleRequest={t('events.letterToSSS')}
                titleResponse={t('events.SSSResponse')}
                checkboxLabel={t('events.approvalFromSSS')}
                t={t}
            />
        ) }
        {event.approvals?.administration?.status != 'none' && (
            <ApprovalSectionRetrieve
                fieldName="administration"
                titleRequest={t('events.letterToAdministration')}
                titleResponse={t('events.administrationResponse')}
                checkboxLabel={t('events.approvalFromAdministration')}
                t={t}
            />
        )}
    </>
    )
}

export default ForeignAdditionalFieldsRetrieve;