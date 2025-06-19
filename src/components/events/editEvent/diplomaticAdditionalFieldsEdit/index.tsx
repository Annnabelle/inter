import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SearchCountriesOrOrganizationsEdit from "../../../searchCountriesOrOrganizationsEdit";

interface DiplomaticEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const DiplomaticAdditionalFieldsEdit: React.FC<DiplomaticEditAdditionalFieldsProps> = ({event}) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="form-inputs">
                <Form.Item className="input" name="place" initialValue={event?.place}>
                    <Input className="input" placeholder={t('tableTitles.place')} size="large"/>
                </Form.Item>
                <Form.Item className="input" name="mainGuest" initialValue={event?.mainGuest} >
                    <Input placeholder={t('inputs.mainGuest')} size="large"/>
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">{t('titles.roles.organizer')}</p>
            </div>
            <div className="form-inputs">
                <SearchCountriesOrOrganizationsEdit
                    fieldName="organizer"
                    initialEntity={event?.organizer?.entity}
                    initialValue={event?.organizer?.value}
                />
            </div>
        </>
    )
}

export default DiplomaticAdditionalFieldsEdit;