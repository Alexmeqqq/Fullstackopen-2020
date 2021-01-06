import React from 'react';
import Part from './part/Part';
import Total from './part/Total';

const Content = ({ parts }) => {
  return (
    <div>
      {parts && parts.map((part) => <Part part={part} key={part.id} />)}
      <Total parts={parts} />
    </div>
  );
};

export default Content;
