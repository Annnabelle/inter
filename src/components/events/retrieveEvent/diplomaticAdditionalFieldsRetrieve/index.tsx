import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";


interface DiplomaticRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}


const DiplomaticAdditionalFieldsRetrieve: React.FC<DiplomaticRetrieveAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();
    return (
        <>
            {(event?.place || event?.mainGuest) && (
                <div className="form-inputs">
                    {event?.place && (
                    <Form.Item className="input" name="place">
                        <Input disabled className="input" placeholder={event?.place} size="large" />
                    </Form.Item>
                    )}
                    {event?.mainGuest && (
                    <Form.Item className="input" name="mainGuest">
                        <Input disabled placeholder={event?.mainGuest} size="large" />
                    </Form.Item>
                    )}
                </div>
            )}

            {event?.organizer && (
                <>
                    <div className="inputs-label">
                        <p className="label">{t('titles.roles.organizer')}</p>
                    </div>
                    <div className="form-inputs">
                        <SearchCountryOrOrganizationRetrieve event={event} form={form} />
                    </div>
                </>
            )}
        </>
    )
}

export default DiplomaticAdditionalFieldsRetrieve;