import React from 'react';

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {parts.exercises1 + parts.exercises2 + parts.exercises3}
      </p>
    </div>
  );
};

export default Total;
