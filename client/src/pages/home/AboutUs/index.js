import React from 'react';
import { Typography } from 'antd';
import Title from '../../../components/common/Title';
import Image from '../../../components/common/Image';

import aboutUsImage from '../../../assets/images/about-us-image.png';
import './style.css';

const { Text, Paragraph } = Typography;

const AboutUs = () => (
  <div className="about-us-container">
    <Text className="about-us-page-name">About Us</Text>
    <Title text="Welcome to Dental Clinic Center" />
    <Paragraph className="about-us-description">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, voluptate,
      harum dolores tenetur iusto voluptatibus at quis voluptatum aspernatur
      alias impedit officiis nihil atque, asperiores quaerat cumque magni
    </Paragraph>
    <div className="about-us-image-container">
      <div className="about-us-image-div">
        <Image
          alt="about-us-image"
          className="about-us-image"
          src={aboutUsImage}
        />
      </div>
      <div className="about-us-paragraph-list">
        <Paragraph strong className="about-us-paragraph-1">
          We give you more of what you want,the type of dental care you deserve!
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore
          voluptas beatae, voluptate atque ducimus officiis maiores ipsam
          aspernatur! Dolor sapiente beatae quasi voluptate omnis? Magnam
          temporibus rerum perferendis dolorem.
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore
          voluptas beatae, voluptate atque ducimus officiis maiores ipsam
          aspernatur! Dolor sapiente beatae quasi voluptate omnis? Magnam
          temporibus rerum perferendis dolorem.
        </Paragraph>
      </div>
    </div>
  </div>
);
export default AboutUs;
