import React, { ReactNode } from 'react';
import { Form } from 'antd';
import './styles.sass';

interface FormComponentProps {
    children: ReactNode;
    onFinish?: (values: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ children, onFinish }) => {
    const [form] = Form.useForm();
    
    return (
        <Form form={form} layout='vertical' onFinish={onFinish} className='form'>
            {children}
        </Form>
    );
};

export default FormComponent;