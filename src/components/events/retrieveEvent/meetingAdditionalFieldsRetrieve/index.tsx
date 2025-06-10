import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";

interface MeetingRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}

const MeetingAdditionalFieldsRetrieve: React.FC<MeetingRetrieveAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();

    return (
        <>
            {event?.place && (
                <div className="form-inputs">
                    <Form.Item className="input" name="place">
                        <Input disabled className="input" placeholder={event?.place} size="large" />
                    </Form.Item>
                </div>
            )}
            {event?.format && (
                <>
                    <div className="inputs-label">
                        <p className="label">Формат встречи</p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="format">
                            <Input disabled className="input" placeholder={event?.format} size="large" />
                        </Form.Item>
                    </div>
                </>
            )}
            {event?.level && (
                <>
                    <div className="inputs-label">
                        <p className="label">Уровень</p>
                    </div>
                    <div className="form-inputs">
                        <Form.Item className="input" name="level">
                            <Input disabled className="input" placeholder={event.level} size="large" />
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
        </>
    )
    
}

export default MeetingAdditionalFieldsRetrieve;