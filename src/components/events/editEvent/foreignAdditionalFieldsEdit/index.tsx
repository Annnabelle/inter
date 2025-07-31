import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventLevel } from "../../../../dtos/events/addEvent";
import SearchOrganizerEdit from "../../../searchOrganizerSearchEdit";
import SearchOrganizationEdit from "../../../searchOrganizationEdit";
import ApprovalSectionEdit from "../../../approvalsSectionEdit";
import RetrieveUserSearch from "../../../retrieveSearchUser";

interface ForeignEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const ForeignAdditionalFieldsEdit: React.FC<ForeignEditAdditionalFieldsProps> = ({event, form}) => {
    const { t } = useTranslation();
    const LevelOptions = [
      { value: EventLevel.Deputy, label: t('titles.roles.director') },
      { value: EventLevel.Director, label: t('titles.roles.deputy') },
      { value: EventLevel.Expert, label: t('titles.roles.expert') }
    ];

    useEffect(() => {
        if (event?.approvals) {
        form.setFieldsValue({
            approvals: event.approvals
        });
        }
    }, [event, form]);


    return (
    <>
        <div className="inputs-label">
            <p className="label">Организатор</p>
        </div>
        <div className="form-inputs">
             <SearchOrganizerEdit initialValue={event?.organizer} />
        </div>
         <div className="form-inputs">
           <RetrieveUserSearch
            initialValue={event?.agencyEmployees}
            readonly={false}
            />
        </div>
        <div className="form-inputs">
            <Form.Item className="input" name="level" initialValue={event?.level}>
                <Select
                    className="input"
                    size="large"
                    options={LevelOptions}
                    placeholder={t('tableTitles.level')}
                />
            </Form.Item>
            <Form.Item className="input" name="additionalMembers" initialValue={event?.additionalMembers}>
                <Input className="input" placeholder={t('inputs.additionalMembers')} size="large"/>
            </Form.Item>
        </div>
        <div className="inputs-label">
            <p className="label">Доноры</p>
        </div>
        <Form.List name="donors"initialValue={event?.donors || []}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="form-donors">
                  <div className="form-inputs">
                    <Form.Item
                      {...restField}
                      name={[name, "entity"]}
                      className="input"
                      rules={[{ required: true, message: "Выберите тип" }]}
                    >
                      <Select size="large" placeholder={t('tableTitles.type')}>
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
                              rules={[{ required: true, message: "Введите значение" }]}
                              className="input"
                            >
                              <Input size="large" placeholder={t('tableTitles.name')} />
                            </Form.Item>
                          );
                        }

                        if (selected === "organization") {
                          return (
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              rules={[{ required: true, message: "Выберите организацию" }]}
                              className="input"
                            >
                              <SearchOrganizationEdit />
                            </Form.Item>
                          );
                        }
                        return (
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            rules={[{ required: true, message: "Выберите агентство" }]}
                            className="input"
                          >
                            <Select size="large" placeholder="Выберите агентство">
                              <Select.Option value="000000000000000000000000">Agency</Select.Option>
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
                <Button type="dashed" onClick={() => add()} block>
                  Добавить донора
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <ApprovalSectionEdit
          fieldName="mia"
          titleRequest={t('events.letterToMFA')}
          titleResponse={t('events.MFAResponse')}
          checkboxLabel={t('events.approvalFromMFA')}
          t={t}
        />

        <ApprovalSectionEdit
          fieldName="sss"
          titleRequest={t('events.letterToSSS')}
          titleResponse={t('events.SSSResponse')}
          checkboxLabel={t('events.approvalFromSSS')}
          t={t}
        />

        <ApprovalSectionEdit
          fieldName="administration"
          titleRequest={t('events.letterToAdministration')}
          titleResponse={t('events.administrationResponse')}
          checkboxLabel={t('events.approvalFromAdministration')}
          t={t}
        />
    </>
    )
}

export default ForeignAdditionalFieldsEdit;