import React from 'react';

interface iTitle {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<iTitle> = ({ className, children }) => {
  return <h1 className={className}>{children}</h1>;
};

export default Title;
