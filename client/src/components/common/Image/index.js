import React from 'react';
import { string } from 'prop-types';

const Image = ({ src, alt }) => (
  <div>
    <img src={src} alt={alt} />
  </div>
);

Image.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
};

export default Image;
