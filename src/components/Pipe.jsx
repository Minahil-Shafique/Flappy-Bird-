import React from 'react';

const Pipe = ({ position, height, isBottom }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '50px',
        height: `${height}px`,
        background: 'green',
        left: `${position}px`,
        bottom: isBottom ? '0' : 'auto',
        top: isBottom ? 'auto' : '0',
      }}
    />
  );
};

export default Pipe;
