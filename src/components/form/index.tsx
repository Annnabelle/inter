import React, { ReactNode } from 'react';
import { Form, FormInstance  } from 'antd';
import './styles.sass';

interface FormComponentProps {
    children: ReactNode;
    onFinish?: (values: any) => void;
    formProps?: FormInstance; 
}

const FormComponent: React.FC<FormComponentProps> = ({ children, onFinish, formProps }) => {
    const [defaultForm] = Form.useForm(); // Распаковываем formInstance
    const usedForm = formProps ?? defaultForm;

    return (
        <Form form={usedForm} layout='vertical' onFinish={onFinish} className='form'>
            {children}
        </Form>
    );
};

export default FormComponent;
