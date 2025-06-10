import React from "react";
import { Form, Input } from "antd";
import SearchCountryOrOrganizationRetrieve from "../../../searchCoutryOrOrganizationRetrieve";

interface BirthdayRetrieveAdditionalFieldsProps {
  event: any;
  form: any;
}

const BirthdayRetrieveAdditionalFields: React.FC<BirthdayRetrieveAdditionalFieldsProps> = ({ event, form }) => {
  return (
    <>
      {event.source && <SearchCountryOrOrganizationRetrieve event={event} form={form} />}
      {event.user && (
        <div className="form-inputs">
          <Form.Item className="input" name="userId">
            <Input className="input" placeholder="userId" size="large" />
          </Form.Item>
        </div>
      )}
    </>
  );
};


export default BirthdayRetrieveAdditionalFields;
