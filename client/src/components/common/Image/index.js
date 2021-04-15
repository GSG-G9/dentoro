import React from 'react';
import { string } from 'prop-types';

const Image = ({ src, alt, ...otherProps }) => (
  <img src={src} alt={alt} {...otherProps} />
);

Image.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
};

export default Image;
