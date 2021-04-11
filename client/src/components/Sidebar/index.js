import React, { useContext, useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { get } from 'axios';
import { element } from 'prop-types';
import 'antd/dist/antd.css';
import './style.css';

import { Layout, Menu, Typography } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import IsAuthContext from '../../Context/isAuthContext';

import logo from '../../assets/images/logo.png';
import LogoImage from '../common/Image';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const Sidebar = ({ children }) => {
  const { pathname } = useLocation();
  const { setIsAuth } = useContext(IsAuthContext);

  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsedValue) => setCollapsed(collapsedValue);
  const logoutFunction = async () => {
    await get('/api/v1/logout');
    setIsAuth(false);
    history.push('/login');
  };

  return (
    <Layout className="page-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={collapsed ? 'logo logo-hidden' : 'logo'}>
          <LogoImage
            src={logo}
            alt="Dental Clinic logo image show a tooth inside a heart"
          />
          <Title className="title-text" level={3}>
            Dental Clinic
          </Title>
        </div>
        <Menu
          className="menu-items"
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
        >
          <Menu.Item
            className="menu-item"
            key="/dashboard"
            icon={<PieChartOutlined />}
          >
            <Link to="/dashboard">Today&apos;s Schedule </Link>
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            key="/dashboard/calendar"
            icon={<DesktopOutlined />}
          >
            <Link to="/dashboard/calendar">Calendar </Link>
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            key="/dashboard/patients"
            icon={<FileOutlined />}
          >
            <Link to="/dashboard/patients">Patients</Link>
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
          <div className="site-layout-content-body">{children}</div>
        </Content>
        <Footer className="site-layout-footer">
          Dental Clinic &copy;2021 Created by Dentoro
        </Footer>
      </Layout>
    </Layout>
  );
};

Sidebar.propTypes = {
  children: element.isRequired,
};

export default Sidebar;
