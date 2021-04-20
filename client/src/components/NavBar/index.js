/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Typography, Anchor, BackTop, Dropdown, Menu } from 'antd';

import { Link } from 'react-router-dom';
import {
  DownOutlined,
  AuditOutlined,
  UserOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import List from '../common/List';
import LogoImage from '../common/Image';
import logo from '../../assets/images/logo.png';
import addressInfo from '../../utils/addressInfo';
import './style.css';

const { Link: AntLink } = Anchor;

const { Title } = Typography;
const { info } = addressInfo({ iconClassName: 'navbar-icon' });

const AnchorLinks = ({ ...otherProps }) => (
  <Anchor {...otherProps} affix={false}>
    <AntLink title="Home" href="#home">
      <DownOutlined className="navbar-link-icon" />
    </AntLink>
    <AntLink title="About Us" href="#about-us">
      <DownOutlined className="navbar-link-icon" />
    </AntLink>
    <AntLink title="Services" href="#our-services">
      <DownOutlined className="navbar-link-icon" />
    </AntLink>
    <AntLink title="Map" href="#map">
      <DownOutlined className="navbar-link-icon" />
    </AntLink>
  </Anchor>
);

const NavBar = () => (
  <div className="header-container" id="nav-bar">
    <div className="navbar-info">
      <div className="nav-bar-logo-account">
        <Title level={5}>Welcome to Dental Clinic</Title>
        <Button className="account-button" type="text">
          <UserOutlined />
          <Link className="account-link" to="/login">
            account
          </Link>
        </Button>
      </div>
      <hr className="line" />
      <div className="nav-bar-logo-image-icons">
        <LogoImage
          src={logo}
          alt="Dental Clinic logo image show a tooth inside a heart"
        />
        <List
          grid={{ gutter: 0, column: 4 }}
          size="small"
          itemLayout="horizontal"
          dataSource={info}
          className="navbar-icon-list"
        />
      </div>
    </div>
    <div className="navbar-bar">
      <div className="navbar-links">
        <AnchorLinks className="navbar-links-background navbar-bar-links-only" />
        <Anchor className="navbar-links-background" affix={false}>
          <AntLink
            className="navbar-book-button"
            title="Book an appointment"
            href="#booking-form"
            affix={false}
          >
            <AuditOutlined className="navbar-link-icon navbar-book-icon" />
          </AntLink>
        </Anchor>
        <Dropdown
          placement="bottomCenter"
          trigger={['click']}
          overlay={<AnchorLinks className="navbar-links-background" />}
        >
          <MenuFoldOutlined className="navbar-menu-icon" />
        </Dropdown>
      </div>
    </div>

    <BackTop />
  </div>
);
export default NavBar;
