import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

import LogoImage from '../common/Image';
import logo from '../../assets/images/logo.png';

import './style.css';

const { Title } = Typography;

const Footer = () => (
  <div id="footer">
    <Row className="icons-container">
      <Col>
        <Title level={5} className="title">
          <LogoImage
            className="logo"
            src={logo}
            alt="Dental Clinic logo image show a tooth inside a heart"
          />
          Dental
        </Title>
        <p className="description">lorem</p>
      </Col>
      <Col>
        <Title level={5} className="title">
          Services
        </Title>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Tooth Cleaning
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Oral Surgery
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Painless Dentistry
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Periodontics
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Dental Calculus
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Prevention
          </Link>
        </Col>
      </Col>
      <Col>
        <Title level={5} className="title">
          Follow Us
        </Title>
        <Col>
          <Link
            className="link"
            to={{ pathname: 'https://www.facebook.com/' }}
            target="_blank"
          >
            <FacebookOutlined /> facebook
          </Link>
        </Col>
        <Col>
          <Link
            className="link"
            to={{ pathname: 'https://www.instagram.com/' }}
            target="_blank"
          >
            <InstagramOutlined /> instagram
          </Link>
        </Col>
        <Col>
          <Link
            className="link"
            to={{ pathname: 'https://www.youtube.com/' }}
            target="_blank"
          >
            <YoutubeOutlined /> YouTube
          </Link>
        </Col>
        <Col>
          <Link
            className="link"
            to={{ pathname: 'https://twitter.com/' }}
            target="_blank"
          >
            <TwitterOutlined /> twitter
          </Link>
        </Col>
      </Col>
      <Col>
        <Col>
          <Title level={5} className="title">
            Legal
          </Title>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Terms
          </Link>
        </Col>
        <Col>
          <Link className="link" to={{ pathname: '#' }} target="_blank">
            Legal
          </Link>
        </Col>
      </Col>
    </Row>
  </div>
);
export default Footer;
