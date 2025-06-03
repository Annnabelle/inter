import React from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventLevel } from "../../../../../dtos/events/addEvent";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";
import ApprovalSection from "../../../../approvalsSection";

const DelegationAdditionalFields: React.FC = () => {
    const { t } = useTranslation();
    
    const LevelOptions = [
        { value: EventLevel.Deputy, label: t('titles.roles.director') },
        { value: EventLevel.Director, label: t('titles.roles.deputy') },
        { value: EventLevel.Expert, label: t('titles.roles.expert') }
    ];

    return (
        <>
        <div className="inputs-label">
            <p className="label">{t('titles.roles.organizer')}</p>
        </div>
            <div className="form-inputs">
                <SearchCountriesOrOrganizations fieldName="delegation"/>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="level" >
                    <Select
                        className="input"
                        size="large"
                        options={LevelOptions}
                        placeholder={t('tableTitles.level')}
                    />
                </Form.Item>
                <Form.Item className="input" name="membersQuantity">
                    <Input className="input" placeholder={t('events.membersQuantity')}  size="large"/>
                </Form.Item>
            </div>

            <ApprovalSection
                fieldName="mia"
                titleRequest={t('events.letterToMFA')}
                titleResponse={t('events.MFAResponse')}
                checkboxLabel={t('events.approvalFromMFA')}
                t={t}
            />

            <ApprovalSection
                fieldName="sss"
                titleRequest={t('events.letterToSSS')}
                titleResponse={t('events.SSSResponse')}
                checkboxLabel={t('events.approvalFromSSS')}
                t={t}
            />

            <ApprovalSection
                fieldName="administration"
                titleRequest={t('events.letterToAdministration')}
                titleResponse={t('events.administrationResponse')}
                checkboxLabel={t('events.approvalFromAdministration')}
                t={t}
            />
        </>
    )
};

export default DelegationAdditionalFields;