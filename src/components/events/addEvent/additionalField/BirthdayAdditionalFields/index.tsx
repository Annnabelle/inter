import React from "react";
import { Form, Input } from "antd";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";

const BirthdayAdditionalFields: React.FC = () => (
  <>
    <div className="inputs-label">
      <p className="label">Страна / Организация</p>
    </div>
    <div className="form-inputs">
      <SearchCountriesOrOrganizations fieldName = 'source'/>
    </div>
    <div className="form-inputs">
      <Form.Item className="input" name="userId" >
        <Input className="input" placeholder="userId" size="large"/>
      </Form.Item>
    </div>
  </>
);

export default BirthdayAdditionalFields;