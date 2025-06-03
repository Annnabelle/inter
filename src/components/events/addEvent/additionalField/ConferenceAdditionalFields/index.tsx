import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { EventFormat } from "../../../../../dtos/events/addEvent";
import { useTranslation } from "react-i18next";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";
import SearchOrganizer from "../../../../organizaerSearch";
import ApprovalSection from "../../../../approvalsSection";

const ConferenceAdditionalFields: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([{ id: Date.now() }]);

  const addFileField = () => {
        setFiles([...files, { id: files.length + 1}]);
    };

  const FormatOptions = [
    { value: EventFormat.Personal, label: t('events.personal') },
    { value: EventFormat.Online, label: t('events.online') },
    { value: EventFormat.Hybrid, label: t('events.hybrid') }
  ];

  return (
    <>
        <div className="inputs-label">
            <p className="label">{t('titles.roles.organizer')}</p>
        </div>
      <div className="form-inputs">
        <SearchOrganizer/>
      </div>
      <div className="inputs-label">
            <p className="label">Формат конференции</p>
        </div>
      <div className="form-inputs">
        <Form.Item className="input" name="format" rules={[{ required: true, message: t('errors.required') }]}>
          <Select
            className="input"
            size="large"
            options={FormatOptions}
            placeholder={t('tableTitles.format')}
          />
        </Form.Item>
      </div>
        <div className="inputs-label">
            <p className="label">Партнеры</p>
        </div>
       {files.map((item, index) => (
            <div className="form-inputs" key={item.id}>
                <SearchCountriesOrOrganizations fieldName={['partners', index]} />
            </div>
            ))}
        <div className="form-btn-new">
            <p className="form-btn-new-text" onClick={addFileField}>
            {t('buttons.add')}
            </p>
        </div>
        <div className="inputs-label">
            <p className="label">Донор</p>
        </div>
        <div className="form-inputs">
           <SearchCountriesOrOrganizations  fieldName="donor" />
        </div>
      <div className="form-inputs">
        <Form.Item className="input" name='membersQuantity'>
          <Input className="input" placeholder={t('events.membersQuantity')} size="large" />
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
  );
};

export default ConferenceAdditionalFields;
