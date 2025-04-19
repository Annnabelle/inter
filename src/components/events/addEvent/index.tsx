import React, { useState } from "react";
import { Form, Select, DatePicker, Input, Checkbox } from "antd";
import { AddEventFormProps, EventFormValues } from "../../../types/events";
import dayjs from "dayjs";
import Button from "../../button";
import FormComponent from "../../form";
import { useTranslation } from "react-i18next";


const AddEventForm: React.FC<AddEventFormProps> = ({ handleAddEvent }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<EventFormValues>();
  const [isMIDChecked, setIsMIDChecked] = useState<boolean>(false);
  const [isSGBChecked, setIsSGBChecked] = useState<boolean>(false);
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(false);

  const eventOptions = [
    { value: "conferences", label: t('events.conferences') },
    { value: "seminar", label: t('events.seminar') },
    { value: "meetings", label: t('events.meetings') },
    { value: "partners", label: t('events.partners') },
    { value: "other", label: t('events.other') },
  ];
  const eventFormat = [
    { value: "online", label:  t('events.online')  },
    { value: "offline", label:  t('events.offline')  },
  ];
  
  const partnersOptions = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
  ];
  const donorFormat = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
  ];
  const onFinish = (values: EventFormValues) => {
    handleAddEvent(values);
    form.resetFields();
  };

  return (
    <FormComponent onFinish={onFinish}>
      <div className="form-inputs">
        <Form.Item
          name="eventName"
          className="input"
        >
          <Select className="input" size="large" options={eventOptions} placeholder={`${t('inputs.selectEvent')}`} />
        </Form.Item>
        <Form.Item
          name="organizer"
          className="input"
        >
          <Input className="input" size="large"  placeholder={`${t('inputs.enterOrganizer')}`}  />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="eventType"
          className="input"
        >
          <Select className="input" size="large" options={eventFormat} placeholder={`${t('inputs.selectFormat')}`}  />
        </Form.Item>
        <Form.Item
          name="countOfMembers"
          className="input"
        >
          <Input className="input" size="large"  placeholder={`${t('inputs.numberOfParticipants')}`} type="number" />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="partnersOptions"
          className="input"
        >
          <Select className="input" size="large" options={partnersOptions} placeholder={`${t('inputs.selectPartner')}`} />
        </Form.Item>
        <Form.Item
          name="donorFormat"
          className="input"
        >
          <Select className="input" size="large" options={donorFormat} placeholder={`${t('inputs.selectDonor')}`}  />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="date"
          style={{width: '100%'}}
        >
          <DatePicker.RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            defaultValue={[dayjs(), dayjs().add(1, "hour")]}
            style={{ width: "100%" }}
            size="large"
            
          />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <div className="approval-container">
          {isMIDChecked && (
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{`${t('events.letterToMFA')}`} </p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                  <Form.Item name="dateMidLetter"
                    style={{width: '100%'}}>
                   <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`}/>
                  </Form.Item>
                  <Form.Item name="numberMidLetter"
                    style={{width: '100%'}}>
                   <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                  </Form.Item>
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{t('events.MFAResponse')}</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                  <Form.Item 
                    name="dateMidResponse"
                    style={{width: '100%'}}>
                   <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`} />
                  </Form.Item>
                    <Form.Item 
                      name="numberMidResponse"
                      style={{width: '100%'}}>
                      <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                    </Form.Item>
                 </div>
               </div>  
             </div>
          )}
          <Checkbox checked={isMIDChecked} onChange={(e) => setIsMIDChecked(e.target.checked)}>
          {t('events.approvalFromMFA')}
          </Checkbox>

          {isSGBChecked && (
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{t('events.letterToSSS')}</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                  <Form.Item 
                    name="dateSgbLetter"
                    style={{width: '100%'}}>
                   <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`}/>
                  </Form.Item>
                  <Form.Item 
                    name="numberSbgLetter"
                    style={{width: '100%'}}>
                   <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                  </Form.Item>
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{t('events.SSSResponse')}</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                  <Form.Item 
                    name="dateSgbResponse"
                    style={{width: '100%'}}> 
                   <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`} />
                  </Form.Item>
                    <Form.Item 
                    name="numberSgbResponse"
                    style={{width: '100%'}}>  
                   <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                  </Form.Item>
                 </div>
               </div>  
             </div>
          )}
          <Checkbox checked={isSGBChecked} onChange={(e) => setIsSGBChecked(e.target.checked)}>
          {t('events.approvalFromSSS')}
          </Checkbox>
          {isAdminChecked && (
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{t('events.letterToAdministration')}</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`}/>
                   <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">{t('events.administrationResponse')}</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} placeholder={`${t('inputs.selectDate')}`} />
                   <Input size="large" placeholder={`${t('inputs.number')}`} style={{ width: "100%" }} />
                 </div>
               </div>  
             </div>
          )}
          <Checkbox checked={isAdminChecked} onChange={(e) => setIsAdminChecked(e.target.checked)}>
          {t('events.approvalFromAdministration')}
          </Checkbox>
        </div>
      </div>

      <Button type="submit">{t('buttons.create')}</Button>
    </FormComponent>
  );
};

export default AddEventForm;


