import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import ApprovalSection from "../../../approvalsSection";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";
import ApprovalSectionRetrieve from "../../../approvalsSectionRetrieve";

interface SeminarRetrieveAdditionalFieldsProps {
    event: any,
    form: any
}

const SeminarAdditionalFieldsRetrieve: React.FC<SeminarRetrieveAdditionalFieldsProps>= ({event, form}) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);
    return (
        <>
            {(event?.organizer?.name || event?.membersQuantity) && (
                <div className="form-inputs">
                    {event?.organizer.name && (
                        <Form.Item className="input" name="organizer">
                            <Input disabled className="input" placeholder={event?.organizer.name}  size="large" />
                        </Form.Item>
                    )}
                    {event?.membersQuantity && ( 
                        <Form.Item className="input" name="membersQuantity">
                            <Input disabled className="input" placeholder={event?.membersQuantity} size="large" />
                        </Form.Item>
                    )}
                </div>
            )}
            {event?.format && (
                <>
                    <div className="inputs-label">
                        <p className="label">{t('tableTitles.format')} {t('tableTitles.meeting')}  </p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="format">
                            <Input disabled className="input" placeholder={event?.format} size="large" />
                        </Form.Item>
                    </div>
                </>
            )}
            {event.partners.length > 0  && (
                <>
                    <div className="inputs-label">
                        <p className="label">{t('tableTitles.partners')} </p>
                    </div>
                    {event.partners?.map((item: any, index: any) => (
                        <div className="form-inputs" key={item.id || index}>
                            <SearchCountryOrOrganizationRetrieve
                                event={item}
                                form={form}
                                fieldName={['partners', index]}
                            />
                        </div>
                    ))}
                </>
            )}
            {event.donor && (
                <>
                    <div className="inputs-label">
                        <p className="label">{t('tableTitles.donor')}</p>
                    </div>
                    <div className="form-inputs">
                        <SearchCountryOrOrganizationRetrieve event={event} form={form}  />
                    </div>
                </>
            )}
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
            )}
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


export default SeminarAdditionalFieldsRetrieve;