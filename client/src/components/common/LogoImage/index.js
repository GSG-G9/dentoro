import React from 'react';
import { string } from 'prop-types';

function LogoImage({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
}

LogoImage.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
};

export default LogoImage;
