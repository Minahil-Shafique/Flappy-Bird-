import React from 'react';

const Bird = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '40px',
        height: '40px',
        background: 'yellow',
        borderRadius: '50%',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Bird;
