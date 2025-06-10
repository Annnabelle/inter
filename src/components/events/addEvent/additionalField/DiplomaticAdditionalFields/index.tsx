import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";

const DiplomaticAdditionalFields: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="form-inputs">
                <Form.Item className="input" name="place">
                    <Input className="input" placeholder={t('tableTitles.place')} size="large"/>
                </Form.Item>
                <Form.Item className="input" name="mainGuest" >
                    <Input placeholder={t('inputs.mainGuest')} size="large"/>
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">{t('titles.roles.organizer')}</p>
            </div>
            <div className="form-inputs">
                <SearchCountriesOrOrganizations fieldName="organizer"/>
            </div>
        </>
    )
}

export default DiplomaticAdditionalFields;