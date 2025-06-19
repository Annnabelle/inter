import React, { useEffect } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventLevel } from "../../../../dtos/events/addEvent";
import SearchCountriesOrOrganizationsEdit from "../../../searchCountriesOrOrganizationsEdit";
import ApprovalSectionEdit from "../../../approvalsSectionEdit";

interface DelegationEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const DelegationAdditionalFieldsEdit: React.FC<DelegationEditAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();
    
    const LevelOptions = [
        { value: EventLevel.Deputy, label: t('titles.roles.director') },
        { value: EventLevel.Director, label: t('titles.roles.deputy') },
        { value: EventLevel.Expert, label: t('titles.roles.expert') }
    ];

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
                <SearchCountriesOrOrganizationsEdit
                    fieldName="delegation"
                    initialEntity={event?.delegation?.entity}
                    initialValue={event?.delegation?.value}
                />
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="level" initialValue={event?.level} >
                    <Select
                        className="input"
                        size="large"
                        options={LevelOptions}
                        placeholder={t('tableTitles.level')}
                    />
                </Form.Item>
                <Form.Item className="input" name="membersQuantity" initialValue={event?.membersQuantity}>
                    <Input className="input" placeholder={t('events.membersQuantity')}  size="large"/>
                </Form.Item>
            </div>
            <div className="form-inputs">
                <Form.Item
                    name={['approvals', 'mia', 'status']}
                    valuePropName="checked"
                    className="input"
                    getValueProps={checked => ({ checked: checked === 'approved' })}
                    getValueFromEvent={e => (e.target.checked ? 'approved' : 'none')}
                >
                    <Checkbox>{t('events.approvalFromMFA')}</Checkbox>
                </Form.Item>
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
};

export default DelegationAdditionalFieldsEdit;