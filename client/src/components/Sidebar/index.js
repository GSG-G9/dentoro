import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { arrayOf, element, func } from 'prop-types';
import logoImage from '../../assets/images/logo.png';

const { Header, Content, Footer, Sider } = Layout;
function Sidebar({ contentComponents, logoutFunction }) {
  const [collapsed, setCollapsed] = useState(false);
  const [itemKey, setItemKey] = useState('1');

  const onCollapse = (collapsedValue) => setCollapsed(collapsedValue);

  return (
    <Layout className="page-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={collapsed ? 'logo logo-hidden' : 'logo'}>
          <div>
            <img src={logoImage} alt="" />
          </div>
          <h3 className="title-text">Dental Clinic</h3>
        </div>
        <Menu
          className="menu-items"
          theme="dark"
          defaultSelectedKeys={[itemKey]}
          mode="inline"
          onSelect={({ key }) => setItemKey(key)}
        >
          <Menu.Item className="menu-item" key="1" icon={<PieChartOutlined />}>
            Today&apos;s Schedule
          </Menu.Item>
          <Menu.Item className="menu-item" key="2" icon={<DesktopOutlined />}>
            Calender
          </Menu.Item>
          <Menu.Item className="menu-item" key="3" icon={<FileOutlined />}>
            Patients
          </Menu.Item>
        </Menu>
        <Menu.Divider />
        <Menu theme="dark">
          <Menu.Item
            onClick={logoutFunction}
            danger
            className="logout-item"
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <nav className="header-navbar">
            <MenuFoldOutlined
              onClick={() => setCollapsed((x) => !x)}
              className="menu-icon-style"
            />
          </nav>
        </Header>
        <Content className="site-layout-content">
          <div className="site-layout-content-body">
            {contentComponents[+itemKey - 1]}
          </div>
        </Content>
        <Footer className="site-layout-footer">
          Dental Clinic ©2021 Created by dentoro
        </Footer>
      </Layout>
    </Layout>
  );
}

Sidebar.propTypes = {
  contentComponents: arrayOf(element).isRequired,
  logoutFunction: func.isRequired,
};
export default Sidebar;
