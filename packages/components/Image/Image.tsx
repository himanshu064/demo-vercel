import React from 'react';

interface IImage {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  alt: string;
}

const Image = ({ src, width, height, alt, className }: IImage) => {
  return (
    <>
      <img
        className={className}
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </>
  );
};

export default Image;
