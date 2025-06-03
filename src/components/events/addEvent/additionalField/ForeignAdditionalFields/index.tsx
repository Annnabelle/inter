import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventLevel } from "../../../../../dtos/events/addEvent";
import { DEFAULT_AGENCY_VALUE } from "../../../../../utils/consts";
import SearchOrganization from "../../../../organizationSearch";
import ApprovalSection from "../../../../approvalsSection";
import SearchOrganizer from "../../../../organizaerSearch";

const ForeignAdditionalFields: React.FC = () => {
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
            <SearchOrganizer fieldName="organizer"/>
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
            <Form.Item className="input" name="additionalMembers">
                <Input className="input" placeholder={t('inputs.additionalMembers')} size="large"/>
            </Form.Item>
        </div>
        <Form.List name="donors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="form-donors">
                  <div key={key} className="form-inputs">
                    <Form.Item
                      {...restField}
                      name={[name, "entity"]}
                      className="input"
                      rules={[{ required: true, message: "Выберите тип" }]}
                    >
                      <Select size="large" placeholder="Выберите тип" className="input">
                        <Select.Option value="agency">Agency</Select.Option>
                        <Select.Option value="organization">Organization</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item shouldUpdate className="input">
                      {({ getFieldValue }) => {
                        const selected = getFieldValue(["donors", name, "entity"]);

                        if (selected === "other") {
                          return (
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              className="input"
                              rules={[{ required: true, message: "Введите значение" }]}
                            >
                              <Input size="large" className="input" placeholder="Введите другое" />
                            </Form.Item>
                          );
                        }

                        if (selected === "organization") {
                          return (
                            <Form.Item {...restField} name={[name, 'value']} className="input">
                              <SearchOrganization/>
                            </Form.Item>
                          );
                        }

                        return (
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            className="input"
                            rules={[{ required: true, message: "Введите значение" }]}
                          >
                            <Select size="large" placeholder="Выберите значение" className="input">
                              <Select.Option value={DEFAULT_AGENCY_VALUE}>Agency</Select.Option>
                            </Select>
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                  </div>
                    <Button type="dashed" onClick={() => remove(name)}>
                      Удалить
                    </Button>
                </div>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block >
                  Добавить донора
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
}

export default ForeignAdditionalFields;