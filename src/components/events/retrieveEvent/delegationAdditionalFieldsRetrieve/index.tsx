import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";
import ApprovalSectionRetrieve from "../../../approvalsSectionRetrieve";

interface DelegationRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}

const DelegationAdditionalFieldsRetrieve: React.FC<DelegationRetrieveAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);
    
    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);
    return (
        <>
        {event?.delegation && (
            <>
                <div className="inputs-label">
                    <p className="label">{t('titles.roles.organizer')}</p>
                </div>
                <div className="form-inputs">
                    <SearchCountryOrOrganizationRetrieve event={event} form={form} />
                </div>
            </>
        )}
        {(event.level || event.membersQuantity) && (
            <div className="form-inputs">
                {event?.level && (
                    <Form.Item className="input" name="level" >
                        <Input disabled className="input" placeholder={event?.level}  size="large"/>
                    </Form.Item>
                )}
                {event?.membersQuantity && (
                    <Form.Item className="input" name="membersQuantity">
                        <Input disabled className="input" placeholder={event?.membersQuantity}  size="large"/>
                    </Form.Item>
                )}
            </div>
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
};

export default DelegationAdditionalFieldsRetrieve;