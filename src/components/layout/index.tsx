import React from 'react';
import {Layout  } from 'antd';
import Languages from '../languages';
import UserInfo from '../userInfo';
import Navigation from '../navigation';
import './styles.sass'

const { Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode, ref?: any }>  = ({ children, ref }) => {

  return (
    <Layout className='layout' >
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
      <div className="layout-header-nav" ref={ref}>
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