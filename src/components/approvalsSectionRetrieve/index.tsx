import React from 'react';
import { Form, DatePicker, Input, Checkbox } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

type ApprovalSectionProps = {
  fieldName: string;
  titleRequest: string;
  titleResponse: string;
  checkboxLabel: string;
  t: (key: string) => string;
};

const ApprovalSectionRetrieve: React.FC<ApprovalSectionProps> = ({
  fieldName,
  titleRequest,
  titleResponse,
  checkboxLabel,
  t
}) => {
  return (
    <Form.Item shouldUpdate>
      {({ getFieldValue, setFieldsValue }) => {
        const requestDate = getFieldValue(['approvals', fieldName, 'request', 'date']);
        const requestDoc = getFieldValue(['approvals', fieldName, 'request', 'document']);
        const responseDate = getFieldValue(['approvals', fieldName, 'response', 'date']);
        const responseDoc = getFieldValue(['approvals', fieldName, 'response', 'document']);

        const isRequestFilled = requestDate && requestDoc;
        const isResponseFilled = responseDate && responseDoc;
        const isFormReady = isRequestFilled && isResponseFilled;

        const currentStatus = getFieldValue(['approvals', fieldName, 'status']);
        if (!currentStatus) {
          setFieldsValue({
            approvals: {
              [fieldName]: {
                status: 'none'
              }
            }
          });
        } else if (isRequestFilled && currentStatus === 'none') {
          setFieldsValue({
            approvals: {
              [fieldName]: {
                status: 'pending'
              }
            }
          });
        }
        const getValueFromEvent = (value: Dayjs | null) => value;

        return (
          <>
            <div className="form-inputs">
              <div className="approval-container-items">
                <div className="approval-container-item">
                  <p className="label">{titleRequest}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Item
                      name={['approvals', fieldName, 'request', 'date']}
                      style={{ width: '100%' }}
                       getValueFromEvent={getValueFromEvent}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : undefined
                        })}
                    >
                      <DatePicker
                        size="large"
                        showTime
                        disabled
                        format="DD.MM.YYYY HH:mm"
                        style={{ width: '100%' }}
                        placeholder={t('inputs.selectDate')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={['approvals', fieldName, 'request', 'document']}
                      style={{ width: '100%' }}
                    >
                      <Input disabled size="large" placeholder={t('inputs.number')} />
                    </Form.Item>
                  </div>
                </div>

                <div className="approval-container-item">
                  <p className="label">{titleResponse}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Item
                      name={['approvals', fieldName, 'response', 'date']}
                      style={{ width: '100%' }}
                       getValueFromEvent={getValueFromEvent}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : undefined
                        })}
                    >
                      <DatePicker
                        size="large"
                        showTime
                        format="DD.MM.YYYY HH:mm"
                        disabled
                        style={{ width: '100%' }}
                        placeholder={t('inputs.selectDate')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={['approvals', fieldName, 'response', 'document']}
                      style={{ width: '100%' }}
                    >
                      <Input disabled size="large" placeholder={t('inputs.number')} />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-inputs">
              <Form.Item
                name={['approvals', fieldName, 'status']}
                valuePropName="checked"
                getValueProps={(val) => ({ checked: val === 'approved' })}
                getValueFromEvent={(e) => (e.target.checked ? 'approved' : 'pending')}
              >
                <Checkbox disabled>{checkboxLabel}</Checkbox>
              </Form.Item>
            </div>
          </>
        );
      }}
    </Form.Item>
  );
};

export default ApprovalSectionRetrieve;






