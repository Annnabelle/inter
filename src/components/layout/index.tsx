import React from 'react';
import {Layout  } from 'antd';
import './styles.sass'
import Languages from '../languages';
import UserInfo from '../userInfo';
import Navigation from '../navigation';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }>  = ({ children }) => {

  return (
    <Layout className='layout'>
      <Header className='layout-header'>
          <div className="layout-header-items">
            <div className="layout-header-item">
              <div className="layout-header-item-logo">
                Logo
              </div>
            </div>
            <div className="layout-header-item">
              <div className="layout-header-item-language">
                <Languages/>
              </div>
              <div className="layout-header-item-user">
                <UserInfo/>
              </div>
            </div>
        </div>
      </Header>
      <div className="layout-header-nav">
        <div className="container">
          <Navigation/>
        </div>
      </div>
      <Content style={{ padding: '20px 48px 50px 48px' }}>
         {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;