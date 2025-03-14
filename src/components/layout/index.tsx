import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MdHome } from "react-icons/md";
import './styles.sass'
import Languages from '../languages';
import UserInfo from '../userInfo';
import Navigation from '../navigation';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,

            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        hello
        <MdHome />

      </Footer>
    </Layout>
  );
};

export default MainLayout;