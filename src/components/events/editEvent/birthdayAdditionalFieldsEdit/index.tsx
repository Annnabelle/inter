import React from "react";
import { Form, Input } from "antd";
import SearchCountriesOrOrganizationsEdit from "../../../searchCountriesOrOrganizationsEdit";

interface BirthdayEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const BirthdayAdditionalFieldsEdit: React.FC<BirthdayEditAdditionalFieldsProps> = ({event, form}) => {

  return (
    <>
      <div className="inputs-label">
        <p className="label">Страна / Организация</p>
      </div>
      <div className="form-inputs">
      <SearchCountriesOrOrganizationsEdit
        fieldName="source"
        initialEntity={event?.source?.entity}
        initialValue={event?.source?.value}
      />
      </div>
      <div className="form-inputs">
        <Form.Item className="input" name="user" initialValue={event.user}>
          <Input className="input" placeholder="userId" size="large"/>
        </Form.Item>
      </div>
    </>
  );
}

export default BirthdayAdditionalFieldsEdit;