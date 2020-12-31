import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts.part1} exercises={parts.exercises1} />
      <Part parts={parts.part2} exercises={parts.exercises2} />
      <Part parts={parts.part3} exercises={parts.exercises3} />
    </div>
  );
};

export default Content;
