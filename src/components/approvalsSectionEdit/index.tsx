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

const ApprovalSectionEdit: React.FC<ApprovalSectionProps> = ({
  fieldName,
  titleRequest,
  titleResponse,
  checkboxLabel,
  t
}) => {
  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldValue, setFieldsValue }) => {
        const approval = getFieldValue(['approvals', fieldName]) || {};
        const request = approval.request || {};
        const response = approval.response || {};
        const status = approval.status || 'none';

        const isRequestFilled = request.date && request.document;
        const isResponseFilled = response.date && response.document;
        const isFormReady = isRequestFilled && isResponseFilled;

        // Устанавливаем начальный статус если отсутствует
        if (!approval.status) {
          setFieldsValue({
            approvals: {
              [fieldName]: {
                status: 'none'
              }
            }
          });
        } else if (isRequestFilled && status === 'none') {
          setFieldsValue({
            approvals: {
              [fieldName]: {
                status: 'pending'
              }
            }
          });
        }

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
                      getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined
                      })}
                    >
                      <DatePicker
                        size="large"
                        showTime
                        format="DD.MM.YYYY HH:mm"
                        style={{ width: '100%' }}
                        placeholder={t('inputs.selectDate')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={['approvals', fieldName, 'request', 'document']}
                      style={{ width: '100%' }}
                    >
                      <Input size="large" placeholder={t('inputs.number')} />
                    </Form.Item>
                  </div>
                </div>

                <div className="approval-container-item">
                  <p className="label">{titleResponse}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Form.Item
                      name={['approvals', fieldName, 'response', 'date']}
                      style={{ width: '100%' }}
                      getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined
                      })}
                    >
                      <DatePicker
                        size="large"
                        showTime
                        format="DD.MM.YYYY HH:mm"
                        style={{ width: '100%' }}
                        placeholder={t('inputs.selectDate')}
                      />
                    </Form.Item>
                    <Form.Item
                      name={['approvals', fieldName, 'response', 'document']}
                      style={{ width: '100%' }}
                    >
                      <Input size="large" placeholder={t('inputs.number')} />
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
                <Checkbox disabled={!isFormReady}>{checkboxLabel}</Checkbox>
              </Form.Item>
            </div>
          </>
        );
      }}
    </Form.Item>
  );
};

export default ApprovalSectionEdit;

