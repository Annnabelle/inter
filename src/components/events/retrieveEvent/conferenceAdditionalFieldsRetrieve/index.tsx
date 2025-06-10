import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import SearchOrganizer from "../../../organizaerSearch";
import ApprovalSection from "../../../approvalsSection";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";
import ApprovalSectionRetrieve from "../../../approvalsSectionRetrieve";

interface ConferenceRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}

const ConferenceAdditionalFieldsRetrieve: React.FC<ConferenceRetrieveAdditionalFieldsProps> = ({event, form}) => {
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
        {event.organizer && (
            <>
            <div className="inputs-label">
                <p className="label">{t('titles.roles.organizer')}</p>
            </div>
            <div className="form-inputs">
                <SearchOrganizer initialValue={event.organizer} />
            </div>
            </>
        )}
        {event.format && (  
            <>
                <div className="inputs-label">
                        <p className="label">Формат конференции</p>
                    </div>
                <div className="form-inputs">
                    <Form.Item className="input" name="format" rules={[{ required: true, message: t('errors.required') }]}>
                    <Select
                        className="input"
                        size="large"
                        disabled
                        placeholder={event.format}
                    />
                    </Form.Item>
                </div>
            </>
        )}
        {event.partners.length > 0  && (
            <>
                <div className="inputs-label">
                    <p className="label">Партнеры</p>
                </div>
                {event.partners?.map((item: any, index: any) => (
                    <div className="form-inputs" key={item.id || index}>
                        <SearchCountryOrOrganizationRetrieve
                        event={item}
                        form={form}
                        fieldName={['partners', index]} // очень важно
                        />
                    </div>
                ))}
            </>
        )}
        
        {event.donor && (
            <>
                <div className="inputs-label">
                    <p className="label">Донор</p>
                </div>
                <div className="form-inputs">
                    <SearchCountryOrOrganizationRetrieve event={event} form={form}  />
                </div>
            </>
        )}
        {event?.membersQuantity && (
            <div className="form-inputs">
                <Form.Item className="input" name='membersQuantity'>
                    <Input className="input" placeholder={event?.membersQuantity} size="large" />
                </Form.Item>
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
  );
};

export default ConferenceAdditionalFieldsRetrieve;