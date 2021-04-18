import React from 'react';
import { Menu, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  DownOutlined,
  AuditOutlined,
  UserOutlined,
  BellOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import './style.css';
import LogoImage from '../common/Image';
import logo from '../../assets/images/logo.png';

const { Title } = Typography;

const NavBar = () => (
  <div className="header-container" id="nav-bar">
    <div className="info">
      <Button className="account-button" type="text">
        <UserOutlined />
        <Link className="account-link" to="/login">
          account
        </Link>
      </Button>
      <hr className="line" />
      <Title level={5}>Welcome to Dental Clinic</Title>
      <hr />
      <LogoImage
        src={logo}
        alt="Dental Clinic logo image show a tooth inside a heart"
      />
      <Menu className="details">
        <Menu.Item
          className="details-body"
          icon={<BellOutlined className="icon-top" />}
        >
          Openings Hours <br />
          From 8 AM to 6 PM
        </Menu.Item>
        <Menu.Item
          className="details-body"
          icon={<PhoneOutlined className="icon-top" />}
        >
          Give us a call <p>+972 59 701 0101</p>
        </Menu.Item>
        <Menu.Item
          className="details-body"
          icon={<EnvironmentOutlined className="icon-top" />}
        >
          Visit our location <br />
          Palestine - Gaza - Jalal St.
        </Menu.Item>
      </Menu>
    </div>
    <Menu className="Nav-Tap " mode="horizontal">
      <Menu.Item
        className="nav-menu"
        icon={<DownOutlined className="icon" />}
        key="1"
      >
        <a className="nav-button" href="#home">
          Home
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="2">
        <a className="nav-button" href="#nav-bar">
          Features
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="3">
        <a className="nav-button" href="#our-services">
          Services
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="4">
        <a className="nav-button" href="#map">
          Map
        </a>
      </Menu.Item>
      <Menu.Item
        className="form"
        icon={<AuditOutlined className="form-icon" />}
        key="5"
      >
        <a className="nav-button" href="#booking-form">
          Book an appointment
        </a>
      </Menu.Item>
    </Menu>
  </div>
);
export default NavBar;
