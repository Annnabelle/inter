import React,{useState} from 'react'
import { EditEventProps } from '../../../types/events'
import { Form, Select, DatePicker, Input, Checkbox } from "antd";
import { AddEventFormProps, EventFormValues } from "../../../types/events";
import dayjs from "dayjs";
import './styles.sass'
import Button from '../../button';
import FormComponent from '../../form';

const eventOptions = [
    { value: "Конференции/Форумы", label: "Конференции/Форумы" },
    { value: "Семинар/Тренинг", label: "Семинар/Тренинг" },
    { value: "Встречи", label: "Встречи" },
    { value: "Партнеры", label: "Партнеры" },
    { value: "Другое", label: "Другое" },
  ];
  const eventFormat = [
    { value: "онлайн", label: "Онлайн" },
    { value: "офлайн", label: "Офлайн" },
  ];
  
  const partnersOptions = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
  ];
  const donorFormat = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
  ];
  
const EditEvent: React.FC<EditEventProps> = ({handleAddEvent, initialValues}) => {
    console.log("initialValues", initialValues);
    
    const [form] = Form.useForm<EventFormValues>();
    const [isMIDChecked, setIsMIDChecked] = useState<boolean>(false);
    const [isSGBChecked, setIsSGBChecked] = useState<boolean>(false);
    const [isAdminChecked, setIsAdminChecked] = useState<boolean>(false);
  
    const onFinish = (values: EventFormValues) => {
      handleAddEvent(values);
      form.resetFields();
    };
  
    return (
      <FormComponent  onFinish={onFinish} >
        <div className="form-inputs">
          <Form.Item
            name="eventName"
            className="input"
          >
            <Select className="input" size="large" options={eventOptions} placeholder="Выберите мероприятие" />
          </Form.Item>
          <Form.Item
            name="organizer"
            className="input"
          >
            <Input className="input" size="large"  placeholder="Введите организатора"  />
          </Form.Item>
        </div>
        <div className="form-inputs">
          <Form.Item
            name="eventType"
            className="input"
          >
            <Select className="input" size="large" options={eventFormat} placeholder="Выберите формат" />
          </Form.Item>
          <Form.Item
            name="countOfMembers"
            className="input"
          >
            <Input className="input" size="large"  placeholder="Кол-во учасников" type="number" />
          </Form.Item>
        </div>
        <div className="form-inputs">
          <Form.Item
            name="partnersOptions"
            className="input"
          >
            <Select className="input" size="large" options={partnersOptions} placeholder="Выберите партнера" />
          </Form.Item>
          <Form.Item
            name="donorFormat"
            className="input"
          >
            <Select className="input" size="large" options={donorFormat} placeholder="Выберите Донора" />
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
                           <p className="label">Письмо в МИД</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                          <Form.Item name="dateMidLetter"
                            style={{width: '100%'}}>
                           <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }}/>
                          </Form.Item>
                          <Form.Item name="numberMidLetter"
                            style={{width: '100%'}}>
                           <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                          </Form.Item>
                         </div>
                       </div>
                       <div className="approval-container-item">
                         <div className="approval-letter-label">
                           <p className="label">Ответ МИД</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                          <Form.Item 
                            name="dateMidResponse"
                            style={{width: '100%'}}>
                           <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} />
                          </Form.Item>
                            <Form.Item 
                              name="numberMidResponse"
                              style={{width: '100%'}}>
                              <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                            </Form.Item>
                         </div>
                       </div>  
                     </div>
                  )}
                  <Checkbox checked={isMIDChecked} onChange={(e) => setIsMIDChecked(e.target.checked)}>
                     Согласование от МИД
                  </Checkbox>
        
                  {isSGBChecked && (
                    <div className="approval-container-items">
                       <div className="approval-container-item">
                         <div className="approval-letter-label">
                           <p className="label">Письмо в СГБ</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                          <Form.Item 
                            name="dateSgbLetter"
                            style={{width: '100%'}}>
                           <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }}/>
                          </Form.Item>
                          <Form.Item 
                            name="numberSbgLetter"
                            style={{width: '100%'}}>
                           <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                          </Form.Item>
                         </div>
                       </div>
                       <div className="approval-container-item">
                         <div className="approval-letter-label">
                           <p className="label">Ответ СГБ</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                          <Form.Item 
                            name="dateSgbResponse"
                            style={{width: '100%'}}> 
                           <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} />
                          </Form.Item>
                            <Form.Item 
                            name="numberSgbResponse"
                            style={{width: '100%'}}>  
                           <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                          </Form.Item>
                         </div>
                       </div>  
                     </div>
                  )}
                  <Checkbox checked={isSGBChecked} onChange={(e) => setIsSGBChecked(e.target.checked)}>
                     Согласование от СГБ
                  </Checkbox>
                  {isAdminChecked && (
                    <div className="approval-container-items">
                       <div className="approval-container-item">
                         <div className="approval-letter-label">
                           <p className="label">Письмо в Администрацию</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                           <DatePicker size="large" format="DD.MM.YYYY"   style={{ width: "100%" }}/>
                           <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                         </div>
                       </div>
                       <div className="approval-container-item">
                         <div className="approval-letter-label">
                           <p className="label">Ответ Администрации</p>
                         </div>
                         <div style={{ display: "flex", gap: 8 }}>
                           <DatePicker size="large" format="DD.MM.YYYY" style={{ width: "100%" }} />
                           <Input size="large" placeholder="Номер" style={{ width: "100%" }} />
                         </div>
                       </div>  
                     </div>
                  )}
                  <Checkbox checked={isAdminChecked} onChange={(e) => setIsAdminChecked(e.target.checked)}>
                    Согласование от Администрации
                  </Checkbox>
                </div>
              </div>
  
        <Button type="submit">Submit</Button>
      </FormComponent>
    );
}

export default EditEvent