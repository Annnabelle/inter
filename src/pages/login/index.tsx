import React from 'react';
import { Form, Input } from 'antd';
import './styles.sass'
import Button from '../../components/button';

const WaveBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1 }}>
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#00c6ff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0072ff', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          d="
            M0,100 
            C300,200 
            900,0 
            1200,100 
            L1200,0 
            L0,0 
            Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,100 C300,200 900,0 1200,100 L1200,0 L0,0 Z;
              M0,100 C300,0 900,200 1200,100 L1200,0 L0,0 Z;
              M0,100 C300,200 900,0 1200,100 L1200,0 L0,0 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Login values:', values);
  };

  return (
    <div className="login-container">
      {/* Левая часть: анимация волн */}
      <div className="login-container-left-section">
        <WaveBackground />
      </div>

      {/* Правая часть: форма логина */}
      <div className="login-container-right-section">
        <div className="login-container-form-container">
          <div className="login-container-form-container-heading">
            <h2 className='login-container-form-container-heading-title'>Вход в систему</h2>
          </div>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className='login-form'
          >
            <Form.Item
              label="Логин"
              name="username"
              rules={[{ required: true, message: 'Введите логин!' }]}
            >
              <Input className='input' />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль!' }]}
            >
              <Input.Password className='input' />
            </Form.Item>
              <Button>
                Войти
              </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



