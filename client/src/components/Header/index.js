import React from 'react';
import { Menu, Button } from 'antd';
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

const NavTap = () => (
  <div className="header-container">
    <div className="info">
      <Button className="account-button" type="text">
        <UserOutlined />
        <Link className="account-link" to="/login">
          account
        </Link>
      </Button>
      <hr className="line" />
      <h5>Welcome to Dental Clinic</h5>
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
          From 9 AM to 5 PM
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
        Home
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="2">
        Features
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="3">
        Services
      </Menu.Item>
      <Menu.Item icon={<DownOutlined className="icon" />} key="4">
        Contact
      </Menu.Item>
      <Menu.Item
        className="form"
        icon={<AuditOutlined className="form-icon" />}
        key="5"
      >
        Book an appointment
      </Menu.Item>
    </Menu>
  </div>
);
export default NavTap;
