import React from 'react';
import { Form, Input } from 'antd';
import { RootState, useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from '../../store/authSlice';
import { toast } from 'react-toastify';
import Button from '../../components/button';
import { LoginForm } from '../../types/auth.types';
import './styles.sass'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.auth);
  const onFinish = async (values: LoginForm) => {
    try {
      const result = await dispatch(Login(values)).unwrap();
      console.log('====================================');
      console.log("result", result);
      console.log('====================================');
      toast.success('Успешный вход!');
      navigate('/main');
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-left-section">
        <WaveBackground />
      </div>
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Введите логин' },
                { type: 'email', message: 'Некорректный логин' },
              ]}
            >
              <Input className='input' type='email' />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password className='input' />
            </Form.Item>
              <Button type='submit'>
                Войти
              </Button>
              {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



