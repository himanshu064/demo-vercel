import React from 'react';

type ImageProps = {
  src: string;
  height: number;
  width: number;
  alt: string;
};

const GoogleLogo: React.FC<ImageProps> = ({ src, height, width, alt }) => {
  return (
    <>
      <img
        className='max-w-full h-auto align-middle'
        src={src}
        height={height}
        width={width}
        alt={alt}
      />
    </>
  );
};

export default GoogleLogo;
