import React from 'react'
import { Form, Input, Checkbox } from "antd";
import { EventDetailsProps } from '../../../types/events';
import FormComponent from '../../form';

const RetrieveEvent: React.FC<EventDetailsProps> = ({event}) => {
    const [form] = Form.useForm();
  return (
    <FormComponent>
      <div className="form-inputs">
        <Form.Item
          name="eventName"
          className="input"
        >
          <Input disabled className="input" size="large" placeholder={event.title} />
        </Form.Item>
        <Form.Item
          name="organizer"
          className="input"
        >
          <Input disabled className="input" size="large"  placeholder={event?.organizer}  />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="eventType"
          className="input"
        >
          <Input disabled className="input" size="large"  placeholder={event?.eventType} />
        </Form.Item>
        <Form.Item
          name="countOfMembers"
          className="input"
        >
          <Input disabled className="input" size="large"  placeholder={event?.countOfMembers}/>
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="partnersOptions"
          className="input"
        >
          <Input disabled className="input" size="large"  placeholder={event?.partnersOptions} />
        </Form.Item>
        <Form.Item
          name="donorFormat"
          className="input"
        >
          <Input disabled className="input" size="large"  placeholder={event?.donorFormat} />
        </Form.Item>
      </div>
      <div className="form-inputs">
        <Form.Item
          name="date"
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
    </FormComponent>
  )
}

export default RetrieveEvent