import React from 'react'
import { Form, Select, DatePicker, Input, Checkbox } from "antd";
import dayjs from "dayjs";
import './styles.sass'
import { EventDetailsProps } from '../../../types/events';
import { Value } from 'sass';

const RetrieveEvent: React.FC<EventDetailsProps> = ({event}) => {
    const [form] = Form.useForm();
    console.log('====================================');
    console.log("title", event.title);
    console.log('====================================');
  return (
    <div className="form">
      <div className="form-inputs">
        <Form.Item
          name="eventName"
          className="input"
          rules={[{ required: true, message: "Выберите мероприятие" }]}
        >
          <Input disabled className="input" size="large" placeholder={event.title} />
        </Form.Item>
        <Form.Item
          name="organizer"
          className="input"
          rules={[{ required: true, message: "Введите организатора" }]}
        >
          <Input disabled className="input" size="large"  placeholder={event?.organizer}  />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="eventType"
          className="input"
          rules={[{ required: true, message: "Выберите Формат" }]}
        >
          <Input disabled className="input" size="large"  placeholder={event?.eventType} />
        </Form.Item>
        <Form.Item
          name="countOfMembers"
          className="input"
          rules={[{ required: true, message: "Введите кол-во участников" }]}
        >
          <Input disabled className="input" size="large"  placeholder={event?.countOfMembers}/>
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="partnersOptions"
          className="input"
          rules={[{ required: true, message: "Выберите партнера" }]}
        >
          <Input disabled className="input" size="large"  placeholder={event?.partnersOptions} />
        </Form.Item>
        <Form.Item
          name="donorFormat"
          className="input"
          rules={[{ required: true, message: "Выберите Донора" }]}
        >
          <Input disabled className="input" size="large"  placeholder={event?.donorFormat} />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Выберите дату и время" }]}
          style={{width: '100%'}}
        >
          <Input
            style={{ width: "100%" }}
            size="large"
            disabled
            placeholder={event?.start}
          />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Выберите дату и время" }]}
          style={{width: '100%'}}
        >
          <Input
            style={{ width: "100%" }}
            size="large"
            placeholder={event?.end}
            disabled
          />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <div className="approval-container">
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Письмо в МИД</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"    style={{ width: "100%" }} disabled/>
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }} disabled />
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Ответ МИД</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"  style={{ width: "100%" }} disabled />
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }} disabled />
                 </div>
               </div>  
             </div>
          <Checkbox checked={true} disabled>
             Согласование от МИД
          </Checkbox>
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Письмо в СГБ</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"  style={{ width: "100%" }}disabled/>
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }}disabled />
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Ответ СГБ</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"  style={{ width: "100%" }} disabled />
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }} disabled />
                 </div>
               </div>  
             </div>
          <Checkbox checked={true} disabled>
             Согласование от СГБ
          </Checkbox>
            <div className="approval-container-items">
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Письмо в Администрацию</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"    style={{ width: "100%" }} disabled/>
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }} disabled />
                 </div>
               </div>
               <div className="approval-container-item">
                 <div className="approval-letter-label">
                   <p className="label">Ответ Администрации</p>
                 </div>
                 <div style={{ display: "flex", gap: 8 }}>
                   <Input size="large"  style={{ width: "100%" }} disabled />
                   <Input size="large" placeholder="Номер" style={{ width: "100%" }} disabled />
                 </div>
               </div>  
             </div>
          <Checkbox checked={true} disabled>
            Согласование от Администрации
          </Checkbox>
        </div>
      </div>
    </div>
  )
}

export default RetrieveEvent