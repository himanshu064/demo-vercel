import React from 'react';

interface IProps {
  color: string;
}

const StatusDot = ({ color = 'red' }: IProps) => {
  return (
    <span
      className='inline-block !h-2 !w-2 !rounded-full'
      style={{ backgroundColor: color }}
    ></span>
  );
};

export default StatusDot;
