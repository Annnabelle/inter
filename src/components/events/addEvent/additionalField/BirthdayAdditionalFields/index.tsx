import React from "react";
import { Form, Input } from "antd";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";
import { useTranslation } from "react-i18next";

const BirthdayAdditionalFields: React.FC = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="inputs-label">
        <p className="label">{t('titles.countryOrOrganization')}</p>
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
  )
}

export default BirthdayAdditionalFields;